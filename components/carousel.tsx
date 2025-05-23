"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CarouselProps {
  items: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  className?: string
}

export function Carousel({ items, autoPlay = true, interval = 5000, className }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }, [items.length])

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    if (!isAutoPlaying) return

    const intervalId = setInterval(() => {
      next()
    }, interval)

    return () => clearInterval(intervalId)
  }, [isAutoPlaying, interval, next])

  const handleMouseEnter = () => {
    if (autoPlay) setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    if (autoPlay) setIsAutoPlaying(true)
  }

  return (
    <div
      className={cn("carousel-container relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => (
        <div key={index} className={cn("carousel-item", index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0")}>
          {item}
        </div>
      ))}

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={prev}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
        onClick={next}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "bg-primary w-4" : "bg-primary/30",
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
