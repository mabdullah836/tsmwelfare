"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
    <section className="py-12 bg-primary/5">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Help Us Reach Our Goal</h2>
          <p className="text-lg text-muted-foreground mb-6">
            We're trying to raise money to help 50 kids go to school this year. We're almost there!
          </p>

          <div className="mb-2 flex justify-between text-sm font-medium">
            <span>Rs. {current.toLocaleString()} raised</span>
            <span>Goal: Rs. {goal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="mb-6">
            We've raised <span className="font-bold text-primary">{Math.round(progress)}%</span> of what we need. Your
            donation, no matter how small, makes a real difference!
          </p>

          <Button asChild size="lg">
            <a href="/donate">Help Us Today</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
