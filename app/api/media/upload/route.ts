import { NextRequest, NextResponse } from 'next/server'
import { withDbConnection } from '@/lib/mongodb'
import Media from '@/models/Media'
import { uploadImage } from '@/lib/cloudinary'

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as Blob | null
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert to buffer
    const buffer = Buffer.from(await file.arrayBuffer())
    const cloudinaryResult = await uploadImage(buffer)
    
    // Get file name and type from File object properties
    const cleanName = (file as File).name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const fileType = (file as File).type.split('/')[0] as 'image' | 'video'

    const mediaItem = await withDbConnection(async () => {
      return Media.create({
        name: cleanName,
        title: (file as File).name,
        type: fileType,
        url: cloudinaryResult.secure_url,
        size: `${((file as File).size / (1024 * 1024)).toFixed(2)}MB`,
        publicId: cloudinaryResult.public_id
      });
    });

    return NextResponse.json(mediaItem)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload file', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}