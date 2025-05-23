"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  {
    id: 1,
    title: "Charity Fundraising Dinner",
    date: "June 15, 2025",
    time: "7:00 PM - 10:00 PM",
    location: "Grand Hotel, City Center",
    description: "Join us for an evening of inspiration and generosity to support our education initiatives.",
    category: "fundraising",
  },
  {
    id: 2,
    title: "Medical Camp",
    date: "June 22, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Community Center, North District",
    description: "Free medical checkups and consultations for community members.",
    category: "community",
  },
  {
    id: 3,
    title: "Volunteer Orientation",
    date: "June 28, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Trust Headquarters",
    description: "Introduction session for new volunteers to learn about our mission and opportunities.",
    category: "volunteer",
  },
  {
    id: 4,
    title: "Food Distribution Drive",
    date: "July 5, 2025",
    time: "8:00 AM - 2:00 PM",
    location: "Various Locations",
    description: "Distribution of food packages to families in need throughout the city.",
    category: "community",
  },
  {
    id: 5,
    title: "Education Scholarship Ceremony",
    date: "July 12, 2025",
    time: "5:00 PM - 7:00 PM",
    location: "City Hall Auditorium",
    description: "Annual ceremony to award scholarships to deserving students.",
    category: "education",
  },
  {
    id: 6,
    title: "Monthly Board Meeting",
    date: "July 15, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Trust Headquarters",
    description: "Monthly meeting of the board of directors. Open to all members.",
    category: "volunteer",
  },
]

export function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredEvents = activeTab === "all" ? events : events.filter((event) => event.category === activeTab)

  return (
    <section className="section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-lg text-muted-foreground">
            Join us at our upcoming events and be a part of our mission to serve the community.
          </p>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="fundraising">Fundraising</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-primary/10 p-4 border-b">
                  <h3 className="font-bold text-xl mb-1">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-3">{event.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start mb-4">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                  <p className="mb-4">{event.description}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <a href="/events">View All Events</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
