import { NextRequest, NextResponse } from 'next/server'
import Media from '@/models/Media'
import { withDbConnection } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const media = await withDbConnection(async () => {
      return Media.find().sort({ createdAt: -1 });
    });
    
    return NextResponse.json(media)
  } catch (error) {
    console.error('Failed to fetch media:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch media',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 