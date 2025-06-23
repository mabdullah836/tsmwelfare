import { NextResponse } from "next/server"
import { withDbConnection } from "@/lib/mongodb"
import { Application } from "@/models/Application"
import { deleteImage } from "@/lib/cloudinary"

function extractPublicId(url: string) {
  const match = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)\./);
  return match ? match[1] : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { status } = data

    if (status === "rejected") {
      const application = await withDbConnection(async () => {
        return Application.findById(params.id)
      })
      if (application?.documents?.length > 0) {
        await Promise.all(
          application.documents.map((url: string) => {
            const publicId = extractPublicId(url)
            return publicId ? deleteImage(publicId) : Promise.resolve()
          })
        )
      }
      await withDbConnection(async () => {
        await Application.findByIdAndDelete(params.id)
      })
      return NextResponse.json({ success: true, message: "Application and documents deleted" })
    }

    const application = await withDbConnection(async () => {
      return Application.findByIdAndUpdate(
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