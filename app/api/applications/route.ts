import { NextRequest } from 'next/server'
import { Application } from '@/models/Application'
import { handleBulkDelete, handleGetAll, handlePost, handleGetPaginated } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const search = searchParams.get('q') || ''
  return await withDbConnection(() => handleGetPaginated({
    model: Application,
    sort: { createdAt: -1 },
    page,
    limit,
    search,
    searchFields: ['name', 'email', 'type']
  }))
}

export async function POST(request: NextRequest) {
    const data = await request.json()
  return await withDbConnection(() => handlePost({ model: Application, data }))
}

export async function DELETE(request: Request) {
  const { ids } = await request.json()
  return await withDbConnection(() => handleBulkDelete({ model: Application, ids }))
} 