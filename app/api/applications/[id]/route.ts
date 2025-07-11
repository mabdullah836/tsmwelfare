import { NextResponse } from "next/server"
import { withDbConnection } from "@/lib/mongodb"
import { Application } from "@/models/Application"
import { deleteImage } from "@/lib/cloudinary"
import { handlePatchOrPut } from '@/lib/utils/crudHandlers'

function extractPublicId(url: string) {
  const match = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)\./);
  return match ? match[1] : null;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  // If status is rejected, delete the application and its documents
  if (data.status === 'rejected') {
    // Find the application
    const application = await withDbConnection(() => Application.findById(params.id));
    if (application?.documents?.length > 0) {
      for (const url of application.documents) {
        const publicId = extractPublicId(url);
        if (publicId) await deleteImage(publicId);
      }
    }
    await withDbConnection(() => Application.findByIdAndDelete(params.id));
    return NextResponse.json({ success: true, message: 'Application and documents deleted' });
  }
  // Otherwise, update using shared handler
  return await withDbConnection(() => handlePatchOrPut({ model: Application, id: params.id, data: { ...data, reviewedAt: new Date() } }));
}