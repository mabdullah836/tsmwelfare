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
                Founded in 2016, The Sirat-e-Mustaqeem Welfare Trust began with a simple mission: to guide people towards the straight path through service to humanity. What started as a small group of dedicated volunteers has grown into a thriving organization with a significant impact across communities.
              </p>
              <p className="text-lg mb-4">
                For over {new Date().getFullYear() - 2016} years, we've been committed to serving the needy and underprivileged. Through our various departments including healthcare, education, food distribution, and marriage support for orphans, we've touched thousands of lives.
              </p>
              <p className="text-lg">
                Today, The Sirat-e-Mustaqeem Welfare Trust continues to be guided by our founding principles of compassion, integrity, and Islamic values as we work to build a better future for all.
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
                <div className="bg-white/90 text-black px-3 py-1 rounded text-sm font-medium">{new Date().getFullYear() - 2016}+ Years of Service</div>
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
                year: "2016",
                title: "Foundation",
                description:
                  "The Sirat-e-Mustaqeem Welfare Trust was founded with a mission to serve humanity and guide people towards the straight path.",
              },
              {
                year: "2018",
                title: "Expansion of Services",
                description: "We expanded our programs to include education initiatives, healthcare services, and food distribution programs.",
              },
              {
                year: "2020",
                title: "COVID-19 Response",
                description: "During the pandemic, we launched emergency relief programs to support affected families with food and medical assistance.",
              },
              {
                year: "2021",
                title: "Education Initiative",
                description: "Started comprehensive education support program for underprivileged children including school fees, books, and uniforms.",
              },
              {
                year: "2022",
                title: "Flood Relief Efforts",
                description: "Provided emergency relief and support to flood-affected communities in Sindh and Balochistan, including food, shelter, and medical assistance.",
              },
              {
                year: "2023",
                title: "Healthcare Program Enhancement",
                description: "Expanded our medical camps and healthcare services to reach more remote areas and serve more people in need.",
              },
              {
                year: "2023",
                title: "Gaza Palestine Support",
                description: "Extended humanitarian aid to the people of Gaza, Palestine during their time of crisis, providing essential supplies and emergency relief.",
              },
              {
                year: "Today",
                title: "Continuing Our Mission",
                description:
                  "We continue to grow and evolve, focusing on sustainable development and long-term support for our communities.",
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