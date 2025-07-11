import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { handleGetPaginated } from '@/lib/utils/crudHandlers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const search = searchParams.get('q') || ''
    return await withDbConnection(() => handleGetPaginated({
      model: Donation,
      sort: { createdAt: -1 },
      page,
      limit,
      search,
      searchFields: ['donor', 'email', 'type', 'status']
    }))
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