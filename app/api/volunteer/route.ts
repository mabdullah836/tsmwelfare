import { NextRequest } from 'next/server'
import { VolunteerModel } from '@/models'
import { handleBulkDelete, handleGetAll, handlePost } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'

export async function GET() {
  return await withDbConnection(() => handleGetAll({ model: VolunteerModel, sort: { createdAt: -1 } }))
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  return await withDbConnection(() => handlePost({ model: VolunteerModel, data }))
}

export async function DELETE(request: Request) {
  const { ids } = await request.json()
  return await withDbConnection(() => handleBulkDelete({ model: VolunteerModel, ids }))
} 