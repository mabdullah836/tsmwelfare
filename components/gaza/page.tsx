"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartIcon, HandHeartIcon, FlameIcon, CrosshairIcon, AlertTriangleIcon } from "lucide-react"
import { CustomImage } from "../shared/custom-image"
import { Button } from "../ui/button"

// Simple fadeIn animation variant
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function GazaPage() {
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-1/4 w-24 h-24 rounded-full bg-red-300 blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full bg-amber-300 blur-xl"></div>
      </div>

      <section className="py-16 md:py-24 bg-gradient-to-b from-red-50 to-amber-50 dark:from-red-950/30 dark:to-amber-950/20 relative z-10">
        <div className="container">
          {/* Hero Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <HandHeartIcon className="h-10 w-10 text-red-600 mr-3" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-800 to-amber-800 dark:from-red-300 dark:to-amber-300 bg-clip-text text-transparent">
                Emergency Support for Gaza
              </h2>
            </div>
            <p className="text-xl text-red-700 dark:text-red-300 mb-8 leading-relaxed">
              Our brothers and sisters in Gaza are facing unprecedented suffering.
              Your urgent support can provide life-saving aid to families under siege.
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-medium shadow-lg hover:shadow-red-300/50 dark:hover:shadow-red-900/30 transition-all"
              asChild
            >
              <a href="/donate" className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5" />
                Donate Now to Save Lives
              </a>
            </Button>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="border-red-200 dark:border-red-800 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-red-800 dark:text-red-200 flex items-center gap-3">
                    <FlameIcon className="h-6 w-6 text-red-600" />
                    Our Gaza Relief Efforts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    "Providing emergency food packages to starving families",
                    "Delivering medical supplies to overwhelmed hospitals",
                    "Supporting orphaned children with essential care",
                    "Distributing clean water in devastated areas"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-2 w-2 rounded-full bg-red-600 mt-3"></div>
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-start gap-4">
                  <AlertTriangleIcon className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Urgent Need</h4>
                    <p className="text-red-700 dark:text-red-300">
                      Over 2 million people are without adequate food, water or medical care.
                      Your donation today can literally save lives tomorrow.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Images */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
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
          </div>

          {/* Donation Impact Section */}
          {/* Emergency Aid Packages Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-red-100 to-amber-50 dark:from-red-900/30 dark:to-amber-900/20 border-red-200 dark:border-red-800 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4 flex justify-center items-center gap-3">
                    <CrosshairIcon className="h-6 w-6" />
                    Emergency Survival Packages
                  </h3>
                  <p className="text-xl text-red-700 dark:text-red-300 mb-8 max-w-3xl mx-auto">
                    Current prices in Gaza have reached catastrophic levels. Here's what's needed:
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Left Column - Basic Survival */}
                    <div className="space-y-6">
                      <h4 className="font-bold text-lg text-red-800 dark:text-red-200 border-b pb-2">
                        Basic Survival (1 Family)
                      </h4>
                      {[
                        { item: "1 Week Food Supply", cost: "Rs. 50,000" },
                        { item: "Clean Water (1 Week)", cost: "Rs. 75,000" },
                        { item: "Emergency Medicine Kit", cost: "Rs. 30,000" },
                        { item: "Blankets & Warm Clothes", cost: "Rs. 25,000" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b pb-2">
                          <span>{item.item}</span>
                          <span className="font-bold text-red-600 dark:text-red-300">{item.cost}</span>
                        </div>
                      ))}
                      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                        <p className="font-bold">Total for Basic Survival Package: <span className="text-red-600 dark:text-red-300">Rs. 180,000</span></p>
                      </div>
                    </div>

                    {/* Right Column - Community Support */}
                    <div className="space-y-6">
                      <h4 className="font-bold text-lg text-red-800 dark:text-red-200 border-b pb-2">
                        Community Support
                      </h4>
                      {[
                        { item: "Water Truck (10,000 liters)", cost: "Rs. 150,000" },
                        { item: "Food for 50 Families (1 Week)", cost: "Rs. 250,000" },
                        { item: "Field Hospital Supplies", cost: "Rs. 500,000" },
                        { item: "Rebuild Destroyed Home", cost: "Rs. 350,000" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between border-b pb-2">
                          <span>{item.item}</span>
                          <span className="font-bold text-red-600 dark:text-red-300">{item.cost}</span>
                        </div>
                      ))}
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <p>Any amount helps - we combine donations to fund these larger projects</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-red-900/40 p-6 rounded-lg border border-red-200 dark:border-red-700 max-w-2xl mx-auto">
                    <h4 className="font-bold text-lg text-red-800 dark:text-red-200 mb-3">How Your Donation Helps</h4>
                    <div className="space-y-3 text-sm">
                      <p>• Rs. 10,000 provides emergency flour for baking bread</p>
                      <p>• Rs. 25,000 buys clean drinking water for a family for 2 weeks</p>
                      <p>• Rs. 50,000 covers emergency medical treatment for an injured child</p>
                      <p>• Rs. 100,000+ helps fund fuel for hospital generators</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}