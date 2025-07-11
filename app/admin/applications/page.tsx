"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertMessage } from "@/components/ui/alert-message"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils/format"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { Checkbox } from "@/components/ui/checkbox"
import { updateApplicationStatus } from '@/lib/services/application'
import type { Application } from '@/lib/types/application'
import { ConfirmDialog } from '@/components/modals/ConfirmDialog'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { usePaginationFilter } from '@/lib/hooks/use-pagination-filter'
import { AdminTable } from "@/components/shared/AdminTable"
import { getApplications } from "@/lib/services/application"
import { useDebounce } from '@/lib/hooks/use-debounce'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<{ total: number; page: number; pages: number; limit: number }>({ total: 0, page: 1, pages: 1, limit: 10 })
  const debouncedSearch = useDebounce(search, 400)

  // Selection hook
  const { selectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(applications.filter((app): app is Application & { _id: string } => typeof app._id === 'string'))

  // Pagination and filtering
  const {
    pageSize: limit,
    setPage: setPageSize,
    totalPages: totalPages,
    paginated: paginatedApplications
  } = usePaginationFilter(applications, {
    pageSize: 10,
    searchValue: search,
    filterFn: (item, search) => {
      const s = search.toLowerCase()
      return (
        item.name.toLowerCase().includes(s) ||
        item.email.toLowerCase().includes(s) ||
        item.type.toLowerCase().includes(s)
      )
    },
    extraFilters: { status: statusFilter },
    extraFilterFn: (item, filters) => {
      if (!filters || !filters.status || filters.status === 'all') return true
      return item.status === filters.status
    }
  })

  // Delete function for API
  const deleteApplications = useCallback(async (ids: string[]) => {
    await fetch("/api/applications", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids })
    })
    // Refresh applications after delete
    setApplications(apps => apps.filter(app => !ids.includes(app._id!)))
    setAlert({ message: "Applications deleted successfully", type: "success" })
  }, [])

  // Bulk delete hook
  const {
    showDeleteConfirm,
    setShowDeleteConfirm,
    deleting,
    handleBulkDelete
  } = useBulkDelete(deleteApplications, selectedIds)

  // Fetch applications from API
  useEffect(() => {
    setLoading(true)
    getApplications({ page, limit: meta.limit, q: debouncedSearch }).then(res => {
      setApplications(res.data)
      setMeta(res.meta)
      setLoading(false)
      setAlert(null)
    }).catch(() => {
      setApplications([])
      setMeta({ total: 0, page: 1, pages: 1, limit: 10 })
      setLoading(false)
      setAlert({ message: 'Failed to fetch applications', type: 'error' })
    })
  }, [page, meta.limit, debouncedSearch])
  

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
    { key: "type", label: "Type", className: "flex-[2]" },
    { key: "contact", label: "Contact", className: "flex-[3]" },
    { key: "appliedOn", label: "Applied On", className: "flex-[2]" },
    { key: "status", label: "Status", className: "flex-[1]" },
    { key: "actions", label: "Actions", className: "flex-[1]" },
  ];

  return (
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
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            Manage and review assistance applications
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
                placeholder="Search by name, email, or type..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full md:w-72"
              />
              {/* Status filter can be added to API if needed */}
            </div>
          </div>
          <AdminTable
            columns={columns}
            data={applications}
            loading={loading}
            emptyState={{
              title: "No applications found",
              description: search ? 'Try adjusting your search terms' : 'No applications available yet.'
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
            renderRow={(application) => {
              const isSelected = application._id ? selectedIds.includes(application._id) : false;
              return (
                <div key={application._id} className="flex items-center border-b" role="row">
                  <div className="p-4 w-8 flex-shrink-0 flex items-center justify-center" role="cell">
                    <Checkbox checked={isSelected} onCheckedChange={() => application._id && toggleSelect(application._id)} />
                  </div>
                  <div className="p-4 flex-[2] whitespace-nowrap" role="cell">{application.name}</div>
                  <div className="p-4 flex-[2] whitespace-nowrap capitalize" role="cell">{application.type.replace("_", " ")}</div>
                  <div className="p-4 flex-[3]" role="cell">
                    <div className="space-y-1">
                      <div>{application.email}</div>
                      <div>{application.phone}</div>
                    </div>
                  </div>
                  <div className="p-4 flex-[2]" role="cell">{formatDate(application.createdAt || '')}</div>
                  <div className="p-4 flex-[1]" role="cell">
                    <Badge className={getStatusBadgeColor(application.status)}>{application.status}</Badge>
                  </div>
                  <div className="p-4 flex-[1]" role="cell">
                    <Button size="sm" onClick={() => { setSelectedApplication(application); setShowDetails(true); }}>
                      View
                    </Button>
                  </div>
                </div>
              );
            }}
          />
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-2 mt-4">
              <div><b>Name:</b> {selectedApplication.name}</div>
              <div><b>Email:</b> {selectedApplication.email}</div>
              <div><b>Phone:</b> {selectedApplication.phone}</div>
              <div><b>Status:</b> {selectedApplication.status}</div>
              <div><b>Type:</b> {selectedApplication.type.replace("_", " ")}</div>
              <div><b>Applied On:</b> {formatDate(selectedApplication.createdAt || '')}</div>
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm">{selectedApplication.description}</p>
                </div>
                {selectedApplication.documents.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Documents</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedApplication.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(doc, "_blank")}
                          >
                            View Document {index + 1}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete Applications"
        description="Are you sure you want to delete the selected applications? This action cannot be undone."
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={handleBulkDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  )
}