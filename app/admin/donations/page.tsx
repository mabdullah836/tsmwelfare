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
  User,
  Calendar,
  Gift,
  ClipboardList,
  FileText
} from "lucide-react"
import { AlertMessage } from '@/components/ui/alert-message';
import { formatDate } from "@/lib/utils/format"
import { useDonations } from '@/lib/hooks/use-donations';
import { DonationRecord } from '@/lib/types/donation';
import { useDebounce } from '@/lib/hooks/use-debounce'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { AdminTable } from "@/components/shared/AdminTable";
import AdminDetailsSheet from "@/components/shared/AdminDetailsSheet";

export default function DonationsPage() {
  // Replace state and fetching logic with useDonations
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSingleDeleteOpen, setSingleDeleteOpen] = useState(false);
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);
  const [singleDeleteLoading, setSingleDeleteLoading] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  const {
    donations,
    isLoading,
    fetchDonations,
    meta
  } = useDonations({ page, limit: 10 });

  // Fetch donations from API
  useEffect(() => {
    fetchDonations();
  }, [page, 10, search]);

  // Handle row selection
  const toggleRowSelection = (id: string) => {
    setRowSelection(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAllRowsSelection = () => {
    if (Object.keys(rowSelection).length === donations.length) {
      setRowSelection({});
    } else {
      const newSelection: Record<string, boolean> = {};
      donations.forEach(donation => {
        if (donation.id) newSelection[donation.id] = true;
      });
      setRowSelection(newSelection);
    }
  };

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedDonations = [...donations].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof DonationRecord];
    const bValue = b[sortConfig.key as keyof DonationRecord];
    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleStatusChange = async (id: string, newStatus: 'completed' | 'failed') => {
    try {
      if (newStatus === 'failed') {
        const response = await fetch(`/api/donation/${id}`, { method: 'DELETE' })
        const data = await response.json()
        if (response.ok && data.success) {
          fetchDonations(); // Refresh donations after deletion
          setRowSelection(prev => {
            const newSelection = {...prev}
            delete newSelection[id]
            return newSelection
          })
          setAlert({ type: 'success', message: 'Donation marked as failed and removed successfully' });
        } else {
          throw new Error('Failed to update donation')
        }
      } else {
        const response = await fetch(`/api/donation/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        })
        const data = await response.json()
        if (response.ok && data.success) {
          fetchDonations(); // Refresh donations after status change
          setAlert({ type: 'success', message: `Donation marked as ${newStatus} successfully` });
        } else {
          throw new Error('Failed to update donation status')
        }
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to update donation status' });
    }
  }

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
    setBulkDeleteLoading(true);
    try {
      await Promise.all(selectedIds.map(id => 
        fetch(`/api/donation/${id}`, { method: 'DELETE' })
      ));
      fetchDonations(); // Refresh donations after bulk deletion
      setRowSelection({});
      setDeleteConfirmationOpen(false);
      setAlert({ type: 'success', message: `${selectedIds.length} donation(s) deleted successfully` });
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to delete donations' });
    } finally {
      setBulkDeleteLoading(false);
    }
  };

  const handleSingleDelete = async () => {
    if (!singleDeleteId) return;
    setSingleDeleteLoading(true);
    await handleStatusChange(singleDeleteId, 'failed');
    setSingleDeleteLoading(false);
    setSingleDeleteOpen(false);
    setSingleDeleteId(null);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="flex flex-col flex-1 min-h-0">
        <CardHeader>
          <CardTitle>Donations</CardTitle>
          <CardDescription>Manage and review donation records</CardDescription>
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
              placeholder="Filter by donor name..."
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
                      checked={Object.keys(rowSelection).length === donations.length && donations.length > 0}
                      onCheckedChange={toggleAllRowsSelection}
                      aria-label="Select all"
                      className="translate-y-[2px]"
                    />
                  ),
                  className: "w-12",
                },
                { key: "donor", label: "Donor", className: "min-w-[160px]" },
                { key: "amount", label: "Amount", className: "min-w-[120px]" },
                { key: "status", label: "Status", className: "w-32 text-center" },
                { key: "donationDate", label: "Donation Date", className: "w-40" },
                { key: "actions", label: "Actions", className: "w-16 text-center" },
              ]}
              data={sortedDonations}
              loading={isLoading}
              emptyState={{
                title: search ? "No donations match your search" : "No donations found",
              }}
              renderRow={(donation) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <Checkbox
                      checked={!!rowSelection[donation.id || '']}
                      onCheckedChange={() => toggleRowSelection(donation.id || '')}
                      aria-label="Select row"
                      className="translate-y-[2px]"
                    />
                  </TableCell>
                  <TableCell className="font-medium truncate">
                    {donation.donor}
                  </TableCell>
                  <TableCell className="truncate">
                    ${donation.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="w-32 text-center">
                    <Badge 
                      variant={
                        donation.status === 'completed' 
                          ? 'secondary' 
                          : donation.status === 'failed' 
                          ? 'destructive' 
                          : 'outline'
                      } 
                      className="capitalize"
                    >
                      {donation.status || 'pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="w-40">
                    {donation.date ? formatDate(donation.date) : 'N/A'}
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
                        <DropdownMenuItem onClick={() => setSelectedDonation(donation)}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(donation.id || '', 'completed')}
                          className={donation.status === 'completed' ? 'opacity-50 pointer-events-none' : ''}
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSingleDeleteId(donation.id || '');
                            setSingleDeleteOpen(true);
                          }}
                          className={donation.status === 'failed' ? 'opacity-50 pointer-events-none' : ''}
                        >
                          <XCircle className="mr-2 h-4 w-4" /> Mark Failed
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
              {Object.keys(rowSelection).filter(id => rowSelection[id]).length} of {donations.length} row(s) selected.
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
            open={!!selectedDonation}
            onOpenChange={(open) => !open && setSelectedDonation(null)}
            title={
              <>
                <User /> {selectedDonation?.donor}
              </>
            }
            statusBadge={selectedDonation && (
              <Badge
                variant={
                  selectedDonation.status === 'completed'
                    ? 'secondary'
                    : selectedDonation.status === 'failed'
                    ? 'destructive'
                    : 'outline'
                }
                className="capitalize"
              >
                {selectedDonation.status || 'pending'}
              </Badge>
            )}
            description={selectedDonation ? 'donation details.' : undefined}
          >
            {selectedDonation && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-muted-foreground" />Donation Information
                  </h3>
                  <p className="text-sm flex items-center gap-2">
                    <Gift className="w-4 h-4 text-muted-foreground" /> Amount: ${selectedDonation.amount.toFixed(2)}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Donated on {selectedDonation.date ? formatDate(selectedDonation.date) : 'N/A'}
                  </p>
                </div>
                {selectedDonation.paymentMethod && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />Payment Method
                    </h3>
                    <p className="text-sm">{selectedDonation.paymentMethod}</p>
                  </div>
                )}
              </div>
            )}
          </AdminDetailsSheet>

          <ConfirmDeleteModal
            open={isDeleteConfirmationOpen}
            title="Delete Donations"
            description="Are you sure you want to delete the selected donations? This action cannot be undone."
            loading={bulkDeleteLoading}
            onConfirm={handleDeleteSelected}
            onCancel={() => setDeleteConfirmationOpen(false)}
          />
          <ConfirmDeleteModal
            open={isSingleDeleteOpen}
            title="Mark Donation as Failed?"
            description="Are you sure you want to mark this donation as failed? This action cannot be undone."
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