import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Donation from '@/models/Donation';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const donation = await withDbConnection(async () => {
      return Donation.findByIdAndUpdate(
        id,
        { status: body.status },
        { new: true }
      );
    });

    if (!donation) {
      return NextResponse.json(
        { success: false, message: "Donation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: donation },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating donation status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update donation status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const deleted = await withDbConnection(async () => {
      return Donation.findByIdAndDelete(id);
    });
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Donation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Donation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting donation:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete donation" },
      { status: 500 }
    );
  }
} 