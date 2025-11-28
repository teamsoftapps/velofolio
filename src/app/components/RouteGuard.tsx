"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const protectedRoutes = ["/dashboard", "/profile", "/settings"]; // add all protected routes here

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

  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    // Redirect logged-in users away from "/" or "/signup"
    if (isLoggedIn && (pathname === "/" || pathname === "/signup")) {
      router.replace("/dashboard");
      return;
    }

    // Redirect logged-out users trying to access protected routes
    if (!isLoggedIn && protectedRoutes.includes(pathname)) {
      router.replace("/?redirect=" + encodeURIComponent(pathname));
      return;
    }

    // // Role-based access
    // if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    //   router.replace("/not-authorized");
    //   return;
    // }

    // All good → stop redirecting
    setRedirecting(false);
  }, [isLoggedIn, pathname, userRole, allowedRoles, router]);

  if (redirecting) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-black">
        <p className="text-lg">
          {isLoggedIn && (pathname === "/" || pathname === "/signup")
            ? "Redirecting to dashboard..."
            : !isLoggedIn && protectedRoutes.includes(pathname)
            ? "Redirecting to login..."
            : "Access denied. Redirecting..."}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
