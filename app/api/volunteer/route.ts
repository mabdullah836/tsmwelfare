import { NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import { VolunteerModel } from '@/models';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    
    // Check for existing application
    const existingApplication = await withDbConnection(async () => {
      return VolunteerModel.findOne({ email: formData.email });
    });

    if (existingApplication) {
      return NextResponse.json(
        { 
          success: false, 
          message: "You have already submitted a volunteer application. We'll contact you soon about your existing application.",
          status: existingApplication.status
        },
        { status: 400 }
      );
    }
    
    // Create new volunteer application using withDbConnection
    const volunteer = await withDbConnection(async () => {
      return VolunteerModel.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        occupation: formData.occupation,
        availability: formData.availability,
        interests: formData.interests,
        skills: formData.skills || '',
        experience: formData.experience || '',
        motivation: formData.motivation,
        references: formData.references || '',
        status: 'pending'
      });
    });

    return NextResponse.json(
      { success: true, message: "Volunteer application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing volunteer application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit volunteer application" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const volunteers = await withDbConnection(async () => {
      return VolunteerModel.find().sort({ createdAt: -1 });
    });
    
    return NextResponse.json(
      { success: true, data: volunteers },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching volunteer applications:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch volunteer applications" },
      { status: 500 }
    );
  }
} 