import { NextResponse } from 'next/server'

// Best-effort, per-instance limiter. On serverless platforms each instance keeps its
// own window, so this slows down abuse but is not a substitute for an edge/WAF limit.
const buckets = new Map<string, { count: number; resetAt: number }>()

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

export function rateLimit(
  request: Request,
  scope: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): NextResponse | null {
  const now = Date.now()
  const key = `${scope}:${clientIp(request)}`
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    if (buckets.size > 10_000) {
      for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k)
    }
    return null
  }

  bucket.count += 1
  if (bucket.count > limit) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000)
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }
  return null
}
