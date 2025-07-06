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
import { Edit2Icon, GridIcon, ListIcon } from "lucide-react"
import { format } from "date-fns"
import { AlertMessage } from "@/components/ui/alert-message"
import { NoRecords } from '@/components/ui/no-records'
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { ConfirmDialog } from '@/components/modals/ConfirmDialog'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { usePaginationFilter } from '@/lib/hooks/use-pagination-filter'
import { GridSkeleton } from "@/components/shared/skeletons/GridSkeleton"
import { uploadMedia } from '@/lib/services/media'
import { getEventsWithImages } from "@/lib/services/event"
import { Event } from "@/lib/types/event"

interface MediaItem {
  _id: string
  url: string
  folder: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')

 
useEffect(() => {
  loadEvents()
}, [])

const loadEvents = async () => {
  try {
    setIsLoading(true)
    const data = await getEventsWithImages()

    if (data.length > 0) {
      setEvents(data)
      setAlert({
        message: `Successfully loaded ${data.length} events`,
        type: "success"
      })
    } else {
      setEvents([])
      setAlert({
        message: "No events found",
        type: "error"
      })
    }
  } catch (error) {
    console.error("Error loading events:", error)
    setEvents([])
    setAlert({
      message: "Failed to fetch events",
      type: "error"
    })
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
        const uploaded = await uploadMedia([imageFile], 'events')
        imageUrl = uploaded[0]?.url
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
        const uploaded = await uploadMedia([imageFile], 'events')
        imageUrl = uploaded[0]?.url
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
    setIsSubmitting(true)
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
      setIsSubmitting(false)
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

  const {
    page,
    setPage,
    pageSize,
    totalPages,
    filtered: filteredEvents,
    paginated: paginatedEvents,
  } = usePaginationFilter(events, {
    pageSize: 12,
    searchValue: search,
    filterFn: (e, search) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()),
  });

  const selectableEvents = filteredEvents.filter(event => typeof event._id === 'string') as { _id: string }[];
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableEvents);

  const deleteEvents = async (ids: string[]) => {
    for (const id of ids) {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    }
    setEvents(prev => prev.filter(event => event._id && !ids.includes(event._id)));
    setSelectedIds([]);
    setAlert({ type: 'success', message: 'Selected events deleted.' });
  };
  const { showDeleteConfirm, setShowDeleteConfirm, deleting, handleBulkDelete } = useBulkDelete(deleteEvents, selectedIds);

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
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Input
              placeholder="Search events..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-48"
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
            <div className="p-4 w-8 flex-shrink-0 flex items-center justify-center" role="columnheader">
              {selectedIds.length > 0 && (
                <>
                  <label htmlFor="select-all-checkbox" className="sr-only">Select all</label>
                  <Checkbox
                    id="select-all-checkbox"
                    checked={allSelected}
                    onCheckedChange={toggleSelectAll}
                  />
                </>
              )}
            </div>
            {selectedIds.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Selected
              </Button>
            )}
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
            <GridSkeleton items={3} itemHeight={256} gridClassName={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4'} />
          ) : filteredEvents.length === 0 ? (
            <NoRecords title="No events scheduled" description="Add your first event to get started." />
          ) : (
            <div className={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4'}>
              {filteredEvents.map((event) => (
                <div key={event._id} className="relative group">
                  <Checkbox className="absolute top-2 left-2 z-10" checked={selectedIds.includes(event._id || '')} onCheckedChange={() => event._id && toggleSelect(event._id)} />
                  <Card className="transition-shadow shadow-md hover:shadow-xl border-0 overflow-hidden">
                    <div className="relative h-48 w-full bg-gray-100">
                      {event.imageUrl && (
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover w-full h-full"
                        />
                      )}
                      <div className="absolute top-2 right-2 flex flex-col items-end gap-2 z-20">
                        <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                          {(event.status || 'upcoming').charAt(0).toUpperCase() + (event.status || 'upcoming').slice(1)}
                        </span>
                        <span className="bg-white/80 text-xs px-2 py-0.5 rounded shadow text-gray-700">
                          {format(new Date(event.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <CardHeader className="flex flex-col gap-2 p-4 pb-2">
                      <div className="flex items-center justify-between gap-2">
                        <CardTitle className="text-lg font-bold truncate w-3/4">{event.title}</CardTitle>
                        <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-primary/10"
                            onClick={() => {
                              setEditingEvent(event)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Edit2Icon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="hover:bg-destructive/20"
                            onClick={() => event._id && handleDeleteEvent(event._id)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? <span className="text-xs">...</span> : "✕"}
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                        <span className="inline-flex items-center gap-1"><span className="font-medium">Time:</span> {event.time}</span>
                        <span className="inline-flex items-center gap-1"><span className="font-medium">Location:</span> {event.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-gray-700 line-clamp-3">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
        <ConfirmDialog
          open={showDeleteConfirm}
          title="Delete Events"
          description="Are you sure you want to delete the selected events? This action cannot be undone."
          confirmLabel={isSubmitting ? "Deleting..." : "Delete"}
          cancelLabel="Cancel"
          loading={isSubmitting}
          onConfirm={handleBulkDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </div>
    </div>
  )
} 