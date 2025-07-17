import React from 'react'
import { Typewriter } from '../shared/typewriter'
import { Button } from '../ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { CustomImage } from '../shared/custom-image'
import Link from "next/link"

export const HeroSection = () => {
  return (
    <section className="relative  py-16 md:py-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-indigo-300/30 blur-3xl animate-float-delay"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left side - Text Content */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="space-y-6">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Transforming Lives</span> Through Community Support
              </h1>

              <div className="text-xl md:text-2xl font-medium text-gray-600">
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

              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
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

          {/* Right side - Hero Image */}
          <div className="order-1 lg:order-2 relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] hidden sm:block">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <CustomImage
                src="/images/welfare-work-collage.jpeg" // Replace with high-quality modern image
                alt="Community members receiving support with smiles"
                className="h-full w-full object-cover object-center"
                priority
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-gray-900/10"></div> */}
            </div>
            
          </div>

          {/* Mobile image */}
          <div className="order-1 lg:order-2 sm:hidden relative h-[300px] rounded-2xl overflow-hidden shadow-lg">
            <CustomImage
              src="/images/community-hero-mobile.jpg" // Mobile-optimized version
              alt="Our community support work"
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}