import { NextRequest, NextResponse } from 'next/server'
import Media from '@/models/Media'
import { deleteImage } from '@/lib/cloudinary'
import { handleBulkDelete, handleGetPaginated, parsePagination } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'
import { getAdminFromRequest } from '@/lib/auth'

const PRIVATE_FOLDERS = ['applications']

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder')
    const { page, limit, search } = parsePagination(searchParams, 12)
    // Application documents (CNIC scans etc.) are private; only admins may list them.
    const isAdmin = Boolean(await getAdminFromRequest(request))
    if (!isAdmin && folder && PRIVATE_FOLDERS.includes(folder)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const query = folder === 'general' 
      ? { $or: [{ folder: 'general' }, { folder: null }, { folder: { $exists: false } }] }
      : folder 
        ? { folder } 
        : isAdmin ? {} : { folder: { $nin: PRIVATE_FOLDERS } }
    return await withDbConnection(() => handleGetPaginated({
      model: Media,
      sort: { createdAt: -1 },
      query,
      page,
      limit,
      search,
      searchFields: ['title', 'name', 'type']
    }))
  } catch (error) {
    console.error('Fetch media error:', error)
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

export async function PATCH(request: NextRequest) {
  try {
    const { id, status, thumbnail } = await request.json();
    if (!id) return NextResponse.json({ error: 'Media ID required' }, { status: 400 });
    const update: Record<string, string> = {};
    if (status) update.status = status;
    if (thumbnail) update.thumbnail = thumbnail;
    const updated = await withDbConnection(() => Media.findByIdAndUpdate(id, update, { new: true }));
    if (!updated) return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Failed to update media:', error);
    return NextResponse.json({ error: 'Failed to update media' }, { status: 500 });
  }
} 