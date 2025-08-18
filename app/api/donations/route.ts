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
    const paymentMethod = searchParams.get('paymentMethod') || ''
    const minAmount = searchParams.get('minAmount') ? Number(searchParams.get('minAmount')) : undefined
    const maxAmount = searchParams.get('maxAmount') ? Number(searchParams.get('maxAmount')) : undefined
    const filters: any = {}
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
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };
    return await withDbConnection(() => handleGetPaginated({
      model: Donation,
      sort,
      page,
      limit,
      search,
      searchFields: ['donor', 'email', 'type', 'status', 'paymentMethod'],
      query: filters
    }))
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch donations',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET_TOP_DONORS(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const status = searchParams.get('status');
    const paymentMethod = searchParams.get('paymentMethod');
    const category = searchParams.get('category');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const filters: any = {};
    if (status) filters.status = status;
    if (paymentMethod) filters.paymentMethod = paymentMethod;
    if (category) filters.category = category;
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }
    return await withDbConnection(async () => {
      const pipeline = [
        { $match: filters },
        { $group: {
            _id: "$donor",
            total: { $sum: "$amount" },
            lastDate: { $max: "$date" }
          }
        },
        { $sort: { total: -1 as const } },
        { $limit: limit },
      ];
      const topDonors = await Donation.aggregate(pipeline);
      return NextResponse.json(topDonors);
    });
  } catch (error) {
    console.error('Error fetching top donors:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch top donors',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET_ANALYTICS(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentMethod = searchParams.get('paymentMethod');
    const category = searchParams.get('category');
    const minAmount = searchParams.get('minAmount') ? Number(searchParams.get('minAmount')) : undefined;
    const maxAmount = searchParams.get('maxAmount') ? Number(searchParams.get('maxAmount')) : undefined;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const filters: any = {};
    if (status) filters.status = status;
    if (paymentMethod) filters.paymentMethod = paymentMethod;
    if (category) filters.category = category;
    if (minAmount !== undefined) filters.amount = { ...filters.amount, $gte: minAmount };
    if (maxAmount !== undefined) filters.amount = { ...filters.amount, $lte: maxAmount };
    if (startDate || endDate) {
      filters.date = {};
      if (startDate) filters.date.$gte = new Date(startDate);
      if (endDate) filters.date.$lte = new Date(endDate);
    }
    return await withDbConnection(async () => {
      // Stats: total amount, number of donors, average donation
      const statsAgg = await Donation.aggregate([
        { $match: filters },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
            numDonors: { $addToSet: "$donor" },
            averageDonation: { $avg: "$amount" },
            count: { $sum: 1 }
          }
        }
      ]);
      const stats = statsAgg[0] || { totalAmount: 0, numDonors: [], averageDonation: 0, count: 0 };
      // Pie chart data (by category)
      const pieData = await Donation.aggregate([
        { $match: filters },
        { $group: { _id: "$category", value: { $sum: "$amount" } } },
        { $project: { name: "$_id", value: 1, _id: 0 } }
      ]);
      // Monthly data
      const monthlyData = await Donation.aggregate([
        { $match: filters },
        { $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          amount: { $sum: "$amount" }
        } },
        { $project: { month: "$_id", amount: 1, _id: 0 } },
        { $sort: { month: 1 as const } }
      ]);
      // Repeat donors
      const repeatDonorsAgg = await Donation.aggregate([
        { $match: filters },
        { $group: { _id: "$donor", count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
        { $project: { donor: "$_id", _id: 0 } }
      ]);
      const repeatDonors = repeatDonorsAgg.map(d => d.donor);
      return NextResponse.json({
        stats: {
          totalAmount: stats.totalAmount || 0,
          numDonors: stats.numDonors ? stats.numDonors.length : 0,
          averageDonation: stats.averageDonation || 0,
          count: stats.count || 0
        },
        pieData,
        monthlyData,
        repeatDonors
      });
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch analytics',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("data",data);
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