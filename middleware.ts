import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'changeme');

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(`[Middleware] Accessing: ${pathname}`);

  // Allow login page and public assets
  if (pathname === '/admin/login' || 
      pathname.startsWith('/_next/') || 
      pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // Check authentication for all admin routes
  const token = request.cookies.get('auth-token')?.value;
  console.log(`[Middleware] Token: ${token ? 'exists' : 'missing'}`);

  if (!token) {
    console.log('[Middleware] No token - redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    console.log(`[Middleware] User role: ${payload.role}`);
    
    // If trying to access login page but already authenticated
    if (pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    
    return NextResponse.next();
  } catch (err) {
    console.log('[Middleware] Token verification failed:', err);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};