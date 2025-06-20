import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme'; // Use env var in production

// NOTE: Set JWT_SECRET in your environment for production. Consider using httpOnly cookies for better security in production.

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Email and password are required.' }, { status: 400 });
    }

    // Always ensure only one admin exists
    await withDbConnection(async () => {
      const admins = await Admin.find({});
      if (admins.length > 1) {
        // Remove all but the first admin (safety net)
        await Admin.deleteMany({ _id: { $nin: [admins[0]._id] } });
      }
    });

    let admin = await withDbConnection(() => Admin.findOne({}));

    if (!admin) {
      // No admin exists, create one with provided credentials
      const hashedPassword = await bcrypt.hash(password, 10);
      admin = await withDbConnection(() => Admin.create({ email, password: hashedPassword }));
    }

    // If the email doesn't match the stored admin, reject
    if (admin.email !== email) {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials.' }, { status: 401 });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin', email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
} 