import { NextRequest, NextResponse } from "next/server";
import { withDbConnection } from "@/lib/mongodb";
import Media from "@/models/Media";

export async function DELETE(req: NextRequest) {
  const { ids } = await req.json();
  if (!Array.isArray(ids)) {
    return NextResponse.json({ success: false, message: "Invalid ids" }, { status: 400 });
  }
  try {
    await withDbConnection(async () => {
      await Media.deleteMany({ _id: { $in: ids } });
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: error?.toString() }, { status: 500 });
  }
} 