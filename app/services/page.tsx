import { FeatureCard } from "@/components/feature-card"
import { Carousel } from "@/components/carousel"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, Award, BookOpen, Handshake, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Our Services</h1>
            <p className="text-xl text-white/90">
              Discover the various ways we're working to make a positive impact in our community.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <Tabs defaultValue="community" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-12">
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="youth">Youth</TabsTrigger>
              <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            </TabsList>
            <TabsContent value="community" className="mt-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Community Outreach</h2>
                  <p className="text-lg mb-4">
                    Our community outreach programs connect with local neighborhoods to provide essential services and
                    support to those in need. We believe in meeting people where they are and addressing their most
                    pressing concerns.
                  </p>
                  <p className="text-lg mb-6">
                    Through food drives, clothing donations, emergency assistance, and community events, we strive to
                    create a safety net for vulnerable individuals and families.
                  </p>
                  <Button asChild>
                    <a href="/contact">Get Support</a>
                  </Button>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Community outreach"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Upcoming Community Events</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Food Distribution",
                      date: "June 15, 2025",
                      location: "Community Center",
                      description: "Free groceries for families in need. No registration required.",
                    },
                    {
                      title: "Resource Fair",
                      date: "July 8, 2025",
                      location: "City Park",
                      description: "Connect with local service providers and learn about available resources.",
                    },
                    {
                      title: "Community Clean-Up",
                      date: "July 22, 2025",
                      location: "Neighborhood Streets",
                      description: "Join us in beautifying our community. Tools and refreshments provided.",
                    },
                  ].map((event, index) => (
                    <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                      <div className="flex items-center text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                      <p>{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="education">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Education initiatives"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6">Education Initiatives</h2>
                  <p className="text-lg mb-4">
                    Our education programs empower individuals through knowledge and skills development. We believe that
                    education is a powerful tool for personal growth and community advancement.
                  </p>
                  <p className="text-lg mb-6">
                    From tutoring and literacy programs to vocational training and digital skills workshops, we provide
                    opportunities for lifelong learning and development.
                  </p>
                  <Button asChild>
                    <a href="/contact">Join a Program</a>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Other tab contents would be similar */}
          </Tabs>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">How We Help</h2>
          <div className="card-grid">
            <FeatureCard
              title="Direct Services"
              description="Providing immediate assistance to individuals and families in need through our various programs."
              icon={<Heart className="h-6 w-6" />}
            />
            <FeatureCard
              title="Education & Training"
              description="Offering workshops, classes, and resources to help people develop new skills and knowledge."
              icon={<BookOpen className="h-6 w-6" />}
            />
            <FeatureCard
              title="Advocacy"
              description="Working to address systemic issues and create positive change at the community and policy levels."
              icon={<Award className="h-6 w-6" />}
            />
            <FeatureCard
              title="Community Building"
              description="Creating opportunities for connection and collaboration to strengthen our community."
              icon={<Users className="h-6 w-6" />}
            />
            <FeatureCard
              title="Resource Coordination"
              description="Connecting people with the services and support they need, both within our organization and beyond."
              icon={<Handshake className="h-6 w-6" />}
            />
            <FeatureCard
              title="Volunteer Opportunities"
              description="Engaging community members in meaningful service that makes a difference."
              icon={<Users className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Highlights</h2>
            <p className="text-lg text-muted-foreground">
              Take a look at some of the ways we've been making a difference in our community.
            </p>
          </div>

          <Carousel
            className="h-[400px] max-w-4xl mx-auto"
            items={[
              <div key="1" className="h-full rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Service highlight"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Community Garden Project</h3>
                  <p className="text-white/90">
                    Our community garden provides fresh produce and a space for neighbors to connect and learn.
                  </p>
                </div>
              </div>,
              <div key="2" className="h-full rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Service highlight"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Youth Mentorship Program</h3>
                  <p className="text-white/90">
                    Our mentorship program pairs young people with caring adults who provide guidance and support.
                  </p>
                </div>
              </div>,
              <div key="3" className="h-full rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Service highlight"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Senior Support Services</h3>
                  <p className="text-white/90">
                    We help older adults remain independent and connected through various support services.
                  </p>
                </div>
              </div>,
            ]}
          />
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Our Services?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Contact us today to learn more about how we can help you or your community.
            </p>
            <Button asChild size="lg" variant="secondary" className="font-medium">
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
