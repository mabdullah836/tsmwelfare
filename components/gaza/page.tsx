"use client"

import { memo, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartIcon, HandHeartIcon, FlameIcon, CrosshairIcon, AlertTriangleIcon } from "lucide-react"
import { CustomImage } from "../shared/custom-image"
import { Button } from "../ui/button"

// Optimized animation variants - memoized to prevent recreation
const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }
} as const

// Static data moved outside component to prevent recreation
const SURVIVAL_ITEMS = [
  { item: "1 Week Food Supply", cost: "Rs. 50,000" },
  { item: "Clean Water (1 Week)", cost: "Rs. 75,000" },
  { item: "Emergency Medicine Kit", cost: "Rs. 30,000" },
  { item: "Blankets & Warm Clothes", cost: "Rs. 25,000" }
] as const

const COMMUNITY_ITEMS = [
  { item: "Water Truck (10,000 liters)", cost: "Rs. 150,000" },
  { item: "Food for 50 Families (1 Week)", cost: "Rs. 250,000" },
  { item: "Field Hospital Supplies", cost: "Rs. 500,000" },
  { item: "Rebuild Destroyed Home", cost: "Rs. 350,000" }
] as const

const RELIEF_EFFORTS = [
  "Providing emergency food packages to starving families",
  "Delivering medical supplies to overwhelmed hospitals",
  "Supporting orphaned children with essential care",
  "Distributing clean water in devastated areas"
] as const

const DONATION_IMPACT = [
  "Rs. 10,000 provides emergency flour for baking bread",
  "Rs. 25,000 buys clean drinking water for a family for 2 weeks",
  "Rs. 50,000 covers emergency medical treatment for an injured child",
  "Rs. 100,000+ helps fund fuel for hospital generators"
] as const

// Memoized sub-components for better performance
const HeroSection = memo(() => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={ANIMATION_VARIANTS.fadeIn}
    className="text-center max-w-4xl mx-auto mb-16"
  >
    <div className="flex items-center justify-center mb-6">
      <HandHeartIcon className="h-10 w-10 text-red-600 mr-3" />
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-800 to-amber-800 dark:from-red-300 dark:to-amber-300 bg-clip-text text-transparent">
        Emergency Support for Gaza
      </h1>
    </div>
    <p className="text-xl text-red-700 dark:text-red-300 mb-8 leading-relaxed">
      Our brothers and sisters in Gaza are facing unprecedented suffering.
      Your urgent support can provide life-saving aid to families under siege.
    </p>

    <Button
      size="lg"
      className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-medium shadow-lg hover:shadow-red-300/50 dark:hover:shadow-red-900/30 transition-all duration-300"
      asChild
    >
      <a href="/donate" className="flex items-center gap-2">
        <HeartIcon className="w-5 h-5" />
        Donate Now to Save Lives
      </a>
    </Button>
  </motion.div>
))
HeroSection.displayName = "HeroSection"

const ReliefEffortsCard = memo(() => (
  <Card className="border-red-200 dark:border-red-800 shadow-sm hover:shadow-md transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="text-2xl text-red-800 dark:text-red-200 flex items-center gap-3">
        <FlameIcon className="h-6 w-6 text-red-600" />
        Our Gaza Relief Efforts
      </CardTitle>
    </CardHeader>
    <CardContent>
      <motion.ul 
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {RELIEF_EFFORTS.map((item, index) => (
          <motion.li key={index} variants={ANIMATION_VARIANTS.staggerItem} className="flex items-start gap-4">
            <div className="flex-shrink-0 h-2 w-2 rounded-full bg-red-600 mt-3" />
            <p className="text-muted-foreground">{item}</p>
          </motion.li>
        ))}
      </motion.ul>
    </CardContent>
  </Card>
))
ReliefEffortsCard.displayName = "ReliefEffortsCard"

const UrgentNeedAlert = memo(() => (
  <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
    <div className="flex items-start gap-4">
      <AlertTriangleIcon className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
      <div>
        <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">Urgent Need</h3>
        <p className="text-red-700 dark:text-red-300">
          Over 2 million people are without adequate food, water or medical care.
          Your donation today can literally save lives tomorrow.
        </p>
      </div>
    </div>
  </div>
))
UrgentNeedAlert.displayName = "UrgentNeedAlert"

