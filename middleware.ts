import { NextRequest, NextResponse } from 'next/server'
import { AUTH_COOKIE, verifyAdminToken } from '@/lib/auth'

// API endpoints the public website calls without an admin session.
// Everything else under /api requires a valid admin token.
const PUBLIC_API: Record<string, RegExp[]> = {
  GET: [
    /^\/api\/events$/,
    /^\/api\/events\/[^/]+$/,
    /^\/api\/team$/,
    /^\/api\/team\/[^/]+$/,
    /^\/api\/media$/, // route handler hides private folders from anonymous callers
  ],
  POST: [
    /^\/api\/admin\/login$/,
    /^\/api\/admin\/logout$/,
    /^\/api\/contact$/,
    /^\/api\/newsletter$/,
    /^\/api\/volunteer$/,
    /^\/api\/applications$/,
    /^\/api\/donations$/,
    /^\/api\/media\/upload$/, // route handler limits anonymous uploads to application documents
  ],
}

function isPublicApi(method: string, pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return (PUBLIC_API[method] ?? []).some((re) => re.test(path))
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_COOKIE)?.value

  if (pathname.startsWith('/api/')) {
    if (request.method === 'OPTIONS' || isPublicApi(request.method, pathname)) {
      return NextResponse.next()
    }
    if (!(await verifyAdminToken(token))) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.next()
  }

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
  matcher: ['/admin/:path*', '/api/:path*'],
}
