import { NextResponse } from 'next/server'
import Event from '@/models/Event'
import { deleteImage } from '@/lib/cloudinary'
import { handleBulkDelete, handlePost, handleGetPaginated, parsePagination } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const { page, limit, search } = parsePagination(searchParams, 10)
  return await withDbConnection(() => handleGetPaginated({
    model: Event,
    sort: { date: 1 },
    page,
    limit,
    search,
    searchFields: ['title', 'description', 'location']
  }))
}

export async function POST(request: Request) {
    const data = await request.json()
  return await withDbConnection(() => handlePost({ model: Event, data }))
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data
    const event = await withDbConnection(() => Event.findByIdAndUpdate(id, updateData, { new: true }))
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json(event)
  } catch (error) {
    console.error('Failed to update event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { ids } = await request.json()
  return await withDbConnection(() => handleBulkDelete({
    model: Event,
    ids,
    perItemCleanup: async (event) => {
      if (event.imageUrl) await deleteImage(event.imageUrl)
  }
  }))
} 