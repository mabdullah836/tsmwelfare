"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/carousel"
import { Play, Download, Calendar, User } from "lucide-react"

export default function MediaPage() {
  const [videoPlaying, setVideoPlaying] = useState<string | null>(null)

  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Media Center</h1>
            <p className="text-xl text-white/90">
              Explore photos, videos, and publications that showcase our work and impact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="mt-6">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">Photo Gallery</h2>
                <p className="text-lg text-muted-foreground">Images from our programs, events, and community impact.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={`/placeholder.svg?height=300&width=400&text=Photo+${index + 1}`}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium">Community Event {index + 1}</p>
                      <p className="text-sm text-muted-foreground">June 2025</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline">Load More Photos</Button>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">Video Gallery</h2>
                <p className="text-lg text-muted-foreground">
                  Watch videos about our programs, testimonials, and impact stories.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48 bg-muted">
                      {videoPlaying === `video-${index}` ? (
                        <iframe
                          src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`}
                          title={`Video ${index + 1}`}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <Image
                            src={`/placeholder.svg?height=200&width=400&text=Video+${index + 1}`}
                            alt={`Video thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="rounded-full bg-primary/90 text-white hover:bg-primary"
                              onClick={() => setVideoPlaying(`video-${index}`)}
                            >
                              <Play className="h-6 w-6" />
                              <span className="sr-only">Play video</span>
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium">Impact Story Video {index + 1}</p>
                      <p className="text-sm text-muted-foreground">May 2025</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="publications" className="mt-6">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold mb-4">Publications</h2>
                <p className="text-lg text-muted-foreground">
                  Annual reports, newsletters, and other publications about our work.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Annual Report 2024",
                    description: "A comprehensive overview of our programs, impact, and financials for the year 2024.",
                    date: "March 2025",
                    author: "Organization Leadership Team",
                  },
                  {
                    title: "Community Impact Study",
                    description: "Research on the effectiveness and outcomes of our community programs.",
                    date: "January 2025",
                    author: "Research Department",
                  },
                  {
                    title: "Spring Newsletter",
                    description: "Updates on our recent activities, upcoming events, and success stories.",
                    date: "April 2025",
                    author: "Communications Team",
                  },
                  {
                    title: "Program Guide 2025",
                    description: "Detailed information about all our programs and services for the current year.",
                    date: "February 2025",
                    author: "Program Directors",
                  },
                  {
                    title: "Volunteer Handbook",
                    description: "Guidelines and information for current and prospective volunteers.",
                    date: "December 2024",
                    author: "Volunteer Coordinator",
                  },
                  {
                    title: "Strategic Plan 2025-2030",
                    description: "Our vision, goals, and strategies for the next five years.",
                    date: "January 2025",
                    author: "Board of Directors",
                  },
                ].map((publication, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-48 bg-secondary flex items-center justify-center p-6">
                      <div className="text-center">
                        <p className="text-xl font-bold text-secondary-foreground">{publication.title}</p>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="mb-4">{publication.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{publication.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <User className="h-4 w-4 mr-2" />
                        <span>{publication.author}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Media</h2>
            <p className="text-lg text-muted-foreground">Explore our most impactful stories and media highlights.</p>
          </div>

          <Carousel
            className="h-[500px] max-w-5xl mx-auto"
            items={[
              <div key="1" className="h-full rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=500&width=1000&text=Featured+Media+1"
                  alt="Featured media"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Community Garden Opening</h3>
                  <p className="text-white/90 mb-4">
                    Our new community garden provides fresh produce and a space for neighbors to connect and learn.
                  </p>
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-fit">
                    View Gallery
                  </Button>
                </div>
              </div>,
              <div key="2" className="h-full rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=500&width=1000&text=Featured+Media+2"
                  alt="Featured media"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Annual Fundraising Gala</h3>
                  <p className="text-white/90 mb-4">
                    Our most successful fundraising event to date, raising over $100,000 for our programs.
                  </p>
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-fit">
                    View Gallery
                  </Button>
                </div>
              </div>,
              <div key="3" className="h-full rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=500&width=1000&text=Featured+Media+3"
                  alt="Featured media"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Youth Leadership Conference</h3>
                  <p className="text-white/90 mb-4">
                    Empowering the next generation of leaders through workshops, mentorship, and community projects.
                  </p>
                  <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 w-fit">
                    View Gallery
                  </Button>
                </div>
              </div>,
            ]}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-lg text-muted-foreground mb-8">
              For press inquiries, interview requests, or media resources, please contact our communications team.
            </p>
            <div className="bg-muted p-6 rounded-lg inline-block text-left">
              <p className="font-medium mb-1">Media Contact:</p>
              <p className="mb-1">Jane Smith, Communications Director</p>
              <p className="mb-1">
                <a href="mailto:media@organization.org" className="text-primary hover:underline">
                  media@organization.org
                </a>
              </p>
              <p>
                <a href="tel:+11234567890" className="text-primary hover:underline">
                  +1 (123) 456-7890
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
