"use client"

import { useState } from "react"
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
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { GridIcon, ListIcon } from "lucide-react"
import { format } from "date-fns"
import { AlertMessage } from "@/components/ui/alert-message"
import { Checkbox } from "@/components/ui/checkbox"
import { ConfirmDialog } from '@/components/modals/ConfirmDialog'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { uploadMedia } from '@/lib/services/media'
import { Event } from "@/lib/types/event"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { useForm } from 'react-hook-form';
import { FileUpload } from '@/components/ui/file-upload';
import { FormInput } from '@/components/ui/form-input';
import { useEvents } from '@/lib/hooks/useEvents';

import { AdminGrid } from "@/components/shared/AdminGrid"

export default function AdminEventsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<{ total: number; page: number; pages: number; limit: number }>({ total: 0, page: 1, pages: 1, limit: 10 })
  const debouncedSearch = useDebounce(search, 400)

  // SWR hook for events
  const { events, meta: swrMeta, isLoading, isError, mutate } = useEvents({ page, limit: meta.limit, q: debouncedSearch });

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
      mutate((prev: Event[] | undefined) => (prev ? prev.map((event: Event) => event._id === editingEvent._id ? updated : event) : []));

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
      mutate((prev: Event[] | undefined) => (prev ? [...prev, createdEvent] : [createdEvent]));

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

  const EventForm = ({ event }: { event?: Event }) => {
    const isEditing = !!event;
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, reset, control } = useForm({
      defaultValues: {
        title: event?.title || '',
        description: event?.description || '',
        date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event?.time || '',
        location: event?.location || '',
        image: null,
      },
    });

    const onSubmit = (data: any) => {
      if (isEditing) handleEditEvent(data);
      else handleAddEvent(data);
      reset();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="title"
          label="Title"
          register={register}
          errors={errors}
          required
        />
        <FormInput
          id="description"
          label="Description"
          register={register}
          errors={errors}
          required
          rows={4}
        />
        <FormInput
          id="date"
          label="Date"
          type="date"
          register={register}
          errors={errors}
          required
        />
        <FormInput
          id="time"
          label="Time"
          type="time"
          register={register}
          errors={errors}
          required
        />
        <FormInput
          id="location"
          label="Location"
          register={register}
          errors={errors}
          required
        />
        <FileUpload
          name="image"
          control={control}
          label={event?.imageUrl ? "Change Image" : "Image"}
          accept="image/*"
          preview
        />
        {event?.imageUrl && (
          <div className="mt-2 relative h-40 rounded overflow-hidden">
            <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
          </div>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Event" : "Add Event")}
        </Button>
      </form>
    );
  };

  const selectableEvents = events.filter((event : Event) => typeof event._id === 'string') as { _id: string }[];
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableEvents);

  const deleteEvents = async (ids: string[]) => {
    for (const id of ids) {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    }
    mutate((prev: Event[] | undefined) => (prev ? prev.filter((event: Event) => event._id && !ids.includes(event._id)) : []));
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
              {selectedIds.length > 0 && (
                <>
                 <div className="p-2 flex-shrink-0  bg-muted/50 rounded flex items-center justify-center" role="columnheader">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all-checkbox"
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
                    />
                    <label htmlFor="select-all-checkbox" className="cursor-pointer">Select all</label>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Delete Selected
                </Button>
              </>
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
        <AdminGrid
          items={events}
          loading={isLoading}
          emptyState={{ title: "No events scheduled", description: "Add your first event to get started." }}
          skeletonItems={meta.limit}
          gridClassName={viewMode === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4'}
          renderItem={(event: Event) => (
            <div key={event._id} className="relative group">
              <Checkbox className="absolute top-2 left-2 z-10" checked={selectedIds.includes(event._id || '')} onCheckedChange={() => event._id && toggleSelect(event._id)} />
              <Card className="transition-shadow shadow-md hover:shadow-xl border-0 overflow-hidden">
                <div className="relative h-48 w-full bg-muted">
                  {event.imageUrl && (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover w-full h-full"
                    />
                  )}
                  <div className="absolute top-2 right-2 flex flex-col items-end gap-2 z-20">
                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow">
                      {(event.status || 'upcoming').charAt(0).toUpperCase() + (event.status || 'upcoming').slice(1)}
                    </span>
                    <span className="bg-background/80 text-foreground text-xs px-2 py-0.5 rounded shadow">
                      {format(new Date(event.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
                <CardContent>
                  <h3 className="font-bold mb-1">{event.title}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{event.type}</p>
                  <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                </CardContent>
              </Card>
            </div>
          )}
        />
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