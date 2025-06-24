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
import { Edit2Icon, Loader2Icon, GridIcon, ListIcon } from "lucide-react"
import { format } from "date-fns"
import { AlertMessage } from "@/components/ui/alert-message"
import { NoRecords } from '@/components/ui/no-records'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  imageUrl?: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

interface MediaItem {
  _id: string
  url: string
  folder: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
     
      const response = await fetch('/api/events')
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      const data = await response.json()

      // Fetch only event images
      const mediaResponse = await fetch('/api/media?folder=events')
      if (mediaResponse.ok) {
        const mediaData: MediaItem[] = await mediaResponse.json()
        // Map media URLs to events, only using event images
        const eventsWithImages = data.map((event: Event) => {
          const eventMedia = mediaData.find(m => m.url === event.imageUrl && m.folder === 'events')
          return {
            ...event,
            imageUrl: eventMedia?.url || event.imageUrl
          }
        })
        setEvents(eventsWithImages)
      } else {
        setEvents(data)
      }
      if (data.length > 0) {
      setAlert({
          message: `Successfully loaded ${data.length} events`,
          type: "success"
        })
      }
    } catch (error) {
      setAlert({
        message: "Failed to fetch events",
        type: "error"
      })
      setEvents([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditEvent = async (formData: FormData) => {
    if (!editingEvent) return
    
    setIsSubmitting(true)
    try {
      const imageFile = formData.get('image') as File
      let imageUrl = editingEvent.imageUrl

      if (imageFile?.size > 0) {
        const imageData = new FormData()
        imageData.append('files', imageFile)
        const uploadResponse = await fetch('/api/media/upload', {
          method: 'POST',
          body: imageData,
          headers: {
            'folder': 'events',
            'Content-Type': 'multipart/form-data',
          },
        })
        
        if (!uploadResponse.ok) {
          const error = await uploadResponse.json()
          throw new Error(error.message || 'Failed to upload image')
        }
        
        const uploadResult = await uploadResponse.json()
        imageUrl = uploadResult[0]?.url
      }

      const updatedEvent = {
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        imageUrl,
      }

      const response = await fetch(`/api/events/${editingEvent._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update event')
      }

      const updated = await response.json()
      setEvents(prev => prev.map(event => 
        event._id === editingEvent._id ? updated : event
      ))

      setAlert({
        message: `Successfully updated event "${updatedEvent.title}"`,
        type: "success"
      })

      setIsDialogOpen(false)
      setEditingEvent(null)
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to update event",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddEvent = async (formData: FormData) => {
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
            'folder': 'events',
            'Content-Type': 'multipart/form-data',
          },
        })
        
        if (!uploadResponse.ok) {
          const error = await uploadResponse.json()
          throw new Error(error.message || 'Failed to upload image')
        }
        
        const uploadResult = await uploadResponse.json()
        imageUrl = uploadResult[0]?.url
      }

      const newEvent = {
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        time: formData.get('time'),
        location: formData.get('location'),
        imageUrl,
      }

      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to add event')
      }

      const createdEvent = await response.json()
      setEvents(prev => [...prev, createdEvent])

      setAlert({
        message: `Successfully created new event "${createdEvent.title}"`,
        type: "success"
      })

      setIsDialogOpen(false)
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to add event",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    setIsDeleting(id)
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete event')
      }

      setEvents(prev => prev.filter(event => event._id !== id))
      setAlert({
        message: "Event has been permanently removed",
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to delete event",
        type: "error"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const EventForm = ({ event }: { event?: Event }) => {
    const isEditing = !!event
    return (
      <form action={isEditing ? handleEditEvent : handleAddEvent} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            defaultValue={event?.title} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            defaultValue={event?.description} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input 
            id="date" 
            name="date" 
            type="date"
            defaultValue={event?.date ? new Date(event.date).toISOString().split('T')[0] : undefined}
            required 
          />
        </div>
        <div>
          <Label htmlFor="time">Time</Label>
          <Input 
            id="time" 
            name="time" 
            type="time"
            defaultValue={event?.time} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            name="location" 
            defaultValue={event?.location} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="image">
            {event?.imageUrl ? "Change Image" : "Image"}
          </Label>
          <Input id="image" name="image" type="file" accept="image/*" />
          {event?.imageUrl && (
            <div className="mt-2 relative h-40 rounded overflow-hidden">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting 
            ? (isEditing ? "Updating..." : "Adding...") 
            : (isEditing ? "Update Event" : "Add Event")
          }
        </Button>
      </form>
    )
  }

  // Filtered events
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase()) ||
    event.description.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30">
        <div className="container py-10">
          <div className="flex items-center justify-center">
            <Loader2Icon className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading events...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full md:w-72"
            />
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
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) setEditingEvent(null)
            }}>
              <DialogTrigger asChild>
                <Button>Add Event</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingEvent ? "Edit Event" : "Add New Event"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingEvent 
                      ? "Update the event's information below."
                      : "Add a new event to your calendar. Fill in the details below."
                    }
                  </DialogDescription>
                </DialogHeader>
                <EventForm event={editingEvent || undefined} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="relative min-h-[200px]">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
              <Loader2Icon className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading events...</span>
            </div>
          ) : filteredEvents.length === 0 ? (
            <NoRecords title="No events scheduled" description="Add your first event to get started." />
          ) : (
            <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4'}>
              {filteredEvents.map((event) => (
                <Card key={event._id}>
                  <CardHeader className={viewMode === 'grid' ? 'flex flex-col items-center gap-4 space-y-0' : 'flex flex-row items-center gap-4 space-y-0'}>
                    {event.imageUrl && (
                      <div className="relative h-20 w-32 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="mb-1">{event.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingEvent(event)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit2Icon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteEvent(event._id)}
                            disabled={isDeleting === event._id}
                          >
                            {isDeleting === event._id ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                        <span>{event.time}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 