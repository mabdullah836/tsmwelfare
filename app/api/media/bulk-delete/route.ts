import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Media from '@/models/Media';
import mongoose from 'mongoose';

export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json();
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No media ids provided' }, { status: 400 });
    }
    // Validate all ids
    const validIds = ids.filter((id: string) => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length === 0) {
      return NextResponse.json({ error: 'No valid media ids provided' }, { status: 400 });
    }
    await withDbConnection(() => Media.deleteMany({ _id: { $in: validIds } }));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Bulk delete failed' }, { status: 500 });
  }
} 