import { NextRequest, NextResponse } from 'next/server'
import { Application } from '@/models/Application'
import { handleBulkDelete, handlePost, handleGetPaginated, parsePagination } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const { page, limit, search } = parsePagination(searchParams, 10)
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
  try {
    const data = await request.json()    
    // Validate required fields
    const requiredFields = ['type', 'name', 'cnic', 'email', 'phone', 'address', 'description', 'documents']
    for (const field of requiredFields) {
      if (!data[field]) {
        console.error(`Missing required field: ${field}`)
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }
    
    return await withDbConnection(() => handlePost({ model: Application, data }))
  } catch (error) {
    console.error("Application POST error:", error)
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { ids } = await request.json()
  return await withDbConnection(() => handleBulkDelete({ model: Application, ids }))
} 