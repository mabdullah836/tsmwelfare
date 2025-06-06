import { NextResponse } from 'next/server'
import { withDbConnection } from '@/lib/mongodb'
import { deleteImage } from '@/lib/cloudinary'
import Event from '@/models/Event'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First, get the event to access its imageUrl
    const event = await withDbConnection(async () => {
      return Event.findById(params.id)
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // If there's an image, delete it from Cloudinary
    if (event.imageUrl) {
      try {
        await deleteImage(event.imageUrl)
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError)
        // Continue with event deletion even if image deletion fails
      }
    }

    // Delete the event from the database
    await withDbConnection(async () => {
      return Event.findByIdAndDelete(params.id)
    })

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await withDbConnection(async () => {
      return Event.findById(params.id)
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
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()

    const event = await withDbConnection(async () => {
      return Event.findByIdAndUpdate(
        params.id,
        data,
        { new: true }
      )
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
} 