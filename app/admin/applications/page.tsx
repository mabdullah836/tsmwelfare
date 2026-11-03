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
  FileText,
  File
} from "lucide-react"
import { AlertMessage } from '@/components/ui/alert-message';
import { formatDate } from "@/lib/utils/format"
import { Application } from "@/lib/types/application"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { AdminTable } from "@/components/shared/AdminTable";
import AdminDetailsSheet from "@/components/shared/AdminDetailsSheet";
import { useApplications } from '@/lib/hooks/useApplications';
import { useSelection } from '@/lib/hooks/use-selection';
import { changeResourceStatus } from '@/lib/utils/changeResourceStatus';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TablePagination } from '@/components/shared/TablePagination';
import { SearchInput } from '@/components/shared/SearchInput';

export default function ApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null)
  const debouncedSearch = useDebounce(search, 400)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const { applications, meta, isLoading, mutate } = useApplications({ page, limit: 10, q: debouncedSearch });

  const selectableApplications = applications.filter((application: Application) => typeof application._id === 'string') as { _id: string }[];
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableApplications);

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedApplications = [...applications].sort((a: Application, b: Application) => {
    if (!sortConfig) return 0
    const aValue = a[sortConfig.key as keyof Application]
    const bValue = b[sortConfig.key as keyof Application]
    if (aValue === undefined || bValue === undefined) return 0
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1
    }
    return 0
  })

  const handleDeleteSelected = async () => {
    setBulkDeleteLoading(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      });
      if (!response.ok) throw new Error('Failed to delete applications');
      mutate(); // Re-fetch applications after bulk deletion
      setSelectedIds([]); // Deselect all rows
      setIsDeleteConfirmationOpen(false);
      setAlert({ type: 'success', message: `${selectedIds.length} application(s) deleted successfully` });
    } catch {
      setAlert({ type: 'error', message: 'Failed to delete applications' });
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    const result = await changeResourceStatus({ resource: 'application', id, newStatus, statusMap: { approve: 'approved', reject: 'rejected' } });
    if (result.success) {
      mutate();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="flex flex-col flex-1 min-h-0 shadow-none">
        <CardHeader className="p-4 sm:p-6">
          <h1 className="text-xl font-semibold tracking-tight">Applications</h1>
          <CardDescription>Manage and review assistance applications</CardDescription>
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
              label="Search applications by name, email or type"
              placeholder="Search applications…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            {selectedIds.length > 0 && (
              <Button 
                variant="destructive" 
                onClick={() => setIsDeleteConfirmationOpen(true)}
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
                { key: "type", label: "Type", className: "min-w-[120px]" },
                { key: "email", label: "Email", className: "min-w-[180px]" },
                { key: "status", label: "Status", className: "w-32 text-center" },
                { key: "appliedDate", label: "Applied Date", className: "w-40" },
                { key: "actions", label: "Actions", className: "w-16 text-center" },
              ]}
              data={sortedApplications}
              loading={isLoading}
              emptyState={{
                title: search ? "No applications match your search" : "No applications found",
              }}
              renderRow={(application: Application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(application._id || '')}
                      onCheckedChange={() => toggleSelect(application._id || '')}
                      aria-label="Select row"
                      className="translate-y-[2px]"
                    />
                  </TableCell>
                  <TableCell className="font-medium truncate">
                    {application.name}
                  </TableCell>
                  <TableCell className="truncate">
                    {application.type.replace("_", " ")}
                  </TableCell>
                  <TableCell className="truncate">
                    {application.email}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    <StatusBadge status={application.status} />
                  </TableCell>
                  <TableCell className="w-40">
                    {application.createdAt ? formatDate(application.createdAt) : 'N/A'}
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
                        <DropdownMenuItem onClick={() => setSelectedApplication(application)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(application._id || '', 'approved')}
                          className={application.status === 'approved' ? 'opacity-50 pointer-events-none' : ''}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(application._id || '', 'rejected')}
                          className={application.status === 'rejected' ? 'opacity-50 pointer-events-none' : ''}
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
            pageCount={applications.length}
            onPageChange={setPage}
          />

          <AdminDetailsSheet
            open={!!selectedApplication}
            onOpenChange={(open) => !open && setSelectedApplication(null)}
            title={
              <>
                <User /> {selectedApplication?.name}
              </>
            }
            statusBadge={selectedApplication && (
              <StatusBadge status={selectedApplication.status} />
            )}
            description={selectedApplication ? 'application details.' : undefined}
          >
            {selectedApplication && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />Contact Information
                  </h3>
                  <p className="text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> {selectedApplication.email}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" /> {selectedApplication.phone || 'N/A'}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Applied on {selectedApplication.createdAt ? formatDate(selectedApplication.createdAt) : 'N/A'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />Type
                  </h3>
                  <p className="text-sm">{selectedApplication.type.replace("_", " ")}</p>
                </div>
                {selectedApplication.description && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />Description
                    </h3>
                    <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-md border">
                      {selectedApplication.description}
                    </p>
                  </div>
                )}
                {selectedApplication.documents && selectedApplication.documents.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <File className="w-4 h-4 text-muted-foreground" />Documents
                    </h3>
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
          </AdminDetailsSheet>

          <ConfirmDeleteModal
            open={isDeleteConfirmationOpen}
            title="Delete Applications"
            description="Are you sure you want to delete the selected applications? This action cannot be undone."
            loading={bulkDeleteLoading}
            onConfirm={handleDeleteSelected}
            onCancel={() => setIsDeleteConfirmationOpen(false)}
          />
        </CardContent>
      </Card>
    </div>
  )
}