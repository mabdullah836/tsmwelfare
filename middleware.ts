import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define protected routes that require authentication
  const protectedRoutes = ['/admin', '/dashboard'];
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));

  // Get the token from the request cookies
  const token = request.cookies.get('auth-token')?.value;

  // Handle protected routes
  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if no token is present
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify token here if needed
      // For now, we'll just check if it exists
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  const headers = response.headers;
  headers.set('X-DNS-Prefetch-Control', 'on');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'origin-when-cross-origin');
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;"
  );

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all routes except static files and api
    '/((?!_next/static|_next/image|favicon.ico|api/public).*)',
  ],
}; 