import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files')

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      )
    }

    const uploadPromises = files.map(async (file: any) => {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'team-members', // Separate folder for team member images
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )

        uploadStream.end(buffer)
      })
    })

    const results = await Promise.all(uploadPromises)
    const urls = results.map((result: any) => result.secure_url)

    return NextResponse.json(
      urls.length === 1 ? { url: urls[0] } : { urls },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error uploading team member image:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
} 