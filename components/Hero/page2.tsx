import React from 'react'
import { Typewriter } from '../shared/typewriter'
import { Button } from '../ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import { CustomImage } from '../shared/custom-image'

// Array of images for the collage (desktop/tablet)
const collageImages = [
  [
    {
      src: '/images/welfare-work-1.jpg',
      alt: 'Volunteers distributing food to children',
      badgeText: 'Nutrition Support',
      className: 'h-[180px] sm:h-[220px] md:h-[240px]',
    },
    {
      src: '/images/welfare-work-2.jpg',
      alt: 'Doctor examining a child',
      badgeText: 'Medical Care',
      className: 'h-[180px] sm:h-[220px] md:h-[240px]',
    },
  ],
  [
    {
      src: '/images/welfare-work-3.jpg',
      alt: 'Community members learning in a workshop',
      badgeText: 'Education Programs',
      className: 'h-[220px] sm:h-[260px] md:h-[280px] mt-8',
    },
    {
      src: '/images/welfare-work-4.jpg',
      alt: 'Smiling child receiving school supplies',
      badgeText: 'Hope Delivered',
      className: 'h-[140px] sm:h-[180px] md:h-[200px]',
    },
  ],
]

export const HeroSection = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-indigo-300/30 blur-3xl animate-float-delay"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[600px]">
          {/* Left side - Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Transforming Lives</span> Through Community Support
              </h1>

              <div className="text-xl md:text-2xl font-medium text-muted-foreground">
                <span>We provide </span>
                <span className="text-primary font-semibold">
                  <Typewriter
                    words={[
                      "medical care for families in need",
                      "nutritious meals for children",
                      "education opportunities",
                      "financial assistance",
                      "hope for brighter futures"
                    ]}
                    typingSpeed={70}
                    deletingSpeed={40}
                    delayBetweenWords={2000}
                  />
                </span>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                For over a decade, we've delivered essential services directly to communities, reaching those in remote areas with life-changing support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium shadow-lg hover:shadow-primary/30 transition-all">
                <Link href="/services">Explore Our Impact</Link>
              </Button>
              <Button variant="outline" size="lg" className="font-medium group border-primary/30 hover:border-primary hover:bg-primary/5">
                <Link href="/donate" className="flex items-center gap-2">
                  Join Our Cause
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - Collage Image Section */}
          <div className="order-1 lg:order-2 hidden sm:grid grid-cols-2 gap-4 relative">
            {collageImages.map((col, colIdx) => (
              <div className={colIdx === 1 ? 'space-y-4 mt-8' : 'space-y-4'} key={colIdx}>
                {col.map((img) => (
                  <CustomImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    badgeText={img.badgeText}
                    className={`group-hover:shadow-xl transition-shadow duration-300 ${img.className}`}
                    priority
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Mobile - Single Image */}
          <div className="sm:hidden order-1 lg:order-2">
            <CustomImage
              src="/images/welfare-work-mobile.jpg"
              alt="Community members receiving support"
              className="h-[300px]"
              badgeText="Making a Difference"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}