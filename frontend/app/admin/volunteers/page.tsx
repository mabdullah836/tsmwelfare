"use client"
import { useState } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { VolunteerFormData } from "@/lib/types/volunteer"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { AdminTable } from "@/components/shared/AdminTable";
import AdminDetailsSheet from "@/components/shared/AdminDetailsSheet";
import { useVolunteers } from '@/lib/hooks/useVolunteers';
import { useSelection } from '@/lib/hooks/use-selection';
import { changeResourceStatus } from '@/lib/utils/changeResourceStatus';
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TablePagination } from '@/components/shared/TablePagination';
import { SearchInput } from '@/components/shared/SearchInput';

export default function VolunteersPage() {
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerFormData | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null)
  const debouncedSearch = useDebounce(search, 400)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const { volunteers, meta, isLoading, mutate } = useVolunteers({ page, limit: 10, q: debouncedSearch });

  const selectableVolunteers = volunteers.filter((volunteer: VolunteerFormData) => typeof volunteer.id === 'string') as { id: string }[];
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableVolunteers);
  const { showDeleteConfirm, setShowDeleteConfirm, deleting, handleBulkDelete } = useBulkDelete(deleteVolunteers, selectedIds);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedVolunteers = [...volunteers].sort((a: VolunteerFormData, b: VolunteerFormData) => {
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

  // Add this function for bulk deletion
  async function deleteVolunteers(ids: string[]) {
    const response = await fetch('/api/volunteer', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    const data = await response.json();
    if (response.ok && data.success) {
      setSelectedIds([]);
      setAlert({ type: 'success', message: `${ids.length} volunteer(s) deleted successfully` });
      mutate();
    } else {
      setAlert({ type: 'error', message: data.message || 'Failed to delete volunteers' });
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    const result = await changeResourceStatus({ resource: 'volunteer', id, newStatus, statusMap: { approve: 'approved', reject: 'rejected' } });
    if (result.success) {
      mutate();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="flex flex-col flex-1 min-h-0 shadow-none">
        <CardHeader className="p-4 sm:p-6">
          <h1 className="text-xl font-semibold tracking-tight">Volunteers</h1>
          <CardDescription>Manage and review volunteer applications</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col min-h-0 p-4 pt-0 sm:p-6 sm:pt-0">
          {alert && (
            <AlertMessage
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}
          <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput
              label="Search volunteers by name, email, phone or city"
              placeholder="Search volunteers…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            {selectedIds.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedIds.length})
              </Button>
            )}
          </div>
          
          <div className="rounded-lg border overflow-hidden">
            <AdminTable
              columns={[
                {
                  key: "select",
                  label: (
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
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
              renderRow={(volunteer: VolunteerFormData) => (
                <TableRow key={volunteer.id}>
                  <TableCell>
                    <Checkbox
                      checked={!!volunteer.id && selectedIds.includes(volunteer.id)}
                      onCheckedChange={() => volunteer.id && toggleSelect(volunteer.id)}
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
                    <StatusBadge status={volunteer.status} />
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
                          onClick={() => handleStatusChange(volunteer.id || '', 'approved')}
                          className={volunteer.status === 'approved' ? 'opacity-50 pointer-events-none' : ''}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(volunteer.id || '', 'rejected')}
                          className={volunteer.status === 'rejected' ? 'opacity-50 pointer-events-none' : ''}
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )}
              handleSort={requestSort}
              sortBy={sortConfig?.key}
              sortOrder={sortConfig?.direction}
            />
          </div>
          
          <TablePagination
            page={page}
            pages={meta.pages}
            selectedCount={selectedIds.length}
            pageCount={volunteers.length}
            onPageChange={setPage}
          />

          <AdminDetailsSheet
            open={!!selectedVolunteer}
            onOpenChange={(open) => !open && setSelectedVolunteer(null)}
            title={
              <>
                <User /> {selectedVolunteer?.firstName} {selectedVolunteer?.lastName}
              </>
            }
            statusBadge={selectedVolunteer && (
              <StatusBadge status={selectedVolunteer.status} />
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
            open={showDeleteConfirm}
            title="Delete Volunteers"
            description="Are you sure you want to delete the selected volunteer applications? This action cannot be undone."
            loading={deleting}
            onConfirm={handleBulkDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        </CardContent>
      </Card>
    </div>
  )
}