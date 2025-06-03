"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
  className?: string
}

export function Typewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 1500,
  className,
}: TypewriterProps) {
  const [text, setText] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[wordIndex]

    const handleTyping = () => {
      setText(currentWord.substring(0, isDeleting ? text.length - 1 : text.length + 1))

      if (!isDeleting && text === currentWord) {
        // Start deleting after delay
        setTimeout(() => setIsDeleting(true), delayBetweenWords)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    const typingInterval = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(typingInterval)
  }, [words, wordIndex, isDeleting, text, typingSpeed, deletingSpeed, delayBetweenWords])

  return (
    <span className={cn("inline-block", className)}>
      {text}
      <span className="animate-pulse ml-1">|</span>
    </span>
  )
}
