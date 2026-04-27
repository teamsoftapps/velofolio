"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store"; // optional: for types

interface AuthWrapperProps {
  children: React.ReactNode;
  /** If true → protected route (redirect to login if NOT logged in) */
  protectedRoute?: boolean;
  /** If set → guest-only route (redirect to this path if logged in) */
  guestOnlyRedirectTo?: string;
}

/**
 * Universal Auth Wrapper
 * - Use `protectedRoute` for dashboard, profile, etc.
 * - Use `guestOnlyRedirectTo` for login, register, etc.
 * - Can be used for both!
 */
export default function AuthWrapper({
  children,
  protectedRoute = false,
  guestOnlyRedirectTo,
}: AuthWrapperProps) {
  const router = useRouter();
  const [isClient

, setIsClient] = useState(false);

  const token = useSelector((state: any) => state.persisted.auth?.token);
  const rehydrated = useSelector((state: any) => state._persist?.rehydrated);

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle redirects only after mount + rehydration
  useEffect(() => {
    if (!isClient || !rehydrated) return;

    const shouldRedirect =
      (protectedRoute && !token) || // not logged in → kick out
      (guestOnlyRedirectTo && token); // logged in on guest page → kick out

    if (shouldRedirect) {
      const redirectTo = protectedRoute ? "/" : guestOnlyRedirectTo;
      router.replace(redirectTo!);
    }
  }, [isClient, rehydrated, token, protectedRoute, guestOnlyRedirectTo, router]);

  // Show loading until we're sure about auth state
  if (!isClient || !rehydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Show redirecting screen if about to redirect
  if ((protectedRoute && !token) || (guestOnlyRedirectTo && token)) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        <div>Redirecting...</div>
      </div>
    );
  }

  // All good → render children
  return <>{children}</>;
}

