import Image from "next/image"
import { Carousel } from "@/components/carousel"
import { Typewriter } from "@/components/typewriter"
import { FeatureCard } from "@/components/feature-card"
import { Button } from "@/components/ui/button"
import { Heart, Users, BookOpen, Handshake } from "lucide-react"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { DonationCounter } from "@/components/donation-counter"
import { UpcomingEvents } from "@/components/upcoming-events"

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4">
              Guiding towards{" "}
              <Typewriter
                words={["Compassion", "Service", "Community", "The Straight Path"]}
                className="text-secondary-foreground font-bold"
              />
            </h1>
            <p className="text-xl text-white/90 mb-8 text-balance">
              The Sirat-e-Mustaqeem Welfare Trust is dedicated to serving humanity through compassion, education, and
              community support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-medium">
                <a href="/services">Our Services</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-medium"
              >
                <a href="/donate">Donate Now</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              Discover how we're making a difference through our key initiatives.
            </p>
          </div>

          <div className="card-grid">
            <FeatureCard
              title="Community Support"
              description="Providing essential services and support to those in need within our community."
              icon={<Heart className="h-6 w-6" />}
            />
            <FeatureCard
              title="Education Programs"
              description="Empowering individuals through knowledge and skills development programs."
              icon={<BookOpen className="h-6 w-6" />}
            />
            <FeatureCard
              title="Orphan Care"
              description="Supporting orphans with shelter, education, and emotional care."
              icon={<Heart className="h-6 w-6" />}
            />
            <FeatureCard
              title="Healthcare Services"
              description="Providing medical assistance and healthcare services to underserved communities."
              icon={<Heart className="h-6 w-6" />}
            />
            <FeatureCard
              title="Youth Development"
              description="Nurturing the next generation through mentorship and leadership programs."
              icon={<Users className="h-6 w-6" />}
            />
            <FeatureCard
              title="Ramadan & Eid Programs"
              description="Special initiatives during Ramadan and Eid to support families in need."
              icon={<Handshake className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Success Stories</h2>
            <p className="text-lg text-muted-foreground">Hear from those whose lives have been impacted by our work.</p>
          </div>

          <Carousel
            className="h-[400px] max-w-4xl mx-auto"
            items={[
              <div key="1" className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 rounded-full overflow-hidden w-20 h-20 mx-auto">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Testimonial"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-xl italic mb-4">
                  "The support I received from The Sirat-e-Mustaqeem Welfare Trust changed my life. Their education
                  program helped me complete my studies and find employment."
                </blockquote>
                <cite className="not-italic font-medium">— Ahmed, Education Program Beneficiary</cite>
              </div>,
              <div key="2" className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 rounded-full overflow-hidden w-20 h-20 mx-auto">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Testimonial"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-xl italic mb-4">
                  "Volunteering with The Sirat-e-Mustaqeem Welfare Trust has been one of the most rewarding experiences
                  of my life. The impact we make is truly meaningful."
                </blockquote>
                <cite className="not-italic font-medium">— Fatima, Volunteer</cite>
              </div>,
              <div key="3" className="h-full flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-6 rounded-full overflow-hidden w-20 h-20 mx-auto">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Testimonial"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-xl italic mb-4">
                  "The medical camp organized by The Sirat-e-Mustaqeem Welfare Trust provided essential healthcare
                  services to our entire village. We are grateful for their dedication."
                </blockquote>
                <cite className="not-italic font-medium">— Malik, Community Member</cite>
              </div>,
            ]}
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Impact</h2>
            <p className="text-lg text-muted-foreground">
              The numbers that showcase our commitment to making a difference.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5K+", label: "People Helped" },
              { value: "25+", label: "Communities Served" },
              { value: "100+", label: "Volunteers" },
              { value: "10+", label: "Years of Service" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DonationCounter />

      <UpcomingEvents />

      <section className="section-padding bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Current Projects</h2>
              <p className="text-lg mb-6">
                We're currently focused on several key initiatives to help our community. Your support can make a
                significant difference in these projects:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Education Scholarship Program</h3>
                    <p>Providing educational opportunities for underprivileged children.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Clean Water Initiative</h3>
                    <p>Installing water filtration systems in areas with limited access to clean water.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Medical Assistance Program</h3>
                    <p>Providing medical care and supplies to those who cannot afford it.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild>
                  <a href="/projects">View All Projects</a>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our current projects"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Join Our Mission</h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Together, we can create meaningful change. Donate, volunteer, or spread the word about our cause.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="font-medium">
                <a href="/donate">Donate Now</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 font-medium"
              >
                <a href="/volunteer">Become a Volunteer</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
