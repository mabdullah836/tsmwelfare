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
import { TablePagination } from "@/components/shared/TablePagination"

export default function AdminEventsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const meta = { limit: 10 }
  const debouncedSearch = useDebounce(search, 400)

  // SWR hook for events
  const { events, meta: swrMeta, isLoading, mutate } = useEvents({ page, limit: meta.limit, q: debouncedSearch });

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

      const response = await fetch(`/api/events/${editingEvent.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update event')
      }

      const updated = await response.json()
      mutate((prev: Event[] | undefined) => (prev ? prev.map((event: Event) => event.id === editingEvent.id ? updated : event) : []));

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

  const EventForm = ({ event, submitting }: { event?: Event; submitting: boolean }) => {
    const isEditing = !!event;
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
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
      const formData = new FormData();
      formData.append('title', data.title ?? '');
      formData.append('description', data.description ?? '');
      formData.append('date', data.date ?? '');
      formData.append('time', data.time ?? '');
      formData.append('location', data.location ?? '');
      if (data.image) {
        formData.append('image', data.image);
      }
      if (isEditing) handleEditEvent(formData);
      else handleAddEvent(formData);
      reset();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { id: 'title', label: 'Title', required: true },
          { id: 'description', label: 'Description', required: true, rows: 4 },
          { id: 'date', label: 'Date', required: true, type: 'date' },
          { id: 'time', label: 'Time', required: true, type: 'time' },
          { id: 'location', label: 'Location', required: true },
        ].map((field) => (
          <FormInput
            key={field.id}
            id={field.id as string}
            label={field.label as string}
            type={(field as any).type}
            register={register}
            errors={errors}
            required={field.required as boolean}
            rows={(field as any).rows}
          />
        ))}
        <FileUpload
          name="image"
          form={{ setValue, watch }}
          label={event?.imageUrl ? "Change Image" : "Image"}
          accept="image/*"
          preview
        />
        {event?.imageUrl && (
          <div className="mt-2 relative h-40 rounded overflow-hidden">
            <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
          </div>
        )}
        <Button type="submit" disabled={submitting}>
          {submitting ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Event" : "Add Event")}
        </Button>
      </form>
    );
  };

  const selectableEvents = events.filter((event : Event) => typeof event.id === 'string') as { id: string }[];
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableEvents);

  const deleteEvents = async (ids: string[]) => {
    for (const id of ids) {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    }
    mutate((prev: Event[] | undefined) => (prev ? prev.filter((event: Event) => event.id && !ids.includes(event.id)) : []));
    setSelectedIds([]);
    setAlert({ type: 'success', message: 'Selected events deleted.' });
  };
  const { showDeleteConfirm, setShowDeleteConfirm, handleBulkDelete } = useBulkDelete(deleteEvents, selectedIds);

  return (
    <div>
      <div>
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="page-title">Manage Events</h1>
            <p className="page-description">Create and update events shown on the public events page.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Input
              type="search"
              aria-label="Search events"
              placeholder="Search events..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="min-w-0 flex-1 md:w-56 md:flex-none"
            />
            <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
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
                <EventForm event={editingEvent || undefined} submitting={isSubmitting} />
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
            <div key={event.id} className="relative group">
              <Checkbox className="absolute top-2 left-2 z-10" checked={selectedIds.includes(event.id || '')} onCheckedChange={() => event.id && toggleSelect(event.id)} />
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
        {swrMeta.pages > 1 && (
          <div className="mt-6">
            <TablePagination page={page} pages={swrMeta.pages} total={swrMeta.total} onPageChange={setPage} />
          </div>
        )}
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