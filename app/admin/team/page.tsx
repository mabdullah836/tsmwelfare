"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import type { DropResult } from "@hello-pangea/dnd"
import { uploadImage } from "@/lib/cloudinary"
import { Edit2Icon, GridIcon, ListIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { AlertMessage } from "@/components/ui/alert-message"

// This interface matches our Mongoose model
interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  imageUrl?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

interface TeamMemberFormData {
  name: string
  role: string
  bio: string
  imageUrl?: string
}

interface MediaItem {
  _id: string
  url: string
  folder: string
}

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch('/api/team')
      if (!response.ok) {
        throw new Error('Failed to fetch team members')
      }
      const data = await response.json()
      
      // Fetch only team member images
      const mediaResponse = await fetch('/api/media?folder=team-members')
      if (mediaResponse.ok) {
        const mediaData: MediaItem[] = await mediaResponse.json()
        // Map media URLs to team members, only using team-member images
        const teamWithImages = data.map((member: TeamMember) => {
          const memberMedia = mediaData.find(m => m.url === member.imageUrl && m.folder === 'team-members')
          return {
            ...member,
            imageUrl: memberMedia?.url || member.imageUrl
          }
        })
        setTeamMembers(teamWithImages)
      } else {
        setTeamMembers(data)
      }
    } catch (error) {
      setAlert({
        message: "Failed to fetch team members",
        type: "error"
      })
      setTeamMembers([]) // Set empty array as fallback
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result?.destination) return

    const items = Array.from(teamMembers)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setTeamMembers(updatedItems)

    // Update order in database
    try {
      const updates = updatedItems.map(item => ({
        id: item._id,
        order: item.order,
      }))

      const response = await fetch('/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update team member order')
      }

      setAlert({
        message: "Team member order has been updated successfully",
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to update team member order",
        type: "error"
      })
      // Revert the state if update fails
      await fetchTeamMembers()
    }
  }

  const handleEditMember = async (formData: FormData) => {
    if (!editingMember) return
    
    setIsSubmitting(true)
    try {
      const imageFile = formData.get('image') as File
      let imageUrl = editingMember.imageUrl

      if (imageFile?.size > 0) {
        const imageData = new FormData()
        imageData.append('files', imageFile)
        const uploadResponse = await fetch('/api/media/upload', {
          method: 'POST',
          body: imageData,
          headers: {
            'folder': 'team-members'
          },
        })
        
        if (!uploadResponse.ok) {
          const error = await uploadResponse.json()
          throw new Error(error.message || 'Failed to upload image')
        }
        
        const uploadResult = await uploadResponse.json()
        imageUrl = uploadResult[0]?.url // Access first uploaded file's URL
      }

      const updatedMember = {
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        bio: formData.get('bio') as string,
        imageUrl,
      }

      const response = await fetch(`/api/team/${editingMember._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMember),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update team member')
      }

      const updated = await response.json()
      setTeamMembers(prev => prev.map(member => 
        member._id === editingMember._id ? updated : member
      ))

      setAlert({
        message: `Successfully updated ${updated.name}'s profile`,
        type: "success"
      })

      setIsDialogOpen(false)
      setEditingMember(null)
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to update team member",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddMember = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      const imageFile = formData.get('image') as File
      let imageUrl = undefined

      if (imageFile?.size > 0) {
        const imageData = new FormData()
        imageData.append('files', imageFile)
        const uploadResponse = await fetch('/api/media/upload', {
          method: 'POST',
          body: imageData,
          headers: {
            'folder': 'team-members'
          },
        })
        
        if (!uploadResponse.ok) {
          const error = await uploadResponse.json()
          throw new Error(error.message || 'Failed to upload image')
        }
        
        const uploadResult = await uploadResponse.json()
        imageUrl = uploadResult[0]?.url // Access first uploaded file's URL
      }

      const newMember = {
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        bio: formData.get('bio') as string,
        imageUrl,
      }

      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMember),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to add team member')
      }

      const createdMember = await response.json()
      setTeamMembers(prev => [...prev, createdMember])

      setAlert({
        message: `Successfully added ${createdMember.name} to the team`,
        type: "success"
      })

      setIsDialogOpen(false)
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to add team member",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteMember = async (id: string) => {
    setIsDeleting(id)
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete team member')
      }

      setTeamMembers(prev => prev.filter(member => member._id !== id))
      setAlert({
        message: "Team member has been permanently removed",
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to remove team member",
        type: "error"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const TeamMemberForm = ({ member }: { member?: TeamMember }) => {
    const isEditing = !!member
    return (
      <form action={isEditing ? handleEditMember : handleAddMember} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={member?.name} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input 
            id="role" 
            name="role" 
            defaultValue={member?.role} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            name="bio" 
            defaultValue={member?.bio} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="image">
            {member?.imageUrl ? "Change Image" : "Image"}
          </Label>
          <Input id="image" name="image" type="file" accept="image/*" />
          {member?.imageUrl && (
            <div className="mt-2 relative h-20 rounded overflow-hidden">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? (isEditing ? "Updating..." : "Adding...") 
            : (isEditing ? "Update Member" : "Add Member")
          }
        </Button>
      </form>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container py-10">
          <div className="flex items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="ml-2">Loading team members...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Team Members</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <ListIcon className="h-4 w-4" />
              </Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) setEditingMember(null)
            }}>
              <DialogTrigger asChild>
                <Button>Add Team Member</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingMember ? "Edit Team Member" : "Add New Team Member"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingMember 
                      ? "Update the team member's information below."
                      : "Add a new member to your team. They will be displayed on the website."
                    }
                  </DialogDescription>
                </DialogHeader>
                <TeamMemberForm member={editingMember || undefined} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="team-members">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  "space-y-4",
                  viewMode === 'grid' && "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 space-y-0"
                )}
              >
                {teamMembers.length === 0 ? (
                  <Card className="p-8 text-center">
                    <CardContent>
                      <p className="text-muted-foreground">No team members yet. Add your first team member to get started.</p>
                    </CardContent>
                  </Card>
                ) : (
                  teamMembers.map((member, index) => (
                    <Draggable key={member._id} draggableId={member._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card>
                            {viewMode === 'grid' ? (
                              <>
                                <div className="aspect-square relative bg-muted">
                                  <Image
                                    src={member.imageUrl || `/placeholder.svg?height=400&width=400&text=${member.name.split(" ")[0]}`}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                  <div className="absolute top-2 right-2 flex items-center gap-2">
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      onClick={() => {
                                        setEditingMember(member)
                                        setIsDialogOpen(true)
                                      }}
                                    >
                                      <Edit2Icon className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleDeleteMember(member._id)}
                                      disabled={isDeleting === member._id}
                                    >
                                      {isDeleting === member._id ? "..." : "Delete"}
                                    </Button>
                                  </div>
                                </div>
                                <CardContent className="pt-4">
                                  <h3 className="font-bold mb-1">{member.name}</h3>
                                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                                  <p className="text-muted-foreground text-sm line-clamp-3">{member.bio}</p>
                                </CardContent>
                              </>
                            ) : (
                              <>
                                <CardHeader className="flex flex-row items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    {member.imageUrl && (
                                      <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                          src={member.imageUrl}
                                          alt={member.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    )}
                                    <div>
                                      <CardTitle>{member.name}</CardTitle>
                                      <p className="text-primary text-sm font-medium">{member.role}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        setEditingMember(member)
                                        setIsDialogOpen(true)
                                      }}
                                    >
                                      <Edit2Icon className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => handleDeleteMember(member._id)}
                                      disabled={isDeleting === member._id}
                                    >
                                      {isDeleting === member._id ? "Deleting..." : "Delete"}
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-muted-foreground">{member.bio}</p>
                                </CardContent>
                              </>
                            )}
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {alert && (
        <AlertMessage
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  )
} 