"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertMessage } from "@/components/ui/alert-message"
import { formatDate } from "@/lib/utils/format"

interface Volunteer {
  _id: string
  name: string
  email: string
  phone: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setVolunteers([
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        // Add more mock data as needed
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleStatusChange = async (id: string, newStatus: 'approved' | 'rejected') => {
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-muted/30">
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
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Phone</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Applied On</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer._id} className="border-b">
                      <td className="p-4 align-middle">{volunteer.name}</td>
                      <td className="p-4 align-middle">{volunteer.email}</td>
                      <td className="p-4 align-middle">{volunteer.phone}</td>
                      <td className="p-4 align-middle">
                        <Badge className={getStatusBadgeColor(volunteer.status)}>
                          {volunteer.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{formatDate(volunteer.createdAt)}</td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          {volunteer.status === 'pending' && (
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
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 