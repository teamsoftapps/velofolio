"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Routes that don't require authentication
const publicRoutes = ["/", "/signin", "/signup", "/forget-password", "/reset-password", "/viewInvoice", "/viewQuote"];

const LoadingScreen = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50 text-black">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-[var(--primary-color)] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-medium text-gray-600">{message}</p>
    </div>
  </div>
);

function GuardContent({
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
  const userRole = null;

  const [isLoading, setIsLoading] = useState(true);

  const { isAuthorized, redirectTarget } = useMemo(() => {
    if (!authInitialized) {
      return { isAuthorized: false, redirectTarget: null };
    }

    const isPublicRoute = publicRoutes.includes(pathname);
    const isGuestOnlyRoute = ["/", "/signin", "/signup"].includes(pathname);
    const isUnauthorizedFlag = searchParams.get("unauthorized") === "true";

    if (isLoggedIn && isGuestOnlyRoute && !isUnauthorizedFlag) {
      return { isAuthorized: false, redirectTarget: "/dashboard" };
    }

    if (!isLoggedIn && !isPublicRoute) {
      return {
        isAuthorized: false,
        redirectTarget: `/signin?redirect=${encodeURIComponent(fullPath)}`
      };
    }

    return { isAuthorized: true, redirectTarget: null };
  }, [authInitialized, isLoggedIn, pathname, fullPath, allowedRoles, searchParams]);

  useEffect(() => {
    if (!isAuthorized && redirectTarget) {
      router.replace(redirectTarget);
    } else if (isAuthorized) {
      setIsLoading(false);
    }
  }, [isAuthorized, redirectTarget, router]);

  if (!authInitialized || isLoading || !isAuthorized) {
    return (
      <LoadingScreen 
        message={!authInitialized
          ? "Connecting to Firebase..."
          : redirectTarget?.includes("dashboard")
            ? "Redirecting to dashboard..."
            : redirectTarget?.includes("redirect")
              ? "Redirecting to login..."
              : "Verifying access..."} 
      />
    );
  }

  return <>{children}</>;
}

export default function RouteGuard(props: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  return (
    <Suspense fallback={<LoadingScreen message="Initializing Security..." />}>
      <GuardContent {...props} />
    </Suspense>
  );
}
