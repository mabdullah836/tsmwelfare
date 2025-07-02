import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { withDbConnection } from '@/lib/mongodb'
import Media from '@/models/Media'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    console.log("==========>>>>>>",files)
    const folder = formData.get('folder')?.toString() || 'general'
    console.log("==============>>>>>>>",formData)
    console.log('Upload request for folder:', folder)

    if (!files?.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadPromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      console.log('Uploading file:', file.name, 'to folder:', folder)

      // Upload to Cloudinary with folder structure
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `tsmwelfare/${folder}`,
            resource_type: 'auto',
          },
          (error: unknown, result: unknown) => {
            if (error) reject(error)
            else resolve(result)
          }
        )

        uploadStream.end(buffer)
      })

      console.log('Cloudinary upload result:', {
        publicId: (result as any).public_id,
        url: (result as any).secure_url,
        folder: folder
      })

      // Save to MongoDB with folder information
      const media = await withDbConnection(async () => {
        return await Media.create({
          name: file.name,
          title: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: (result as any).secure_url,
          publicId: (result as any).public_id,
          size: ((result as any).bytes / (1024 * 1024)).toFixed(2) + ' MB',
          folder: folder,
        })
      })

      return media
    })

    const uploadedFiles = await Promise.all(uploadPromises)
    console.log('All files uploaded successfully:', uploadedFiles.length)

    return NextResponse.json(uploadedFiles)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    )
  }
}