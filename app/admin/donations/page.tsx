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
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  MoreHorizontal, 
  Trash2, 
  Eye,
  Mail,
  User,
  Calendar,
  Gift,
  ClipboardList,
  Phone,
  MessageSquare
} from "lucide-react"
import { AlertMessage } from '@/components/ui/alert-message';
import { formatDate } from "@/lib/utils/format"
import { useDonations } from '@/lib/hooks/useDonations';
import { DonationRecord } from '@/lib/types/donation';
import { useDebounce } from '@/lib/hooks/use-debounce'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal';
import { AdminTable } from "@/components/shared/AdminTable";
import AdminDetailsSheet from "@/components/shared/AdminDetailsSheet";
import { useSelection } from '@/lib/hooks/use-selection';
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete';
import { TablePagination } from '@/components/shared/TablePagination';
import { SearchInput } from '@/components/shared/SearchInput';

export default function DonationsPage() {
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400)
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{key: string; direction: 'asc' | 'desc'} | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // SWR hook for donations
  const { donations, meta, isLoading, mutate } = useDonations({ page, limit: 10, q: debouncedSearch });

  // Handle row selection
  const selectableDonations = donations
    .filter((donation: DonationRecord) => typeof donation.id === 'string')
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableDonations);

  const deleteDonations = async (ids: string[]) => {
    const response = await fetch('/api/donations', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    const data = await response.json();
    if (response.ok && data.success) {
      setSelectedIds([]);
      setAlert({ type: 'success', message: `${ids.length} donation(s) deleted successfully` });
      mutate();
    } else {
      setAlert({ type: 'error', message: data.message || 'Failed to delete donations' });
    }
  };

  const { showDeleteConfirm, setShowDeleteConfirm, deleting, handleBulkDelete } = useBulkDelete(deleteDonations, selectedIds);

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedDonations = [...donations].sort((a: DonationRecord, b: DonationRecord) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key as keyof DonationRecord];
    const bValue = b[sortConfig.key as keyof DonationRecord];
    if (aValue === undefined || bValue === undefined) return 0;
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="flex flex-col h-full min-h-0">
      <Card className="flex flex-col flex-1 min-h-0 shadow-none">
        <CardHeader className="p-4 sm:p-6">
          <h1 className="text-xl font-semibold tracking-tight">Donations</h1>
          <CardDescription>Manage and review donation records</CardDescription>
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
              label="Search donations by donor name or email"
              placeholder="Search by donor name or email…"
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
                { key: "donor", label: "Donor", className: "min-w-[160px]" },
                { key: "amount", label: "Amount", className: "min-w-[120px]" },
                { key: "type", label: "Donation Type", className: "w-50" },
                { key: "donationDate", label: "Donation Date", className: "w-40" },
                { key: "actions", label: "Actions", className: "w-16 text-center" },
              ]}
              data={sortedDonations}
              loading={isLoading}
              emptyState={{
                title: search ? "No donations match your search" : "No donations found",
              }}
              renderRow={(donation: DonationRecord) => (
                <TableRow key={donation.id}>
                  <TableCell>
                    <Checkbox
                      checked={!!donation.id && selectedIds.includes(donation.id)}
                      onCheckedChange={() => donation.id && toggleSelect(donation.id)}
                      aria-label="Select row"
                      className="translate-y-[2px]"
                    />
                  </TableCell>
                  <TableCell className="font-medium truncate">
                    {donation.donor.firstName} {donation.donor.lastName}
                  </TableCell>
                  <TableCell className="truncate">
                    {donation.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="truncate">
                    {donation.type}
                  </TableCell>
                  <TableCell className="w-40">
                    {donation.createdAt ? formatDate(donation.createdAt) : 'N/A'}
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
            pageCount={donations.length}
            onPageChange={setPage}
          />

          <AdminDetailsSheet
            open={!!selectedDonation}
            onOpenChange={(open) => !open && setSelectedDonation(null)}
            title={
              <>
                <User /> {selectedDonation?.donor.firstName} {selectedDonation?.donor.lastName}
              </>
            }
            description={selectedDonation ? 'Donation Details' : undefined}
          >
            {selectedDonation && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-muted-foreground" />Donation Information
                  </h3>
                  <p className="text-sm flex items-center gap-2">
                    <Gift className="w-4 h-4 text-muted-foreground" /> Amount: {selectedDonation.amount.toFixed(2)}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Donated on {selectedDonation.createdAt ? formatDate(selectedDonation.createdAt) : 'N/A'}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" /> Donor Information
                  </h3>
                  <p className="text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" /> Email: {selectedDonation.donor.email}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" /> Phone: {selectedDonation.donor.phone}
                  </p>
                  <p className="text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" /> Message: {selectedDonation.message}
                  </p>
                </div>
              </div>
            )}
          </AdminDetailsSheet>

          <ConfirmDeleteModal
            open={showDeleteConfirm}
            title="Delete Donations"
            description="Are you sure you want to delete the selected donations? This action cannot be undone."
            loading={deleting}
            onConfirm={handleBulkDelete}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        </CardContent>
      </Card>
    </div>
  )
}