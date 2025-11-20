// // middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   console.log('🛡️ Middleware RAN for path:', request.nextUrl.pathname); // ← Does it even trigger?
  
//   const token = request.cookies.get('token')?.value;
//   console.log('🍪 Token found?', !!token, 'Full value:', token ? 'exists' : 'missing'); // ← Cookie issue?
  
//   const isLoggedIn = !!token;
//   const path = request.nextUrl.pathname;

//   // Block unauthenticated users from protected pages
//   if (!isLoggedIn && !['/', '/', '/signup'].includes(path)) {
//     console.log('🚫 Redirecting unauth to /');
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // Block logged-in users from login/signup
//   if (isLoggedIn && (path === '/' || path === '/signup')) {
//     console.log('🔐 REDIRECTING logged-in user from', path, 'to /dashboard');
//     const redirectUrl = NextResponse.redirect(new URL('/dashboard', request.url));
//     redirectUrl.headers.set('x-middleware-redirect', 'true'); // Anti-cache header
//     return redirectUrl;
//   }

//   console.log('✅ Allowing access to', path);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)', // ← Your matcher—covers /
// };
// middleware.ts   (or src/middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('MIDDLEWARE IS WORKING - PATH:', request.nextUrl.pathname);
  return NextResponse.next();
}

// THIS IS THE IMPORTANT PART — force it to run on every page
export const config = {
  matcher: '/:path*',   // ← this catches EVERYTHING including /login
};