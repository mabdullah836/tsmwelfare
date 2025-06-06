import { NextRequest, NextResponse } from 'next/server'
import Media from '@/models/Media'
import { withDbConnection } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get('folder')
    
    console.log('GET /api/media - Requested folder:', folder)

    const media = await withDbConnection(async () => {
      // If folder is 'general', also include items with no folder or null folder
      const query = folder === 'general' 
        ? { $or: [{ folder: 'general' }, { folder: null }, { folder: { $exists: false } }] }
        : folder 
          ? { folder } 
          : {}
      
      console.log('MongoDB query:', JSON.stringify(query, null, 2))
      
      const results = await Media.find(query).sort({ createdAt: -1 })
      console.log(`Found ${results.length} media items`)
      console.log('Folders found:', [...new Set(results.map(item => item.folder))])
      
      return results
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