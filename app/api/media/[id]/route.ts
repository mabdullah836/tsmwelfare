import { withDbConnection } from '@/lib/mongodb'
import { deleteImage } from '@/lib/cloudinary'
import Media from '@/models/Media'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const media = await withDbConnection(() => Media.findById(params.id));
    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }
    if (media.publicId) {
      await deleteImage(media.publicId);
    }
    await withDbConnection(() => Media.findByIdAndDelete(params.id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
} 