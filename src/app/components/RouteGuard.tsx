"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const { token, user } = useSelector((state: any) => state.persisted?.auth || {});
  const isLoggedIn = !!token;
  const userRole = user?.role;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(pathname);

    // Redirect logged-in users away from guest-only routes
    // Both "/" and "/signin" are handled here
    if (isLoggedIn && (pathname === "/" || pathname === "/signin" || pathname === "/signup")) {
      router.replace("/dashboard");
      return;
    }

    // Redirect logged-out users trying to access protected routes
    if (!isLoggedIn && !isPublicRoute) {
      router.replace("/?redirect=" + encodeURIComponent(pathname));
      return;
    }

    // Role-based access (optional activation)
    if (isLoggedIn && !isPublicRoute && allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      router.replace("/"); // or /not-authorized
      return;
    }

    // All good → stop loading
    setIsLoading(false);
  }, [isLoggedIn, pathname, userRole, allowedRoles, router]);

  if (isLoading) {
    // Show a clean loading state instead of "Access denied"
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#01B0E9] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">
            {isLoggedIn && publicRoutes.includes(pathname)
              ? "Redirecting to dashboard..."
              : !isLoggedIn && !publicRoutes.includes(pathname)
                ? "Redirecting to login..."
                : "Verifying access..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
