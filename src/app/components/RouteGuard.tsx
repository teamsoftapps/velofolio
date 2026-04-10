"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Routes that don't require authentication
const publicRoutes = ["/", "/signin", "/signup", "/forget-password", "/reset-password", "/viewInvoice", "/viewQuote"];

export default function RouteGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reconstruct full path with search params for redirect persistence
  const queryStr = searchParams.toString();
  const fullPath = pathname + (queryStr ? `?${queryStr}` : "");

  const [firebaseUser, setFirebaseUser] = useState<any>(undefined);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  const isLoggedIn = !!firebaseUser;
  // TODO: Add robust checking for allowedRoles if roles are pulled from Firestore or Custom Claims
  const userRole = null; 

  const [isLoading, setIsLoading] = useState(true);

  // Authorization state determined during render to prevent content flashes
  const { isAuthorized, redirectTarget } = useMemo(() => {
    if (!authInitialized) {
      return { isAuthorized: false, redirectTarget: null };
    }

    const isPublicRoute = publicRoutes.includes(pathname);
    const isGuestOnlyRoute = ["/", "/signin", "/signup"].includes(pathname);
    const isUnauthorizedFlag = searchParams.get("unauthorized") === "true";

    // 1. Logged-in users on guest pages (Home, Signin, Signup)
    if (isLoggedIn && isGuestOnlyRoute && !isUnauthorizedFlag) {
      return { isAuthorized: false, redirectTarget: "/dashboard" };
    }

    // 2. Logged-out users on protected pages
    if (!isLoggedIn && !isPublicRoute) {
      return {
        isAuthorized: false,
        redirectTarget: `/signin?redirect=${encodeURIComponent(fullPath)}`
      };
    }

    if (isLoggedIn && !isPublicRoute && allowedRoles) {
      // NOTE: Bypass role enforcement until Firebase custom claims/Firestore profile roles are implemented
      // Remove this once User claims are linked
      /*
      if (!userRole) {
        return { isAuthorized: false, redirectTarget: null };
      }
      if (!allowedRoles.includes(userRole)) {
        return { isAuthorized: false, redirectTarget: "/signin?unauthorized=true" };
      }
      */
    }

    // 4. All other cases are authorized
    return { isAuthorized: true, redirectTarget: null };
  }, [authInitialized, isLoggedIn, pathname, fullPath, userRole, allowedRoles, searchParams]);

  useEffect(() => {
    if (!isAuthorized && redirectTarget) {
      router.replace(redirectTarget);
    } else if (isAuthorized) {
      setIsLoading(false);
    }
  }, [isAuthorized, redirectTarget, router]);

  // Block rendering at the source if not authorized
  if (!authInitialized || isLoading || !isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#01B0E9] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">
            {!authInitialized 
              ? "Connecting to Firebase..." 
              : redirectTarget?.includes("dashboard")
                ? "Redirecting to dashboard..."
                : redirectTarget?.includes("redirect")
                  ? "Redirecting to login..."
                  : "Verifying access..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
