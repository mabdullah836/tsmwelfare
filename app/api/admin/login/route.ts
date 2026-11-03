import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';
import { withDbConnection } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { AUTH_COOKIE, AUTH_MAX_AGE, getJwtSecret } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    const limited = rateLimit(request, 'admin-login', { limit: 10, windowMs: 15 * 60 * 1000 });
    if (limited) return limited;

    const secret = getJwtSecret();
    if (!secret) {
      console.error('Admin login error: JWT_SECRET is not configured');
      return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
    }

    const body = await request.json().catch(() => null);
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    await withDbConnection(async () => {
      const admins = await Admin.find({});
      if (admins.length > 1) {
        await Admin.deleteMany({ _id: { $nin: [admins[0]._id] } });
      }
    });

    let admin = await withDbConnection(() => Admin.findOne({}));

    if (!admin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await withDbConnection(() => Admin.create({ email, password: hashedPassword }));
    }

    if (admin.email !== email) {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    const token = await new SignJWT({ id: String(admin._id), role: 'admin', email: admin.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(new TextEncoder().encode(secret));

    const response = NextResponse.json({ success: true });
    response.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      path: '/',
      maxAge: AUTH_MAX_AGE,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
