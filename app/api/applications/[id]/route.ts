import { NextResponse } from "next/server"
import { withDbConnection } from "@/lib/mongodb"
import { Application } from "@/models/Application"
import { deleteImage } from "@/lib/cloudinary"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { status } = data

    const application = await withDbConnection(async () => {
      // If application is being rejected, delete associated documents from Cloudinary
      if (status === "rejected") {
        const application = await Application.findById(params.id)
        if (application?.documents?.length > 0) {
          await Promise.all(
            application.documents.map((url: string) => deleteImage(url))
          )
        }
      }

      return await Application.findByIdAndUpdate(
        params.id,
        {
          ...data,
          reviewedAt: new Date(),
        },
        { new: true }
      )
    })

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    )
  }
} 