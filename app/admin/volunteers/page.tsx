"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertMessage } from "@/components/ui/alert-message"
import { formatDate } from "@/lib/utils/format"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NoRecords } from '@/components/ui/no-records'
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { ConfirmDialog } from '@/components/modals/ConfirmDialog'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { usePaginationFilter } from '@/lib/hooks/use-pagination-filter'
import { TableSkeleton } from "@/components/shared/skeletons/TableSkeleton";
import { AdminTable } from "@/components/shared/AdminTable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { getVolunteers } from "@/lib/services/volunteer"
import { VolunteerFormData } from "@/lib/types/volunteer"
import { useDebounce } from '@/lib/hooks/use-debounce'

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerFormData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerFormData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<{ total: number; page: number; pages: number; limit: number }>({ total: 0, page: 1, pages: 1, limit: 10 })
  const debouncedSearch = useDebounce(search, 400)
  const [statusFilter, setStatusFilter] = useState("all")

  // Fetch volunteers from API
  useEffect(() => {
    setIsLoading(true)
    getVolunteers({ page, limit: meta.limit, q: debouncedSearch }).then(res => {
      setVolunteers(res.data)
      setMeta(res.meta)
      setIsLoading(false)
      setAlert(null)
    }).catch(() => {
      setVolunteers([])
      setMeta({ total: 0, page: 1, pages: 1, limit: 10 })
      setIsLoading(false)
      setAlert({ type: 'error', message: 'Failed to fetch volunteers' })
    })
  }, [page, meta.limit, debouncedSearch])
  

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      if (newStatus === 'rejected') {
        // Delete volunteer if rejected
        const response = await fetch(`/api/volunteer/${id}`, { method: 'DELETE' })
        const data = await response.json()
        if (response.ok && data.success) {
          setVolunteers(prev => prev.filter(volunteer => volunteer._id !== id))
          setAlert({
            type: 'success',
            message: 'Volunteer rejected and removed successfully'
          })
        } else {
          throw new Error('Failed to remove volunteer')
        }
      } else {
        // Approve volunteer
        const response = await fetch(`/api/volunteer/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        })
        const data = await response.json()
        if (response.ok && data.success) {
          setVolunteers(prev =>
            prev.map(volunteer =>
              volunteer._id === id
                ? { ...volunteer, status: newStatus }
                : volunteer
            )
          )
          setAlert({
            type: 'success',
            message: `Volunteer ${newStatus} successfully`
          })
        } else {
          throw new Error('Failed to update volunteer status')
        }
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to update volunteer status'
      })
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500'
      case 'rejected':
        return 'bg-red-500'
      default:
        return 'bg-yellow-500'
    }
  }

  const openModal = (volunteer: VolunteerFormData) => {
    setSelectedVolunteer(volunteer)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVolunteer(null)
  }

  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(
    volunteers.filter(v => v._id) as { _id: string }[]
  );

  const deleteVolunteers = async (ids: string[]) => {
    for (const id of ids) {
      await fetch(`/api/volunteer/${id}`, { method: 'DELETE' });
    }
    setVolunteers(prev => prev.filter(v => !ids.includes(v._id || '')));
    setSelectedIds([]);
    setAlert({ type: 'success', message: 'Selected volunteers deleted.' });
  };
  const { showDeleteConfirm, setShowDeleteConfirm, deleting, handleBulkDelete } = useBulkDelete(deleteVolunteers, selectedIds);

  const columns = [
    { key: "select", label: selectedIds.length > 0 ? (
      <>
        <label htmlFor="select-all-checkbox" className="sr-only">Select all</label>
        <Checkbox
          id="select-all-checkbox"
          checked={allSelected}
          onCheckedChange={toggleSelectAll}
        />
      </>
    ) : null, className: "w-8 flex-shrink-0 flex items-center justify-center" },
    { key: "name", label: "Name", className: "flex-[2]" },
    { key: "email", label: "Email", className: "flex-[2]" },
    { key: "phone", label: "Phone", className: "flex-[2]" },
    { key: "status", label: "Status", className: "flex-[1]" },
    { key: "appliedOn", label: "Applied On", className: "flex-[2]" },
    { key: "actions", label: "Actions", className: "flex-[1]" },
  ];

  const renderVolunteerRow = (v: VolunteerFormData) => {
    const isSelected = selectedIds.includes(v._id || '');
    return (
      <div key={v._id} className="flex items-center border-b" role="row">
        <div className="p-4 w-8 flex-shrink-0 flex items-center justify-center" role="cell">
          <Checkbox checked={isSelected} onCheckedChange={() => toggleSelect(v._id || '')} />
        </div>
        <div className="p-4 flex-[2] whitespace-nowrap" role="cell">{v.firstName} {v.lastName}</div>
        <div className="p-4 flex-[2] whitespace-nowrap" role="cell">{v.email}</div>
        <div className="p-4 flex-[2] whitespace-nowrap" role="cell">{v.phone}</div>
        <div className="p-4 flex-[1]" role="cell">
          <Badge className={getStatusBadgeColor(v.status || 'pending')}>{v.status || 'pending'}</Badge>
        </div>
        <div className="p-4 flex-[2]" role="cell">{v.createdAt ? formatDate(v.createdAt) : 'N/A'}</div>
        <div className="p-4 flex-[1]" role="cell">
          <Button size="sm" onClick={() => openModal(v)}>View</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="container py-10">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Volunteers</CardTitle>
              <CardDescription>
                Manage and review volunteer applications
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  {`Delete Selected ${selectedIds.length}`}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center gap-2 flex-1 flex-wrap">
                <Input
                  placeholder="Search volunteers..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full md:w-72"
                />
              </div>
            </div>
            <AdminTable
              columns={columns}
              data={volunteers}
              loading={isLoading}
              emptyState={{
                title: "No volunteers found",
                description: search ? 'Try adjusting your search terms' : 'No volunteer applications available yet.'
              }}
              pagination={meta.pages > 1 && (
                <Pagination className="mt-8 flex justify-center">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} isActive={page > 1} />
                    </PaginationItem>
                    {[...Array(meta.pages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(p => Math.min(meta.pages, p + 1))} isActive={page < meta.pages} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
              renderRow={renderVolunteerRow}
            />
          </CardContent>
        </Card>
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Volunteer Details</DialogTitle>
            </DialogHeader>
            {selectedVolunteer && (
              <div className="space-y-2 mt-4">
                <div><b>Name:</b> {selectedVolunteer.firstName} {selectedVolunteer.lastName}</div>
                <div><b>Email:</b> {selectedVolunteer.email}</div>
                <div><b>Phone:</b> {selectedVolunteer.phone}</div>
                <div><b>Status:</b> {selectedVolunteer.status}</div>
                <div><b>Applied On:</b> {selectedVolunteer.createdAt ? formatDate(selectedVolunteer.createdAt) : 'N/A'}</div>
                {selectedVolunteer.address && <div><b>Address:</b> {selectedVolunteer.address}</div>}
                {selectedVolunteer.city && <div><b>City:</b> {selectedVolunteer.city}</div>}
                {selectedVolunteer.occupation && <div><b>Occupation:</b> {selectedVolunteer.occupation}</div>}
                {selectedVolunteer.availability && <div><b>Availability:</b> {selectedVolunteer.availability}</div>}
                {selectedVolunteer.interests && <div><b>Interests:</b> {Array.isArray(selectedVolunteer.interests) ? selectedVolunteer.interests.join(", ") : selectedVolunteer.interests}</div>}
                {selectedVolunteer.skills && <div><b>Skills:</b> {selectedVolunteer.skills}</div>}
                {selectedVolunteer.experience && <div><b>Experience:</b> {selectedVolunteer.experience}</div>}
                {selectedVolunteer.motivation && <div><b>Motivation:</b> {selectedVolunteer.motivation}</div>}
                {selectedVolunteer.references && <div><b>References:</b> {selectedVolunteer.references}</div>}
              </div>
            )}
          </DialogContent>
        </Dialog>
        <ConfirmDialog
          open={showDeleteConfirm}
          title="Delete Volunteers"
          description="Are you sure you want to delete the selected volunteers? This action cannot be undone."
          confirmLabel={deleting ? "Deleting..." : "Delete"}
          cancelLabel="Cancel"
          loading={deleting}
          onConfirm={handleBulkDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      </div>
    </div>
  )
} 