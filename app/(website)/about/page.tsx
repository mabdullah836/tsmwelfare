import Image from "next/image"
import { Typewriter } from "@/components/shared/typewriter"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Heart, Lightbulb } from "lucide-react"

import { PageHeader } from "@/components/page-header"
import TeamGrid from "./TeamGrid"

export const metadata = {
  title: "About Us | Sirat-e-Mustaqeem Welfare Trust | Charity in Pakistan",
  description:
    "Learn about Sirat-e-Mustaqeem Welfare Trust, a non-profit organization in Pakistan dedicated to empowering communities through education, healthcare, food distribution, and social welfare initiatives.",
  keywords: [
    "welfare trust",
    "charity in Pakistan",
    "non-profit organization",
    "community service",
    "about welfare trust"
  ]
};

export default async function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sirat-e-Mustaqeem Welfare Trust",
            "url": "https://www.smwelfare.org/",
            "logo": "/images/smw-logo-transparent.png",
            "description": "A non-profit organization in Pakistan dedicated to community service, education, healthcare, and food distribution.",
            "sameAs": [
              "https://www.facebook.com/smwelfare/"
            ]
          })
        }}
      />
      <PageHeader title="About Our Organization">
        <p className="text-xl text-white/90">
          We are dedicated to{" "}
          <Typewriter
            words={[
              "empowering communities",
              "creating change",
              "building futures",
              "inspiring hope",
            ]}
            className="text-secondary-foreground font-medium"
          />
        </p>
      </PageHeader>

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

      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <TeamGrid />
        </div>
      </section>

    </>
  )
}