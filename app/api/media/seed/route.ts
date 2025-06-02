import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Media from '@/models/Media'

const sampleMedia = [
  {
    name: 'flood-relief-1',
    title: 'Flood Relief Efforts in Sindh',
    description: 'Providing emergency supplies and support to flood-affected families in Sindh',
    type: 'image',
    url: '/images/media/flood-relief-1.jpg',
    size: '1.2MB',
    publicId: 'flood-relief-1'
  },
  {
    name: 'medical-camp-1',
    title: 'Medical Camp in Remote Areas',
    description: 'Free medical checkups and medicine distribution in underserved communities',
    type: 'image',
    url: '/images/media/medical-camp-1.jpg',
    size: '1.5MB',
    publicId: 'medical-camp-1'
  },
  {
    name: 'education-support-1',
    title: 'Education Support Program',
    description: 'Distributing school supplies and uniforms to underprivileged students',
    type: 'image',
    url: '/images/media/education-1.jpg',
    size: '1.1MB',
    publicId: 'education-1'
  },
  {
    name: 'gaza-aid-1',
    title: 'Gaza Humanitarian Aid',
    description: 'Supporting the people of Gaza with essential supplies and medical aid',
    type: 'image',
    url: '/images/media/gaza-aid-1.jpg',
    size: '1.3MB',
    publicId: 'gaza-aid-1'
  }
]

export async function GET() {
  try {
    await connectDB()
    
    // Clear existing media items
    await Media.deleteMany({})
    
    // Insert sample media items
    const media = await Media.insertMany(sampleMedia)
    
    return NextResponse.json({ 
      message: 'Sample media items added successfully',
      count: media.length,
      media 
    })
  } catch (error) {
    console.error('Error seeding media:', error)
    return NextResponse.json({ error: 'Failed to seed media items' }, { status: 500 })
  }
} 