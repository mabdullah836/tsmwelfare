"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  TableCell, 
  TableRow 
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Eye,
  Mail,
  Phone,
  User,
  Calendar,
  Sparkles,
  ClipboardList
} from "lucide-react"
import { AlertMessage } from '@/components/ui/alert-message';
import { formatDate } from "@/lib/utils/format"
import { getVolunteers } from "@/lib/services/volunteer"
import { VolunteerFormData } from "@/lib/types/volunteer"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { AdminTable } from "@/components/shared/AdminTable";
import AdminDetailsSheet from "@/components/shared/AdminDetailsSheet";

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerFormData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerFormData | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({ 
    total: 0, 
    page: 1, 
    pages: 1, 
    limit: 10 
  })
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null)
  const debouncedSearch = useDebounce(search, 400)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSingleDeleteOpen, setSingleDeleteOpen] = useState(false);
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);
  const [singleDeleteLoading, setSingleDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  // Fetch volunteers from API
  useEffect(() => {
    setIsLoading(true)
    getVolunteers({ page, limit: meta.limit, q: debouncedSearch }).then(res => {
      setVolunteers(res.data)
      setMeta(res.meta)
      setIsLoading(false)
    }).catch(() => {
      setVolunteers([])
      setMeta({ total: 0, page: 1, pages: 1, limit: 10 })
      setIsLoading(false)
      setAlert({ type: 'error', message: 'Failed to fetch volunteers' });
    })
  }, [page, meta.limit, debouncedSearch])

  // Handle row selection
  const toggleRowSelection = (id: string) => {
    setRowSelection(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const toggleAllRowsSelection = () => {
    if (Object.keys(rowSelection).length === volunteers.length) {
      setRowSelection({})
    } else {
      const newSelection: Record<string, boolean> = {}
      volunteers.forEach(volunteer => {
        if (volunteer._id) newSelection[volunteer._id] = true
      })
      setRowSelection(newSelection)
    }
  }

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedVolunteers = [...volunteers].sort((a, b) => {
    if (!sortConfig) return 0
    
    const aValue = a[sortConfig.key as keyof VolunteerFormData]
    const bValue = b[sortConfig.key as keyof VolunteerFormData]
    
    if (aValue === undefined || bValue === undefined) return 0
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      if (newStatus === 'rejected') {
        const response = await fetch(`/api/volunteer/${id}`, { method: 'DELETE' })
        const data = await response.json()
        if (response.ok && data.success) {
          setVolunteers(prev => prev.filter(volunteer => volunteer._id !== id))
          setRowSelection(prev => {
            const newSelection = {...prev}
            delete newSelection[id]
            return newSelection
          })
          setAlert({ type: 'success', message: 'Volunteer rejected and removed successfully' });
        } else {
          throw new Error('Failed to remove volunteer')
        }
      } else {
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
          setAlert({ type: 'success', message: `Volunteer ${newStatus} successfully` });
        } else {
          throw new Error('Failed to update volunteer status')
        }
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update volunteer status' });
    }
  }

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
    setBulkDeleteLoading(true);
    try {
      await Promise.all(selectedIds.map(id => 
        fetch(`/api/volunteer/${id}`, { method: 'DELETE' })
      ));
      setVolunteers(prev => prev.filter(v => !selectedIds.includes(v._id || '')));
      setRowSelection({});
      setDeleteConfirmationOpen(false);
      setAlert({ type: 'success', message: `${selectedIds.length} volunteer(s) deleted successfully` });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete volunteers' });
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  const handleSingleDelete = async () => {
    if (!singleDeleteId) return;
    setSingleDeleteLoading(true);
    await handleStatusChange(singleDeleteId, 'rejected');
    setSingleDeleteLoading(false);
    setSingleDeleteOpen(false);
    setSingleDeleteId(null);
  };

  const columns = [
    { id: 'select', label: 'Select', accessor: 'select' },
    { id: 'name', label: 'Name', accessor: 'name', sortable: true },
    { id: 'email', label: 'Email', accessor: 'email', sortable: true },
    { id: 'status', label: 'Status', accessor: 'status', sortable: true },
    { id: 'appliedDate', label: 'Applied Date', accessor: 'createdAt', sortable: true },
    { id: 'actions', label: 'Actions', accessor: 'actions' }
  ]

  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="flex flex-col flex-1 min-h-0">
        <CardHeader>
          <CardTitle>Volunteers</CardTitle>
          <CardDescription>Manage and review volunteer applications</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0">
          {alert && (
            <AlertMessage
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}
          <div className="flex items-center justify-between pb-4">
            <Input
              placeholder="Filter by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            {Object.keys(rowSelection).filter(id => rowSelection[id]).length > 0 && (
              <Button 
                variant="destructive" 
                onClick={() => setDeleteConfirmationOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({Object.keys(rowSelection).filter(id => rowSelection[id]).length})
              </Button>
            )}
          </div>
          
          <div className="rounded-md border overflow-x-auto h-full">
            <AdminTable
              columns={[
                {
                  key: "select",
                  label: (
                    <Checkbox
                      checked={Object.keys(rowSelection).length === volunteers.length && volunteers.length > 0}
                      onCheckedChange={toggleAllRowsSelection}
                      aria-label="Select all"
                      className="translate-y-[2px]"
                    />
                  ),
                  className: "w-12",
                },
                { key: "name", label: "Name", className: "min-w-[160px]" },
                { key: "email", label: "Email", className: "min-w-[180px]" },
                { key: "availability", label: "Availability", className: "min-w-[120px]" },
                { key: "status", label: "Status", className: "w-32 text-center" },
                { key: "appliedDate", label: "Applied Date", className: "w-40" },
                { key: "actions", label: "Actions", className: "w-16 text-center" },
              ]}
              data={sortedVolunteers}
              loading={isLoading}
              emptyState={{
                title: search ? "No volunteers match your search" : "No volunteers found",
              }}
              renderRow={(volunteer) => (
                <TableRow key={volunteer._id}>
                  <TableCell>
                    <Checkbox
                      checked={!!rowSelection[volunteer._id || '']}
                      onCheckedChange={() => toggleRowSelection(volunteer._id || '')}
                      aria-label="Select row"
                      className="translate-y-[2px]"
                    />
                  </TableCell>
                  <TableCell className="font-medium truncate">
                    {volunteer.firstName} {volunteer.lastName}
                  </TableCell>
                  <TableCell className="truncate">
                    {volunteer.email}
                  </TableCell>
                  <TableCell className="truncate">
                    {volunteer.availability || 'N/A'}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    <Badge 
                      variant={
                        volunteer.status === 'approved' 
                          ? 'secondary' 
                          : volunteer.status === 'rejected' 
                          ? 'destructive' 
                          : 'outline'
                      } 
                      className="capitalize"
                    >
                      {volunteer.status || 'pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-40">
                    {volunteer.createdAt ? formatDate(volunteer.createdAt) : 'N/A'}
                  </TableCell>
                  <TableCell className="w-16 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedVolunteer(volunteer)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(volunteer._id || '', 'approved')}
                          className={volunteer.status === 'approved' ? 'opacity-50 pointer-events-none' : ''}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSingleDeleteId(volunteer._id || '');
                            setSingleDeleteOpen(true);
                          }}
                          className={volunteer.status === 'rejected' ? 'opacity-50 pointer-events-none' : ''}
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )}
              handleSort={sortConfig ? requestSort : undefined}
              sortBy={sortConfig?.key}
              sortOrder={sortConfig?.direction}
            />
          </div>
          
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {Object.keys(rowSelection).filter(id => rowSelection[id]).length} of {volunteers.length} row(s) selected.
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(meta.pages, p + 1))}
              disabled={page >= meta.pages}
            >
              Next
            </Button>
          </div>

          <AdminDetailsSheet
            open={!!selectedVolunteer}
            onOpenChange={(open) => !open && setSelectedVolunteer(null)}
            title={
              <>
                <User /> {selectedVolunteer?.firstName} {selectedVolunteer?.lastName}
              </>
            }
            statusBadge={selectedVolunteer && (
              <Badge
                variant={
                  selectedVolunteer.status === 'approved'
                    ? 'secondary'
                    : selectedVolunteer.status === 'rejected'
                    ? 'destructive'
                    : 'outline'
                }
                className="capitalize"
              >
                {selectedVolunteer.status || 'pending'}
              </Badge>
            )}
            description={selectedVolunteer ? 'application details.' : undefined}
          >
            {selectedVolunteer && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-muted-foreground" />Contact Information
                  </h3>
                  <p className="text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> {selectedVolunteer.email}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" /> {selectedVolunteer.phone || 'N/A'}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Applied on {selectedVolunteer.createdAt ? formatDate(selectedVolunteer.createdAt) : 'N/A'}
                  </p>
                </div>
                {selectedVolunteer.skills && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-muted-foreground" />Skills
                    </h3>
                    <p className="text-sm">{selectedVolunteer.skills}</p>
                  </div>
                )}
                {selectedVolunteer.availability && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />Availability
                    </h3>
                    <p className="text-sm">{selectedVolunteer.availability}</p>
                  </div>
                )}
                {selectedVolunteer.motivation && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />Reason for Volunteering
                    </h3>
                    <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md border">
                      {selectedVolunteer.motivation}
                    </p>
                  </div>
                )}
              </div>
            )}
          </AdminDetailsSheet>

          <ConfirmDeleteModal
            open={isDeleteConfirmationOpen}
            title="Delete Volunteers"
            description="Are you sure you want to delete the selected volunteer applications? This action cannot be undone."
            loading={bulkDeleteLoading}
            onConfirm={handleDeleteSelected}
            onCancel={() => setDeleteConfirmationOpen(false)}
          />
          <ConfirmDeleteModal
            open={isSingleDeleteOpen}
            title="Reject Volunteer?"
            description="Are you sure you want to reject and remove this volunteer? This action cannot be undone."
            loading={singleDeleteLoading}
            onConfirm={handleSingleDelete}
            onCancel={() => {
              setSingleDeleteOpen(false);
              setSingleDeleteId(null);
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}