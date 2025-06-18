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
import { NoRecords } from "@/components/ui/no-records"

interface Application {
  _id: string
  type: string
  name: string
  email: string
  phone: string
  address: string
  description: string
  documents: string[]
  status: string
  createdAt: string
  cnic: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/applications')
      const data = await response.json()
      
      if (data.success) {
        setApplications(data.data)
        setAlert({
          message: `Successfully loaded ${data.data.length} applications`,
          type: "success"
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      console.log(error)
      setAlert({
        message: "Failed to fetch applications",
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()
      
      if (data.success) {
        setApplications(applications.map(a => 
          a._id === applicationId ? { ...a, status: newStatus } : a
        ))
        setAlert({
          message: "Application status has been updated",
          type: "success"
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      setAlert({
        message: "Failed to update application status",
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
          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : applications.length === 0 ? (
            <NoRecords 
              title="No Applications Found"
              description="There are no applications available at the moment."
            />
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application._id}>
                      <TableCell className="whitespace-nowrap">{application.name}</TableCell>
                      <TableCell className="whitespace-nowrap capitalize">
                        {application.type.replace("_", " ")}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="whitespace-nowrap">{application.email}</div>
                          <div className="whitespace-nowrap">{application.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">{formatDate(application.createdAt)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(application.status)}>
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application)
                              setShowDetails(true)
                            }}
                          >
                            View
                          </Button>
                          {application.status === 'pending' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => updateApplicationStatus(application._id, 'approved')}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => updateApplicationStatus(application._id, 'rejected')}
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
            </div>
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
                  Submitted on {formatDate(selectedApplication.createdAt)}
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