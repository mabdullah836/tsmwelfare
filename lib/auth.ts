import { jwtVerify, type JWTPayload } from 'jose'

export const AUTH_COOKIE = 'auth-token'

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

// Edge-compatible verification used by middleware to guard /admin pages.
// The backend issues the cookie; both sides must share the same JWT_SECRET.
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
