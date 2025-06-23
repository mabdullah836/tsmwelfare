import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import { VolunteerModel } from '@/models';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const volunteer = await withDbConnection(async () => {
      return VolunteerModel.findByIdAndUpdate(
        id,
        { status: body.status },
        { new: true }
      );
    });

    if (!volunteer) {
      return NextResponse.json(
        { success: false, message: "Volunteer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: volunteer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating volunteer status:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update volunteer status" },
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
      return VolunteerModel.findByIdAndDelete(id);
    });
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Volunteer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Volunteer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting volunteer:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete volunteer" },
      { status: 500 }
    );
  }
} 