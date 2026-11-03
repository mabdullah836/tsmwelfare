import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcrypt';
import { getAdminFromRequest } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const decoded = await getAdminFromRequest(request);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, email, newPassword } = await request.json();
    if (!currentPassword) {
      return NextResponse.json({ success: false, message: 'Current password is required.' }, { status: 400 });
    }

    const admin = await withDbConnection(() => Admin.findById(decoded.id));
    if (!admin) {
      return NextResponse.json({ success: false, message: 'Admin not found.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Current password is incorrect.' }, { status: 401 });
    }

    if (typeof email === 'string' && email.trim()) {
      admin.email = email.trim().toLowerCase();
    }
    if (newPassword) {
      admin.password = await bcrypt.hash(newPassword, 10);
    }
    await admin.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin settings update error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
} 