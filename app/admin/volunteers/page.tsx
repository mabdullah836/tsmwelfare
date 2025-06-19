"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertMessage } from "@/components/ui/alert-message"
import { formatDate } from "@/lib/utils/format"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Volunteer {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  address?: string
  city?: string
  occupation?: string
  availability?: string
  interests?: string[]
  skills?: string
  experience?: string
  motivation?: string
  references?: string
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/volunteer')
      const data = await response.json()
      if (response.ok && data.success) {
        console.log(data.data)  
        setVolunteers(data.data)
      } else {
        throw new Error('Failed to fetch volunteers')
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to fetch volunteers'
      })
    } finally {
      setIsLoading(false)
    }
  }

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

  const openModal = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer)
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVolunteer(null)
  }

  // Filtered volunteers
  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      v.firstName.toLowerCase().includes(search.toLowerCase()) ||
      v.lastName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      v.phone.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || v.status === statusFilter
    return matchesSearch && matchesStatus
  })

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
          <CardHeader>
            <CardTitle>Volunteer Applications</CardTitle>
            <CardDescription>
              Manage and review volunteer applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-center gap-2 flex-1 flex-wrap">
                <Input
                  placeholder="Search by name, email, or phone..."
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
            <div className="rounded-md border overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Phone</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Applied On</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">View</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-muted-foreground">
                        Loading volunteers...
                      </td>
                    </tr>
                  ) : filteredVolunteers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-muted-foreground">
                        No volunteer applications found
                      </td>
                    </tr>
                  ) : (
                    filteredVolunteers.map((volunteer) => (
                      <tr key={volunteer._id} className="border-b">
                        <td className="p-4 align-middle">{volunteer.firstName} {volunteer.lastName}</td>
                        <td className="p-4 align-middle">{volunteer.email}</td>
                        <td className="p-4 align-middle">{volunteer.phone}</td>
                        <td className="p-4 align-middle">
                          <Badge className={getStatusBadgeColor(volunteer.status)}>
                            {volunteer.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle">{formatDate(volunteer.createdAt)}</td>
                        <td className="p-4 align-middle">
                          <Button size="sm" variant="outline" onClick={() => openModal(volunteer)}>
                            View
                          </Button>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex gap-2">
                            {volunteer.status === 'pending' ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(volunteer._id, 'approved')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(volunteer._id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
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
                <div><b>Applied On:</b> {formatDate(selectedVolunteer.createdAt)}</div>
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
      </div>
    </div>
  )
} 