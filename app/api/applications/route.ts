import { NextResponse } from "next/server"
import { withDbConnection } from "@/lib/mongodb"
import { Application } from "@/models/Application"

export async function GET() {
  try {
    const applications = await withDbConnection(async () => {
      return await Application.find().sort({ createdAt: -1 })
    })
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const application = await withDbConnection(async () => {
      return await Application.create(data)
    })
    return NextResponse.json(application)
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    )
  }
} 