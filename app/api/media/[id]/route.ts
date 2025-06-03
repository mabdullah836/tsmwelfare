import { NextRequest, NextResponse } from 'next/server'
import { withDbConnection } from '@/lib/mongodb'
import Media from '@/models/Media'
import { deleteImage } from '@/lib/cloudinary'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id // Extract id at the start
  
  try {
    const media = await withDbConnection(async () => {
      return Media.findById(id);
    });

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      );
    }

    // Delete from Cloudinary first
    if (media.publicId) {
      await deleteImage(media.publicId);
    }

    // Then delete from database
    await withDbConnection(async () => {
      return Media.findByIdAndDelete(id);
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete media error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete media',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 