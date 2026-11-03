import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Donation from '@/models/Donation';
import { handleBulkDelete, handleGetPaginated, parsePagination } from '@/lib/utils/crudHandlers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, limit, search } = parsePagination(searchParams, 10)
    const paymentMethod = searchParams.get('paymentMethod') || ''
    const minAmount = searchParams.get('minAmount') ? Number(searchParams.get('minAmount')) : undefined
    const maxAmount = searchParams.get('maxAmount') ? Number(searchParams.get('maxAmount')) : undefined
    const filters: Record<string, any> = {}
    if (paymentMethod) filters.paymentMethod = paymentMethod
    if (minAmount !== undefined) filters.amount = { ...filters.amount, $gte: minAmount }
    if (maxAmount !== undefined) filters.amount = { ...filters.amount, $lte: maxAmount }
    const status = searchParams.get('status');
    if (status) filters.status = status;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }
    const requestedSort = searchParams.get('sortBy') || 'createdAt';
    const sortBy = /^[A-Za-z][\w.]{0,63}$/.test(requestedSort) ? requestedSort : 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };
    return await withDbConnection(() => handleGetPaginated({
      model: Donation,
      sort,
      page,
      limit,
      search,
      searchFields: ['donor.firstName', 'donor.lastName', 'donor.email', 'type', 'transactionId'],
      query: filters
    }))
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
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
    return NextResponse.json({ error: 'Failed to create donation' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { ids } = await request.json().catch(() => ({ ids: [] }))
  return await withDbConnection(() => handleBulkDelete({ model: Donation, ids }))
}
