"use client";
import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/shared/typewriter";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Heart, Lightbulb } from "lucide-react";
import TeamGrid from "./TeamGrid";
import { Counter } from "@/components/shared/counter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Optimized animation variants
const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  heroTitle: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  },
  heroSubtitle: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } }
  }
} as const

// Static data
const IMPACT_STATS = [
  { number: 5000, label: "Lives Impacted", plus: true },
  { number: 2016, label: "Founded In", plus: false },
  { number: 12, label: "Programs", plus: true },
  { number: 50, label: "Volunteers", plus: true }
] as const

const CORE_VALUES = [
  {
    title: "Compassion",
    description: "We approach our work with empathy and understanding, recognizing the dignity of all people.",
    icon: Heart,
    color: "text-red-500"
  },
  {
    title: "Integrity",
    description: "We are committed to transparency, accountability, and ethical practices in all we do.",
    icon: Award,
    color: "text-blue-500"
  },
  {
    title: "Innovation",
    description: "We embrace creative solutions and new approaches to address complex community challenges.",
    icon: Lightbulb,
    color: "text-yellow-500"
  },
  {
    title: "Collaboration",
    description: "We believe in the power of partnerships to create meaningful and lasting change.",
    icon: Users,
    color: "text-green-500"
  }
] as const

const TYPEWRITER_WORDS = [
  "empowering communities",
  "creating lasting change",
  "building brighter futures",
  "inspiring hope worldwide",
  "transforming lives"
]

// Schema markup component
const StructuredData = memo(() => (
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
        "sameAs": ["https://www.facebook.com/smwelfare/"]
      })
    }}
  />
))
StructuredData.displayName = "StructuredData"

// Hero Section Component
const HeroSection = memo(() => (
  <div className="relative h-[70vh] overflow-hidden">
    <Image
      src="/images/about-hero.webp"
      alt="Community helping hands"
      fill
      className="object-cover object-center"
      priority
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 flex items-center">
      <div className="container text-center">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.heroTitle}
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          style={{
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          Our Mission to{" "}
          <span className="bg-gradient-to-r from-primary via-amber-400 to-primary bg-clip-text text-transparent animate-pulse">
            Serve
          </span>
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.heroSubtitle}
          className="text-xl md:text-2xl lg:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed"
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)'
          }}
        >
          <span className="font-medium">We are dedicated to </span>
          <span className="inline-block drop-shadow-lg">
            <Typewriter
              words={TYPEWRITER_WORDS as string[]}
              className="bg-gradient-to-r from-primary via-amber-300 to-orange-400 bg-clip-text text-transparent font-bold tracking-wide drop-shadow-sm"
            />
          </span>
        </motion.div>
        
        {/* Enhanced subtitle with better visual hierarchy */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-6 font-light leading-relaxed"
          style={{
            textShadow: '0 1px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          Together, we build stronger communities through compassion and action
        </motion.p>
      </div>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/20 to-transparent" />
  </div>
))
HeroSection.displayName = "HeroSection"

// Impact Stats Section Component
const ImpactStatsSection = memo(() => (
  <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
    <div className="container">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.staggerContainer}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center"
      >
        {IMPACT_STATS.map((stat, index) => (
          <motion.div
            key={`stat-${index}`}
            variants={ANIMATION_VARIANTS.fadeIn}
            className="p-4 md:p-6 rounded-lg bg-white/10 backdrop-blur-sm"
          >
            <div className="text-3xl md:text-4xl font-bold mb-2">
              <Counter from={0} to={stat.number} duration={2} />
              {stat.plus && "+"}
            </div>
            <div className="text-sm md:text-lg">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
))
ImpactStatsSection.displayName = "ImpactStatsSection"

// Our Story Section Component
const OurStorySection = memo(() => {
  const currentYear = new Date().getFullYear()
  const yearsOfService = currentYear - 2016
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={ANIMATION_VARIANTS.fadeIn}
          >
            <div className="text-primary font-semibold mb-2">OUR JOURNEY</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              Founded in 2016, The Sirat-e-Mustaqeem Welfare Trust began with a simple mission: to guide people towards the straight path through service to humanity. What started as a small group of dedicated volunteers has grown into a thriving organization with a significant impact across communities.
            </p>
            <p className="text-lg mb-4">
              For over {yearsOfService} years, we've been committed to serving the needy and underprivileged. Through our various departments including healthcare, education, food distribution, and marriage support for orphans, we've touched thousands of lives.
            </p>
            <p className="text-lg mb-8">
              Today, The Sirat-e-Mustaqeem Welfare Trust continues to be guided by our founding principles of compassion, integrity, and Islamic values as we work to build a better future for all.
            </p>
            <Button variant="outline" size="lg">Learn More About Our Work</Button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          >
            <Image
              src="/images/our-story.jpg"
              alt="Our organization's journey"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <div className="bg-white/90 text-black px-4 py-2 rounded-lg text-lg font-bold shadow-md">
                {yearsOfService}+ Years of Service
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
OurStorySection.displayName = "OurStorySection"

export default function AboutClient() {
  return (
    <>
      <StructuredData />
      <HeroSection />
      <ImpactStatsSection />
      <OurStorySection />
      <CoreValuesSection />
      <TeamSection />
      <CTASection />
    </>
  )
}

// Core Values Section Component
const CoreValuesSection = memo(() => (
  <section className="py-16 bg-gradient-to-br from-muted to-background">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.staggerContainer}
        className="text-center mb-16"
      >
        <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="text-primary font-semibold mb-2">WHAT GUIDES US</motion.div>
        <motion.h2 variants={ANIMATION_VARIANTS.fadeIn} className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</motion.h2>
        <motion.p variants={ANIMATION_VARIANTS.fadeIn} className="text-lg max-w-2xl mx-auto">
          These principles shape every decision we make and every action we take
        </motion.p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {CORE_VALUES.map((value, index) => {
          const IconComponent = value.icon
          return (
            <motion.div
              key={`value-${index}`}
              variants={ANIMATION_VARIANTS.fadeIn}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary">
                <CardContent className="p-6 md:p-8">
                  <div className={`h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/10 flex items-center justify-center ${value.color} mb-6`}>
                    <IconComponent className="h-6 w-6 md:h-8 md:w-8" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  </section>
))
CoreValuesSection.displayName = "CoreValuesSection"

// Team Section Component
const TeamSection = memo(() => (
  <section className="py-16 bg-background">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.staggerContainer}
        className="text-center mb-16"
      >
        <motion.div variants={ANIMATION_VARIANTS.fadeIn} className="text-primary font-semibold mb-2">OUR PEOPLE</motion.div>
        <motion.h2 variants={ANIMATION_VARIANTS.fadeIn} className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</motion.h2>
        <motion.p variants={ANIMATION_VARIANTS.fadeIn} className="text-lg max-w-2xl mx-auto">
          Dedicated individuals working together to make a difference
        </motion.p>
      </motion.div>
      <TeamGrid />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <Link href="/volunteer">
          <Button size="lg">Join Our Team</Button>
        </Link>
      </motion.div>
    </div>
  </section>
))
TeamSection.displayName = "TeamSection"

// CTA Section Component
const CTASection = memo(() => (
  <section className="py-16 bg-primary text-white">
    <div className="container text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg md:text-xl mb-8">
          Whether you want to volunteer, donate, or partner with us, we'd love to hear from you. Together, we can create lasting change.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="secondary" size="lg">Donate Now</Button>
          <Button variant="secondary" size="lg">Contact Us</Button>
        </div>
      </motion.div>
    </div>
  </section>
))
CTASection.displayName = "CTASection"
 