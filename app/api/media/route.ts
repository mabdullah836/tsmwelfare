import { NextRequest, NextResponse } from 'next/server'
import Media from '@/models/Media'
import { deleteImage } from '@/lib/cloudinary'
import { handleBulkDelete, handleGetAll } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder')
      const query = folder === 'general' 
        ? { $or: [{ folder: 'general' }, { folder: null }, { folder: { $exists: false } }] }
        : folder 
          ? { folder } 
          : {}
    return await withDbConnection(() => handleGetAll({ model: Media, sort: { createdAt: -1 }, query }))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { ids } = await request.json()
  return await withDbConnection(() => handleBulkDelete({
    model: Media,
    ids,
    perItemCleanup: async (media) => {
      if (media.publicId) await deleteImage(media.publicId)
  }
  }))
} 