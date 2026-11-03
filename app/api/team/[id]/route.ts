import { NextRequest, NextResponse } from 'next/server'
import { handlePatchOrPut } from '@/lib/utils/crudHandlers'
import { withDbConnection } from '@/lib/mongodb'
import { deleteImage } from '@/lib/cloudinary'
import Team from '@/models/Team'

type RouteParams = { params: Promise<{ id: string }> }


// GET single team member
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const teamMember = await withDbConnection(async () => {
      return Team.findById(id)
    })
    
    if (!teamMember) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(teamMember)
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team member' },
      { status: 500 }
    )
  }
}

// PATCH update team member
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const data = await request.json();
  return await withDbConnection(() => handlePatchOrPut({ model: Team, id: id, data }));
}

// DELETE team member
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  try {
    const member = await withDbConnection(() => Team.findById(id));
    if (!member) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }
    if (member.imageUrl) {
      await deleteImage(member.imageUrl);
    }
    await withDbConnection(() => Team.findByIdAndDelete(id));
    return NextResponse.json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
} 