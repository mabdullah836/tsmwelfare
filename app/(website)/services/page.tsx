import { FeatureCard } from "@/components/shared/feature-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Users, Award, BookOpen, Handshake, Calendar, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import Link from "next/link";
import { AdminGrid } from "@/components/shared/AdminGrid";
import { ReusableCarousel } from "@/components/shared/carousel";

export default function ServicesPage() {
  const seviceData = [
    {
      title: "Community Garden Initiative",
      description: "Our urban garden now provides fresh produce to 200+ families each month while teaching sustainable practices.",
      image: "/images/garden-project.jpg"
    },
    {
      title: "Youth Mentorship Program",
      description: "87% of participants showed improved academic performance and self-confidence after one year.",
      image: "/images/youth-mentorship.jpg"
    },
    {
      title: "Senior Companion Services",
      description: "Helping older adults remain independent with weekly check-ins and assistance.",
      image: "/images/senior-services.jpg"
    }
  ]
  return (
    <>
        <PageHeader title="Our Services">
          <p className="text-xl text-white/90 max-w-2xl">
            Discover the various ways we're working to make a positive impact in our community through comprehensive support programs.
          </p>
        </PageHeader>

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-medium">
              Our Focus Areas
            </span>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Transforming Communities Through <span className="text-primary">Targeted Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each program is designed to address specific needs while fostering long-term growth and resilience.
            </p>
          </div>

          <Tabs defaultValue="community" className="w-full">
            <TabsList className="w-full flex-nowrap whitespace-nowrap p-2 rounded-xl shadow mb-16 gap-2 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent min-h-[56px]">
              <TabsTrigger value="community" className="px-6 py-3 rounded-full text-base font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Users className="h-5 w-5 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger value="education" className="px-6 py-3 rounded-full text-base font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Education
              </TabsTrigger>
              <TabsTrigger value="environment" className="px-6 py-3 rounded-full text-base font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path></svg>
                Environment
              </TabsTrigger>
              <TabsTrigger value="health" className="px-6 py-3 rounded-full text-base font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Heart className="h-5 w-5 mr-2" />
                Health
              </TabsTrigger>
              <TabsTrigger value="youth" className="px-6 py-3 rounded-full text-base font-semibold transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                Youth
              </TabsTrigger>
            </TabsList>

            {/* Community Tab Content */}
            <TabsContent value="community" className="mt-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Community Outreach</h3>
                  <p className="text-lg mb-6">
                    Our community programs bring people together through events, support services, and neighborhood initiatives that strengthen social bonds and improve quality of life.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mt-1">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Monthly Events</h4>
                        <p className="text-muted-foreground">Food drives, cultural celebrations, and educational workshops</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary mt-1">
                        <Handshake className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Support Services</h4>
                        <p className="text-muted-foreground">Emergency assistance and resource coordination</p>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/community-programs">Learn About Our Programs</Link>
                  </Button>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden border shadow-lg">
                  <Image
                    src="/images/community.png"
                    alt="Community members at an outdoor event"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Education Tab Content */}
            <TabsContent value="education" className="mt-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] rounded-xl overflow-hidden border shadow-lg order-2 md:order-1">
                  <Image
                    src="/images/education-program.webp"
                    alt="Students learning in a classroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Education Initiatives</h3>
                  <p className="text-lg mb-6">
                    We provide learning opportunities for all ages, from literacy programs to vocational training, helping community members gain skills for better futures.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>After-school tutoring programs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Adult education and GED preparation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <span>Digital literacy workshops</span>
                    </li>
                  </ul>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/education-programs">View Education Opportunities</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Environment Tab Content */}
            <TabsContent value="environment" className="mt-6">
              <div className="text-center py-12">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Environmental Programs Coming Soon</h3>
                  <p className="text-lg mb-6">
                    We're developing initiatives to promote sustainability and environmental awareness in our community.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/contact">Get Updates</Link>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Health Tab Content */}
            <TabsContent value="health" className="mt-6">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-primary">Health & Wellness Services</h3>
                  <p className="text-lg mb-6">
                    Our health initiatives provide access to medical care, mental health support, and wellness education for underserved populations.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="border rounded-lg p-4 text-center">
                      <Heart className="h-8 w-8 mx-auto text-primary mb-2" />
                      <p className="font-medium">Free Health Screenings</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mx-auto text-primary mb-2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                      <p className="font-medium">Mental Health Support</p>
                    </div>
                  </div>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/health-services">View Health Programs</Link>
                  </Button>
                </div>
                <div className="relative h-[400px] rounded-xl overflow-hidden border shadow-lg">
                  <Image
                    src="/images/health-services.jpg"
                    alt="Medical professional assisting patient"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Youth Tab Content */}
            <TabsContent value="youth" className="mt-6">
              <div className="text-center py-12">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Youth Development Programs</h3>
                  <p className="text-lg mb-6">
                    We empower young people through mentorship, skill-building activities, and leadership opportunities.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                      <Link href="/youth-programs">Learn More</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/volunteer">Become a Mentor</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-secondary/20 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-medium">
              Our Approach
            </span>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Comprehensive <span className="text-primary">Support Systems</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We employ multiple strategies to create meaningful, lasting change in people's lives.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Direct Services"
              description="Providing immediate assistance to individuals and families in need through our various programs."
              icon={<Heart className="h-8 w-8 text-primary" />}
              className="hover:shadow-lg transition-all border-0 bg-background"
            />
            <FeatureCard
              title="Education & Training"
              description="Offering workshops, classes, and resources to help people develop new skills and knowledge."
              icon={<BookOpen className="h-8 w-8 text-primary" />}
              className="hover:shadow-lg transition-all border-0 bg-background"
            />
            <FeatureCard
              title="Advocacy"
              description="Working to address systemic issues and create positive change at the community and policy levels."
              icon={<Award className="h-8 w-8 text-primary" />}
              className="hover:shadow-lg transition-all border-0 bg-background"
            />
            <FeatureCard
              title="Community Building"
              description="Creating opportunities for connection and collaboration to strengthen our community."
              icon={<Users className="h-8 w-8 text-primary" />}
              className="hover:shadow-lg transition-all border-0 bg-background"
            />
            <FeatureCard
              title="Resource Coordination"
              description="Connecting people with the services and support they need, both within our organization and beyond."
              icon={<Handshake className="h-8 w-8 text-primary" />}
              className="hover:shadow-lg transition-all border-0 bg-background"
            />
            <FeatureCard
              title="Volunteer Engagement"
              description="Engaging community members in meaningful service that makes a difference."
              icon={<Users className="h-8 w-8 text-primary" />}
              className="hover:shadow-lg transition-all border-0 bg-background"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-medium">
              Impact Stories
            </span>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Service <span className="text-primary">Highlights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our programs are making a real difference in people's lives.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ReusableCarousel
              variant="story"
              height="h-[500px]"
              items={seviceData}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you need support or want to join our mission, we're here to help you take the next step.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="font-medium shadow-lg">
                <Link href="/contact">Get Help</Link>
              </Button>
              <Button asChild size="lg" className="font-medium bg-white text-primary hover:bg-primary hover:text-white border-2 border-white shadow-lg transition-colors">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}