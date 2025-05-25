import Image from "next/image"
import { Typewriter } from "@/components/typewriter"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Calendar, Users, Heart, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About Our Organization</h1>
            <p className="text-xl text-white/90">
              We are dedicated to{" "}
              <Typewriter
                words={["empowering communities", "creating change", "building futures", "inspiring hope"]}
                className="text-secondary-foreground font-medium"
              />
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4">
                Founded in 1998, our organization began with a simple mission: to make a positive difference in our
                community. What started as a small group of dedicated volunteers has grown into a thriving organization
                with a significant impact.
              </p>
              <p className="text-lg mb-4">
                Over the years, we've expanded our programs and services to address the evolving needs of our community.
                Through partnerships with local businesses, government agencies, and other nonprofits, we've been able
                to reach more people and create lasting change.
              </p>
              <p className="text-lg">
                Today, we continue to be guided by our founding principles of compassion, integrity, and innovation as
                we work to build a better future for all.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Our+Journey"
                alt="Our organization's journey"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <div className="bg-white/90 text-black px-3 py-1 rounded text-sm font-medium">25+ Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Compassion",
                description:
                  "We approach our work with empathy and understanding, recognizing the dignity of all people.",
                icon: <Heart className="h-8 w-8" />,
              },
              {
                title: "Integrity",
                description: "We are committed to transparency, accountability, and ethical practices in all we do.",
                icon: <Award className="h-8 w-8" />,
              },
              {
                title: "Innovation",
                description:
                  "We embrace creative solutions and new approaches to address complex community challenges.",
                icon: <Lightbulb className="h-8 w-8" />,
              },
              {
                title: "Collaboration",
                description: "We believe in the power of partnerships to create meaningful and lasting change.",
                icon: <Users className="h-8 w-8" />,
              },
            ].map((value, index) => (
              <Card key={index} className="feature-card">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p>{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Muhammad Tariq",
                role: "Executive Director",
                bio: "Muhammad has over 15 years of experience in nonprofit leadership and is passionate about community development.",
              },
              {
                name: "Fatima Sheikh",
                role: "Program Director",
                bio: "Fatima oversees our programs and ensures they effectively meet the needs of those we serve.",
              },
              {
                name: "Ahmed Hassan",
                role: "Volunteer Coordinator",
                bio: "Ahmed manages our volunteer program and helps connect passionate individuals with meaningful opportunities.",
              },
              {
                name: "Aisha Khan",
                role: "Development Director",
                bio: "Aisha leads our fundraising efforts and builds relationships with donors and supporters.",
              },
              {
                name: "Omar Ali",
                role: "Community Outreach Manager",
                bio: "Omar works directly with community members to understand their needs and connect them with resources.",
              },
              {
                name: "Zainab Malik",
                role: "Finance Manager",
                bio: "Zainab ensures our organization maintains financial integrity and makes the most of our resources.",
              },
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-muted relative">
                  <Image
                    src={`/placeholder.svg?height=200&width=300&text=${member.name.split(" ")[0]}`}
                    alt={member.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Timeline</h2>
          <div className="space-y-12">
            {[
              {
                year: "1998",
                title: "Foundation",
                description:
                  "Our organization was founded by a group of community members committed to making a difference.",
              },
              {
                year: "2005",
                title: "Expansion of Services",
                description: "We expanded our programs to include education initiatives and youth development.",
              },
              {
                year: "2010",
                title: "New Headquarters",
                description: "We moved to a larger facility to accommodate our growing team and programs.",
              },
              {
                year: "2015",
                title: "Community Partnership Award",
                description: "We were recognized for our collaborative approach to addressing community needs.",
              },
              {
                year: "2020",
                title: "Virtual Programs Launch",
                description: "We adapted to changing times by developing innovative virtual programs and services.",
              },
              {
                year: "Today",
                title: "Continuing Our Mission",
                description:
                  "We continue to grow and evolve, always focused on creating positive change in our community.",
              },
            ].map((event, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-none">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-primary">{event.year}</span>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
