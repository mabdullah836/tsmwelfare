import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE, verifyAdminToken } from '@/lib/auth'

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_COOKIE)?.value

  const isAuthenticated = Boolean(await verifyAdminToken(token))

  if (pathname === '/admin/login') {
    return isAuthenticated
      ? NextResponse.redirect(new URL('/admin/dashboard', request.url))
      : NextResponse.next()
  }

  if (!isAuthenticated) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url))
    if (token) response.cookies.delete(AUTH_COOKIE)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
