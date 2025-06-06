import { NextRequest, NextResponse } from 'next/server'
import { withDbConnection } from '@/lib/mongodb'
import { deleteImage } from '@/lib/cloudinary'
import Team from '@/models/Team'

interface Params {
  params: {
    id: string
  }
}

// GET single team member
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const teamMember = await withDbConnection(async () => {
      return Team.findById(params.id)
    })
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    )
  }
}

// PATCH update team member
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const data = await request.json()
    
    const teamMember = await withDbConnection(async () => {
      return Team.findByIdAndUpdate(
        params.id,
        { ...data },
        { new: true }
      )
    })
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error updating team member:', error)
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

// DELETE team member
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    // First, get the team member to access their imageUrl
    const member = await withDbConnection(async () => {
      return Team.findById(params.id)
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }

    // If there's an image, delete it from Cloudinary
    if (member.imageUrl) {
      try {
        await deleteImage(member.imageUrl)
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError)
        // Continue with member deletion even if image deletion fails
      }
    }

    // Delete the team member from the database
    await withDbConnection(async () => {
      return Team.findByIdAndDelete(params.id)
    })

    return NextResponse.json({ message: 'Team member deleted successfully' })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
} 