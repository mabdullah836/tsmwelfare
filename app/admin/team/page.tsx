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
import { AdminGrid } from "@/components/shared/AdminGrid"
import { TablePagination } from "@/components/shared/TablePagination"
import Image from "next/image"
import { Draggable, DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { Edit2Icon, GridIcon, ListIcon } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { useTeam } from '@/lib/hooks/useTeam';
import { uploadMedia } from '@/lib/services/media';
import { TeamMember } from "@/lib/types/team"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { useForm } from 'react-hook-form';
import { FileUpload } from '@/components/ui/file-upload';
import { FormInput } from '@/components/ui/form-input';

export default function AdminTeamPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const meta = { limit: 10 }
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search, 400)

  // SWR hook for team
  const { team, meta: swrMeta, isLoading, mutate } = useTeam({ page, limit: meta.limit, q: debouncedSearch });

  const handleDragEnd = async (result: DropResult) => {
    if (!result?.destination) return

    const items: TeamMember[] = Array.from(team as TeamMember[])
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedItems = items.map((item: TeamMember, index: number) => ({
      ...item,
      order: index + 1,
    }))

    // Optimistically update UI
    mutate()

    try {
      const updates = updatedItems
        .filter((item: TeamMember) => item._id)
        .map((item: TeamMember) => ({
          id: item._id!,
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
      mutate()
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to update team member order",
        type: "error"
      })
    }
  }

  const handleEditMember = async (formData: FormData) => {
    if (!editingMember) return
    
    setIsSubmitting(true)
    try {
      const imageFile = formData.get('image') as File
      let imageUrl = editingMember.imageUrl

      if (imageFile?.size > 0) {
        const uploaded = await uploadMedia([imageFile], 'team-members')
        imageUrl = uploaded[0]?.url
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
      setAlert({
        message: `Successfully updated ${updated.name}'s profile`,
        type: "success"
      })

      setIsDialogOpen(false)
      setEditingMember(null)
      mutate()
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
        const uploaded = await uploadMedia([imageFile], 'team-members')
        imageUrl = uploaded[0]?.url
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
      setAlert({
        message: `Successfully added ${createdMember.name} to the team`,
        type: "success"
      })

      setIsDialogOpen(false)
      mutate()
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to add team member",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const TeamMemberForm = ({ member, submitting }: { member?: TeamMember; submitting: boolean }) => {
    const isEditing = !!member;
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm({
      defaultValues: {
        name: member?.name || '',
        role: member?.role || '',
        bio: member?.bio || '',
        image: null,
      },
    });

    const onSubmit = (data: any) => {
      const formData = new FormData();
      formData.append('name', data.name ?? '');
      formData.append('role', data.role ?? '');
      formData.append('bio', data.bio ?? '');
      if (data.image) {
        formData.append('image', data.image);
      }
      if (isEditing) handleEditMember(formData);
      else handleAddMember(formData);
      reset();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          { id: 'name', label: 'Name', required: true, placeholder: 'Enter name' },
          { id: 'role', label: 'Role', required: true, placeholder: 'Enter role' },
          { id: 'bio', label: 'Bio', required: true, rows: 4, placeholder: 'Enter bio' },
        ].map((field) => (
          <FormInput
            key={field.id}
            id={field.id as string}
            label={field.label as string}
            register={register}
            errors={errors}
            required={field.required as boolean}
            rows={(field as any).rows}
            placeholder={(field as any).placeholder}
          />
        ))}
        <FileUpload
          name="image"
          form={{ setValue, watch }}
          label={member?.imageUrl ? "Change Image" : "Image"}
          accept="image/*"
          preview
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Member" : "Add Member")}
        </Button>
      </form>
    );
  };

  const uniqueRoles = ["all", ...Array.from(new Set((team as TeamMember[]).map((m: TeamMember) => m.role)))]

  const selectableTeam = (team as TeamMember[]).filter((member: TeamMember) => typeof member._id === 'string') as { _id: string }[];
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableTeam);

  const deleteTeamMembers = async (ids: string[]) => {
    for (const id of ids) {
      await fetch(`/api/team/${id}`, { method: 'DELETE' });
    }
    setSelectedIds([]);
    setAlert({ type: 'success', message: 'Selected team members deleted.' });
    mutate()
  };
  const { showDeleteConfirm, setShowDeleteConfirm, handleBulkDelete } = useBulkDelete(deleteTeamMembers, selectedIds);

  return (
    <div>
      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="page-title">Manage Team Members</h1>
            <p className="page-description">Add, edit and reorder the team members shown on the website.</p>
          </div>
          <div className="flex items-center gap-3">
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
                <TeamMemberForm member={editingMember || undefined} submitting={isSubmitting} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex items-center gap-2 flex-1 flex-wrap">
            <span className="font-medium">Filter by role:</span>
            <Input
              type="search"
              aria-label="Search team members by name or role"
              placeholder="Search by name or role..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="w-full md:w-72"
            />
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {uniqueRoles.map(role => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex bg-muted/50  rounded" role="rowgroup">
                <div className="p-2 w-auto flex-shrink-0 flex items-center justify-center" role="columnheader">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all-checkbox"
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
                    />
                    <label htmlFor="select-all-checkbox" className="cursor-pointer">Select all</label>
                  </div>
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
              >
                {selectedIds.length === 1 ? 'Delete' : 'Delete All'}
              </Button>
            </div>
          )}
        </div>
        <AdminGrid
          items={team}
          loading={isLoading}
          emptyState={{ title: "No team members yet", description: "Add your first team member to get started." }}
          skeletonItems={meta.limit}
          gridClassName={viewMode === 'grid' ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col gap-4"}
          renderItem={(member: TeamMember, idx: number) => (
            <div key={member._id || idx} className="relative">
              <Checkbox className="absolute top-2 left-2 z-10" checked={selectedIds.includes(member._id || '')} onCheckedChange={() => member._id && toggleSelect(member._id)} />
              <Card>
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
                  
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm line-clamp-3">{member.bio}</p>
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
      </div>
      {alert && (
        <AlertMessage
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <ConfirmDeleteModal
        open={showDeleteConfirm}
        title="Delete Team Members"
        description="Are you sure you want to delete the selected team members? This action cannot be undone."
        loading={isSubmitting}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleBulkDelete}
      />
    </div>
  )
} 