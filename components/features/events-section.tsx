"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NoRecords } from "@/components/ui/no-records"
import Image from "next/image"
import { format } from "date-fns"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"

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

interface EventsSectionProps {
  title?: string
  description?: string
  events: Event[]
}

export const EventsSection = React.memo(function EventsSection({ 
  title = "Upcoming Events", 
  description = "Join us in our upcoming events and be part of our mission.", 
  events 
}: EventsSectionProps) {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        {description && (
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            {description}
          </p>
        )}
        {events.length === 0 ? (
          <NoRecords title="No Events Scheduled" description="There are no upcoming events at the moment. Please check back later for new events." />
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
}); 