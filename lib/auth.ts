import { jwtVerify, type JWTPayload } from 'jose'

export const AUTH_COOKIE = 'auth-token'
export const AUTH_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Development keeps the historical fallback so local setups still work.
// In production an unset JWT_SECRET fails closed instead of signing with a guessable key.
const DEV_FALLBACK_SECRET = 'changeme'

export function getJwtSecret(): string | null {
  const secret = process.env.JWT_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') return null
  return DEV_FALLBACK_SECRET
}

export interface AdminTokenPayload extends JWTPayload {
  id: string
  role: 'admin'
  email: string
}

// Edge-compatible verification (used by middleware and route handlers alike).
export async function verifyAdminToken(token: string | undefined | null): Promise<AdminTokenPayload | null> {
  const secret = getJwtSecret()
  if (!token || !secret) return null
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), { algorithms: ['HS256'] })
    if (payload.role !== 'admin' || typeof payload.id !== 'string') return null
    return payload as AdminTokenPayload
  } catch {
    return null
  }
}

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get('cookie')
  if (!header) return undefined
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return undefined
}

export async function getAdminFromRequest(request: Request): Promise<AdminTokenPayload | null> {
  return verifyAdminToken(readCookie(request, AUTH_COOKIE))
}
