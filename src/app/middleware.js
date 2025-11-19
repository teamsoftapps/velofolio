import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public pages
  const publicPaths = ["/auth/login", "/auth/register", "/auth/forgot"];

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  const isProtected = !isPublic; // everything else is protected

  // If user NOT logged in → redirect to login
  if (!token && isProtected) {
    const url = new URL("/auth/login", req.url);
    return NextResponse.redirect(url);
  }

  // If user IS logged in → prevent visiting login/register pages
  if (token && isPublic) {
    const url = new URL("/dashboard", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|images|favicon.ico).*)",
  ],
};
