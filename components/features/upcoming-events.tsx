"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NoRecords } from "@/components/ui/no-records"
import Image from "next/image"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"
import { Skeleton } from "@/components/ui/skeleton"

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  imageUrl?: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        setAlert({
          message: "Failed to fetch events. Please try again later.",
          type: "error"
        })
        setEvents([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <h2 className="text-3xl font-bold mb-12 text-center">Upcoming Events</h2>
        {events.length === 0 ? (
          <NoRecords 
            title="No Events Scheduled"
            description="There are no upcoming events at the moment. Please check back later for new events."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event._id} className="overflow-hidden flex flex-col">
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={event.imageUrl || `/placeholder.svg?height=400&width=600&text=Event`}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-muted-foreground mb-4 flex-1">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
