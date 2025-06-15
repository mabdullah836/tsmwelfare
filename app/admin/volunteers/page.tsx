"use client"

import { useEffect, useState } from "react"
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
import { AdminHeader } from "@/components/layout/admin-header"

interface Volunteer {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  occupation: string
  availability: string
  interests: string[]
  status: string
  createdAt: string
  skills: string
  experience: string
  motivation: string
  references: string
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchVolunteers()
  }, [])

  const fetchVolunteers = async () => {
    try {
      const response = await fetch('/api/volunteer')
      const data = await response.json()
      
      if (data.success) {
        setVolunteers(data.data)
        setAlert({
          message: `Successfully loaded ${data.data.length} volunteer applications`,
          type: "success"
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      setAlert({
        message: "Failed to fetch volunteer applications",
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  const updateVolunteerStatus = async (volunteerId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/volunteer/${volunteerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()
      
      if (data.success) {
        setVolunteers(volunteers.map(v => 
          v._id === volunteerId ? { ...v, status: newStatus } : v
        ))
        setAlert({
          message: "Volunteer application status has been updated",
          type: "success"
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      setAlert({
        message: "Failed to update volunteer status",
        type: "error"
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
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
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {volunteers.map((volunteer) => (
                    <TableRow key={volunteer._id}>
                      <TableCell>
                        {volunteer.firstName} {volunteer.lastName}
                      </TableCell>
                      <TableCell>{volunteer.email}</TableCell>
                      <TableCell>{volunteer.city}</TableCell>
                      <TableCell>{volunteer.availability}</TableCell>
                      <TableCell>{formatDate(volunteer.createdAt)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(volunteer.status)}>
                          {volunteer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedVolunteer(volunteer)
                              setShowDetails(true)
                            }}
                          >
                            View
                          </Button>
                          {volunteer.status === 'pending' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => updateVolunteerStatus(volunteer._id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => updateVolunteerStatus(volunteer._id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-3xl">
            {selectedVolunteer && (
              <>
                <DialogHeader>
                  <DialogTitle>Volunteer Application Details</DialogTitle>
                  <DialogDescription>
                    Submitted on {formatDate(selectedVolunteer.createdAt)}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 py-4">
                  <div>
                    <h3 className="font-medium mb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p>{selectedVolunteer.firstName} {selectedVolunteer.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p>{selectedVolunteer.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>{selectedVolunteer.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">City</p>
                        <p>{selectedVolunteer.city}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Occupation</p>
                        <p>{selectedVolunteer.occupation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Availability</p>
                        <p>{selectedVolunteer.availability}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Areas of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVolunteer.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Skills and Qualifications</h3>
                    <p className="whitespace-pre-wrap">{selectedVolunteer.skills}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Previous Experience</h3>
                    <p className="whitespace-pre-wrap">{selectedVolunteer.experience}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Motivation</h3>
                    <p className="whitespace-pre-wrap">{selectedVolunteer.motivation}</p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">References</h3>
                    <p className="whitespace-pre-wrap">{selectedVolunteer.references}</p>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 