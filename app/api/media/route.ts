import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Media from '@/models/Media'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    await connectDB()
    const media = await Media.create(body)
    return NextResponse.json(media)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to create media' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const media = await Media.find().sort({ createdAt: -1 })
    return NextResponse.json(media)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
} 