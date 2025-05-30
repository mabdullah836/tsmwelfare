import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/models/Donation';

export async function GET() {
  try {
    await connectDB();
    const donations = await Donation.find().sort({ createdAt: -1 });
    return NextResponse.json(donations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const donation = await Donation.create(body);
    return NextResponse.json(donation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 });
  }
} 