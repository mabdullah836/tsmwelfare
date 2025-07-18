import { NextRequest, NextResponse } from 'next/server';
import Newsletter from '@/models/Newsletter';
import { withDbConnection } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email address.' }, { status: 400 });
    }
    const result = await withDbConnection(async () => {
      const existing = await Newsletter.findOne({ email });
      if (existing) {
        return { exists: true };
      }
      await Newsletter.create({ email });
      return { exists: false };
    });
    if (result.exists) {
      return NextResponse.json({ success: false, message: 'Email already subscribed.' }, { status: 409 });
    }
    return NextResponse.json({ success: true, message: 'Successfully subscribed.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to subscribe.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const emails = await withDbConnection(() => Newsletter.find({}, { email: 1, createdAt: 1, _id: 0 }).sort({ createdAt: -1 }));
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch emails.' }, { status: 500 });
  }
} 