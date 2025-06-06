import { NextRequest, NextResponse } from 'next/server'
import { withDbConnection } from '@/lib/mongodb'
import Team from '@/models/Team'

// GET all team members
export async function GET() {
  try {
    const teamMembers = await withDbConnection(async () => {
      return Team.find().sort({ order: 1 })
    })
    
    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

// POST new team member
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const teamMember = await withDbConnection(async () => {
      // Get the highest order number and add 1
      const maxOrder = await Team.findOne().sort('-order')
      const order = maxOrder ? maxOrder.order + 1 : 1
      
      return Team.create({ ...data, order })
    })
    
    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}

// PUT update team member order
export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json()
    
    await withDbConnection(async () => {
      // Update each team member's order
      for (const update of updates) {
        await Team.findByIdAndUpdate(update.id, { order: update.order })
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating team member order:', error)
    return NextResponse.json(
      { error: 'Failed to update team member order' },
      { status: 500 }
    )
  }
} 