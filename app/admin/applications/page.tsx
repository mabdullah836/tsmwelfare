"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertMessage } from "@/components/ui/alert-message"
import { NoRecords } from "@/components/ui/no-records"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatDate } from "@/lib/utils/format"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { FixedSizeList as RWList, ListChildComponentProps } from 'react-window';
import { fetchApplications, updateApplicationStatus } from '@/lib/services/application'
import type { Application } from '@/lib/types/application'

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const pageSize = 10

  // Reset page to 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [search, statusFilter])

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const data = await fetchApplications()
        setApplications(data)
        setAlert({ message: `Successfully loaded ${data.length} applications`, type: 'success' })
      } catch (error) {
        setAlert({ message: 'Failed to fetch applications', type: 'error' })
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const updateStatus = async (applicationId: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      await updateApplicationStatus(applicationId, newStatus)
      setApplications(applications.map(a => a._id === applicationId ? { ...a, status: newStatus } : a))
      setAlert({ message: 'Application status has been updated', type: 'success' })
    } catch (error) {
      setAlert({ message: 'Failed to update application status', type: 'error' })
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

  // Filtered applications
  const filteredApplications = useMemo(() => applications.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || a.status === statusFilter
    return matchesSearch && matchesStatus
  }), [applications, search, statusFilter])

  const totalPages = Math.ceil(filteredApplications.length / pageSize)

  // Memoize paginated applications
  const paginatedApplications = useMemo(() => {
    return filteredApplications.slice((page - 1) * pageSize, page * pageSize)
  }, [filteredApplications, page, pageSize])

  // Adjust page number if it's out of bounds
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const Row = ({ index, style }: ListChildComponentProps) => {
    const application = paginatedApplications[index];
    if (!application) return null;
    return (
      <div style={style} className="flex items-center border-b" role="row">
        <div className="p-4 flex-[2] whitespace-nowrap" role="cell">{application.name}</div>
        <div className="p-4 flex-[2] whitespace-nowrap capitalize" role="cell">
          {application.type.replace("_", " ")}
        </div>
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
  };

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
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            Manage and review assistance applications
          </CardDescription>
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="rounded-md border" role="table">
              <div className="flex bg-muted/50 font-medium" role="rowgroup">
                <div className="p-4 flex-[2]" role="columnheader">Name</div>
                <div className="p-4 flex-[2]" role="columnheader">Type</div>
                <div className="p-4 flex-[3]" role="columnheader">Contact</div>
                <div className="p-4 flex-[2]" role="columnheader">Applied On</div>
                <div className="p-4 flex-[1]" role="columnheader">Status</div>
                <div className="p-4 flex-[1]" role="columnheader">Actions</div>
              </div>
              <div role="rowgroup">
                {loading ? (
                  <div className="p-10 text-center">Loading...</div>
                ) : paginatedApplications.length === 0 ? (
                  <NoRecords title="No applications found" description={search || statusFilter !== 'all' ? 'Try adjusting your filters or search terms' : 'No applications available yet.'} />
                ) : (
                  <RWList
                    height={400}
                    itemCount={paginatedApplications.length}
                    itemSize={73}
                    width="100%"
                  >
                    {Row}
                  </RWList>
                )}
              </div>
            </div>
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-8 flex justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} isActive={page > 1} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} isActive={page < totalPages} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          {selectedApplication && (
            <>
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Submitted on {formatDate(selectedApplication.createdAt || '')}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div>
                  <h3 className="font-medium mb-2">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p>{selectedApplication.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{selectedApplication.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">CNIC</p>
                      <p>{selectedApplication.cnic}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p>{selectedApplication.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="capitalize">{selectedApplication.type.replace("_", " ")}</p>
                    </div>
                  </div>
                </div>

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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}