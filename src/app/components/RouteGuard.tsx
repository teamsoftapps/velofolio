"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

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
  
  const { token, user } = useSelector((state: any) => state.persisted?.auth || {});
  const isLoggedIn = !!token;
  const userRole = user?.role;

  const [isLoading, setIsLoading] = useState(true);

  // Authorization state determined during render to prevent content flashes
  const { isAuthorized, redirectTarget } = useMemo(() => {
    const isPublicRoute = publicRoutes.includes(pathname);
    const isGuestOnlyRoute = ["/", "/signin", "/signup"].includes(pathname);
    const isUnauthorizedFlag = searchParams.get("unauthorized") === "true";

    // 1. Logged-in users on guest pages (Home, Signin, Signup)
    // Avoid double redirect loop by checking the 'unauthorized' flag
    if (isLoggedIn && isGuestOnlyRoute && !isUnauthorizedFlag) {
      return { isAuthorized: false, redirectTarget: "/dashboard" };
    }

    // 2. Logged-out users on protected pages
    if (!isLoggedIn && !isPublicRoute) {
      return { 
        isAuthorized: false, 
        redirectTarget: `/?redirect=${encodeURIComponent(fullPath)}` 
      };
    }

    // 3. Role-based access check
    if (isLoggedIn && !isPublicRoute && allowedRoles) {
      // If roles are restricted but user data isn't fully loaded yet, wait
      if (!userRole) {
        return { isAuthorized: false, redirectTarget: null };
      }
      
      if (!allowedRoles.includes(userRole)) {
        // Redirect to home with a flag to prevent the dashboard loop
        return { isAuthorized: false, redirectTarget: "/?unauthorized=true" };
      }
    }

    // 4. All other cases are authorized
    return { isAuthorized: true, redirectTarget: null };
  }, [isLoggedIn, pathname, fullPath, userRole, allowedRoles, searchParams]);

  useEffect(() => {
    if (!isAuthorized && redirectTarget) {
      router.replace(redirectTarget);
    } else if (isAuthorized) {
      setIsLoading(false);
    }
  }, [isAuthorized, redirectTarget, router]);

  // Block rendering at the source if not authorized
  if (isLoading || !isAuthorized) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#01B0E9] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">
            {redirectTarget?.includes("dashboard")
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
