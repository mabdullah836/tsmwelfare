import { NextResponse } from 'next/server'
import { withDbConnection } from '@/lib/mongodb'
import Event from '@/models/Event'

export async function GET() {
  try {
    const events = await withDbConnection(async () => {
      return Event.find().sort({ date: 1 })
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const event = await withDbConnection(async () => {
      return Event.create(data)
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    const event = await withDbConnection(async () => {
      return Event.findByIdAndUpdate(
        id,
        updateData,
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