"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  {
    id: 1,
    title: "Free Medical Camp",
    date: "June 15, 2025",
    time: "8:00 AM - 4:00 PM",
    location: "Village Chak 123, Faisalabad",
    description:
      "Our health department is organizing a medical camp in this village. Free checkup and medicines for everyone. We're bringing qualified doctors to help people who can't reach the city.",
    category: "health",
  },
  {
    id: 2,
    title: "Monthly Food Distribution",
    date: "June 20, 2025",
    time: "9:00 AM - 2:00 PM",
    location: "Trust Office, Main Bazaar",
    description:
      "Monthly food packages for registered families. If you need food support, come with your ID card. We have rice, flour, oil and other basic items.",
    category: "food",
  },
  {
    id: 3,
    title: "Future School Planning Meeting",
    date: "June 25, 2025",
    time: "10:00 AM - 12:00 PM",
    location: "Community Center, Jaranwala Road",
    description:
      "We're discussing our dream to build a school for poor children one day. Come join the meeting if you want to help us plan for this future project.",
    category: "education",
  },
  {
    id: 4,
    title: "Quran Pages Collection Drive",
    date: "July 2, 2025",
    time: "All Day",
    location: "Various Mosques in the City",
    description:
      "Our Muqadas Awraq department is collecting old and damaged Quran pages from mosques and homes. We will properly dispose of them according to Islamic way.",
    category: "muqadas",
  },
  {
    id: 5,
    title: "Wedding Support for Orphan Girl",
    date: "July 8, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Community Hall, Millat Town",
    description:
      "We're organizing a simple wedding for an orphan girl who has no earning person in her family. The marriage support department covers all wedding expenses for such girls only. Everyone is invited to attend and give blessings.",
    category: "marriage",
  },
  {
    id: 6,
    title: "Financial Help Distribution",
    date: "July 12, 2025",
    time: "9:00 AM - 1:00 PM",
    location: "Trust Office",
    description:
      "Monthly financial assistance for widows and elderly people. If you're registered with us, come collect your support money. Bring your ID card.",
    category: "financial",
  },
  {
    id: 7,
    title: "School Admission Drive",
    date: "July 18, 2025",
    time: "8:00 AM - 5:00 PM",
    location: "Government Schools in Area",
    description:
      "Education department is helping poor families get their children admitted in schools. We'll pay the fees and buy books. Bring your child's birth certificate.",
    category: "education",
  },
  {
    id: 8,
    title: "Free Quran Distribution",
    date: "July 22, 2025",
    time: "After Maghrib Prayer",
    location: "Central Mosque, City Center",
    description:
      "Muqadas Awraq department is giving free copies of Holy Quran to families. We also have Islamic books for children. First come, first served.",
    category: "muqadas",
  },
  {
    id: 9,
    title: "Ramadan Preparation Meeting",
    date: "July 28, 2025",
    time: "7:00 PM - 9:00 PM",
    location: "Trust Office",
    description:
      "Planning meeting for next Ramadan food packages. We want to help 1000 families this year. Volunteers and donors are welcome to join.",
    category: "food",
  },
  {
    id: 10,
    title: "Fundraising for School Dream",
    date: "August 5, 2025",
    time: "11:00 AM - 1:00 PM",
    location: "Community Center",
    description:
      "We're organizing a fundraising event for our dream school project. We want to collect donations and find supporters who can help us build a school for 300 poor children in the future.",
    category: "education",
  },
]

export function UpcomingEvents() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredEvents = activeTab === "all" ? events : events.filter((event) => event.category === activeTab)

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Coming Up</h2>
          <p className="text-lg text-muted-foreground">
            Here are our upcoming events and activities. Come join us and be part of something good!
          </p>
        </div>

        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 max-w-4xl mx-auto">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="marriage">Marriage</TabsTrigger>
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
                    Get More Info
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <a href="/events">See All Events</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
