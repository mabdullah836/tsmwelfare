"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DonationCounter() {
  const [progress, setProgress] = useState(0)
  const goal = 100000
  const current = 65000

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((current / goal) * 100)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container max-w-4xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Help Us Reach Our Goal
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're trying to raise money to help 50 kids go to school this year. We're almost there!
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <div className="mb-2 flex justify-between text-base font-medium">
              <span className="text-primary">Rs. {current.toLocaleString()} raised</span>
              <span className="text-primary">Goal: Rs. {goal.toLocaleString()}</span>
            </div>
            
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-lg">
                We've raised <span className="font-bold text-primary">{Math.round(progress)}%</span> of our goal!
              </div>
              
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/donate" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  Donate Now
                </Link>
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Your donation, no matter how small, makes a real difference in children's lives.
          </p>
        </div>
      </div>
    </section>
  )
}