const ImageGallery = memo(() => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={ANIMATION_VARIANTS.fadeIn}
    transition={{ delay: 0.4 }}
    className="space-y-6"
  >
    <CustomImage
      src="/images/gaza-appeal.jpeg"
      alt="Gaza Palestine Emergency Appeal - Send Aid to Gaza & Save Lives Today"
      className="h-[300px] rounded-lg shadow-lg"
      overlay={false}
    />
    <div className="grid grid-cols-2 gap-6">
      <CustomImage
        src="/images/gaza-solidarity.jpeg"
        alt="Palestine solidarity with Al-Aqsa Mosque and Palestinian flags"
        className="h-[150px] rounded-lg shadow"
        overlay={false}
      />
      <CustomImage
        src="/images/gaza-child.jpeg"
        alt="Child in Gaza receiving food aid - showing the urgent humanitarian need"
        className="h-[150px] rounded-lg shadow"
        overlay={false}
      />
    </div>
  </motion.div>
))
ImageGallery.displayName = "ImageGallery"

interface PriceItemProps {
  item: string
  cost: string
}

const PriceItem = memo(({ item, cost }: PriceItemProps) => (
  <div className="flex justify-between border-b pb-2 last:border-b-0">
    <span className="text-sm md:text-base">{item}</span>
    <span className="font-bold text-red-600 dark:text-red-300 text-sm md:text-base">{cost}</span>
  </div>
))
PriceItem.displayName = "PriceItem"

const EmergencyPackagesSection = memo(() => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={ANIMATION_VARIANTS.fadeIn}
    transition={{ delay: 0.6 }}
  >
    <Card className="bg-gradient-to-r from-red-100 to-amber-50 dark:from-red-900/30 dark:to-amber-900/20 border-red-200 dark:border-red-800 shadow-lg">
      <CardContent className="p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-red-800 dark:text-red-200 mb-4 flex justify-center items-center gap-3">
            <CrosshairIcon className="h-6 w-6" />
            Emergency Survival Packages
          </h2>
          <p className="text-lg md:text-xl text-red-700 dark:text-red-300 mb-8 max-w-3xl mx-auto">
            Current prices in Gaza have reached catastrophic levels. Here's what's needed:
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Basic Survival Package */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-red-800 dark:text-red-200 border-b pb-2">
                Basic Survival (1 Family)
              </h3>
              <div className="space-y-3">
                {SURVIVAL_ITEMS.map((item, idx) => (
                  <PriceItem key={`survival-${idx}`} item={item.item} cost={item.cost} />
                ))}
              </div>
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                <p className="font-bold text-sm md:text-base">
                  Total for Basic Survival Package: <span className="text-red-600 dark:text-red-300">Rs. 180,000</span>
                </p>
              </div>
            </div>

            {/* Community Support Package */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-red-800 dark:text-red-200 border-b pb-2">
                Community Support
              </h3>
              <div className="space-y-3">
                {COMMUNITY_ITEMS.map((item, idx) => (
                  <PriceItem key={`community-${idx}`} item={item.item} cost={item.cost} />
                ))}
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <p className="text-sm md:text-base">
                  Any amount helps - we combine donations to fund these larger projects
                </p>
              </div>
            </div>
          </div>

          {/* Donation Impact */}
          <div className="bg-white dark:bg-red-900/40 p-6 rounded-lg border border-red-200 dark:border-red-700 max-w-2xl mx-auto">
            <h3 className="font-bold text-lg text-red-800 dark:text-red-200 mb-3">How Your Donation Helps</h3>
            <div className="space-y-2 text-sm md:text-base">
              {DONATION_IMPACT.map((impact, idx) => (
                <p key={`impact-${idx}`}>• {impact}</p>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
))
EmergencyPackagesSection.displayName = "EmergencyPackagesSection"

function GazaPage() {
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-1/4 w-24 h-24 rounded-full bg-red-300 blur-xl" />
        <div className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full bg-amber-300 blur-xl" />
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-b from-red-50 to-amber-50 dark:from-red-950/30 dark:to-amber-950/20 relative z-10">
        <div className="container">
          {/* Hero Section */}
          <HeroSection />

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={ANIMATION_VARIANTS.fadeIn}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <ReliefEffortsCard />
              <UrgentNeedAlert />
            </motion.div>

            {/* Right Column - Images */}
            <ImageGallery />
          </div>

          {/* Emergency Packages Section */}
          <EmergencyPackagesSection />
        </div>
      </section>
    </div>
  )
}

// Memoize the main component to prevent unnecessary re-renders
export default memo(GazaPage)