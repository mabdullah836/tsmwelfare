import { handlePatchOrPut } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'
import { deleteImage } from '@/lib/cloudinary'
import Event from '@/models/Event'
import { NextResponse } from 'next/server'

type RouteParams = { params: Promise<{ id: string }> }

export async function DELETE(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params;
  try {
    const event = await withDbConnection(() => Event.findById(id));
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    if (event.imageUrl) {
      await deleteImage(event.imageUrl);
    }
    await withDbConnection(() => Event.findByIdAndDelete(id));
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Failed to delete event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params;
  try {
    const event = await withDbConnection(async () => {
      return Event.findById(id)
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: RouteParams
) {
  const { id } = await params;
  const data = await request.json();
  return await withDbConnection(() => handlePatchOrPut({ model: Event, id: id, data }));
} 