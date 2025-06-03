import React from 'react'
import { Typewriter } from '../shared/typewriter'
import { Button } from '../ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { CustomImage } from '../shared/custom-image'

export const HeroSection = () => {
  return (
     <section className="bg-background py-12 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px]">
            {/* Left side - Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Bringing <span className="text-primary">Hope</span> and{" "}
                  <span className="text-primary">Help</span> to Local
                  Communities
                </h1>

                <div className="text-xl md:text-2xl font-semibold">
                  <span className="text-muted-foreground">
                    We are dedicated to providing{" "}
                  </span>
                  <span className="text-blue-600">
                    <Typewriter
                      words={[
                        "free medical care for families",
                        "food for hungry children",
                        "education for every child",
                        "financial help to needy families",
                        "hope for a better tomorrow",
                      ]}
                      typingSpeed={80}
                      deletingSpeed={40}
                      delayBetweenWords={2000}
                    />
                  </span>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  For over a decade, we have been working directly with
                  communities, reaching families in remote areas and providing
                  essential services that make a real difference in people's
                  daily lives.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium">
                  <a href="/services">See Our Work</a>
                </Button>
                <Button variant="outline" size="lg" className="font-medium">
                  <a href="/donate" className="flex items-center gap-2">
                    Join Our Mission
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right side - Real Work Images - shown on medium and large screens */}
            <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] hidden sm:block">
              <CustomImage
                src="/images/welfare-work-collage.jpeg"
                alt="Our welfare work in action - medical care, food distribution, and community support"
                badgeText="Real work, Real impact"
                className="h-full"
              />
            </div>

            {/* Mobile-only simplified image - shown only on small screens */}
            <div className="order-1 lg:order-2 sm:hidden">
              <CustomImage
                src="/images/welfare-work-collage.jpeg"
                alt="Our community welfare work"
                className="h-[300px]"
                badgeText="Making a difference every day"
              />
            </div>
          </div>
        </div>
      </section>

  )
}
