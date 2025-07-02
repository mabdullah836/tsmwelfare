import { NextRequest, NextResponse } from 'next/server'
import Team from '@/models/Team'
import { deleteImage } from '@/lib/cloudinary'
import { handleBulkDelete, handleGetAll, handlePost } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'

// GET all team members
export async function GET() {
  return await withDbConnection(() => handleGetAll({ model: Team, sort: { order: 1 } }))
}

// POST new team member
export async function POST(request: NextRequest) {
    const data = await request.json()
  // Add order logic (highest order + 1)
      const maxOrder = await Team.findOne().sort('-order')
      const order = maxOrder ? maxOrder.order + 1 : 1
  return await withDbConnection(() => handlePost({ model: Team, data: { ...data, order } }))
}

// PUT update team member order
export async function PUT(request: NextRequest) {
  try {
    const updates = await request.json()
      for (const update of updates) {
        await Team.findByIdAndUpdate(update.id, { order: update.order })
      }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update team member order' }, { status: 500 })
  }
}

// DELETE bulk team members
export async function DELETE(request: Request) {
  const { ids } = await request.json()
  return await withDbConnection(() => handleBulkDelete({
    model: Team,
    ids,
    perItemCleanup: async (member) => {
      if (member.imageUrl) await deleteImage(member.imageUrl)
  }
  }))
} 