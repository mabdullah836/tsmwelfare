import { withDbConnection } from '@/lib/mongodb'
import { deleteImage } from '@/lib/cloudinary'
import Media from '@/models/Media'
import { NextResponse } from 'next/server'
import mongoose from 'mongoose';

type RouteParams = { params: Promise<{ id: string }> }

export async function DELETE(req: Request, { params }: RouteParams) {
  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid media id' }, { status: 400 });
  }
  try {
    const media = await withDbConnection(() => Media.findById(id));
    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }
    if (media.publicId) {
      await deleteImage(media.publicId);
    }
    await withDbConnection(() => Media.findByIdAndDelete(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
} 