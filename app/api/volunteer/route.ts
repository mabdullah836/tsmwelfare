import { NextRequest } from 'next/server'
import { VolunteerModel } from '@/models/volunteer'
import { handleBulkDelete, handlePost, handleGetPaginated, parsePagination } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const { page, limit, search } = parsePagination(searchParams, 10)
  return await withDbConnection(() => handleGetPaginated({
    model: VolunteerModel,
    sort: { createdAt: -1 },
    page,
    limit,
    search,
    searchFields: ['name', 'email', 'phone', 'city']
  }))
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  return await withDbConnection(() => handlePost({ model: VolunteerModel, data }))
}

export async function DELETE(request: Request) {
  const { ids } = await request.json()
  return await withDbConnection(() => handleBulkDelete({ model: VolunteerModel, ids }))
} 