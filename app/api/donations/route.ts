import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Donation from '@/models/Donation';

export async function GET() {
  try {
    const donations = await withDbConnection(async () => {
      return Donation.find().sort({ createdAt: -1 });
    });
    return NextResponse.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch donations',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const donation = await withDbConnection(async () => {
      return Donation.create(data);
    });
    return NextResponse.json(donation);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ 
      error: 'Failed to create donation',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 