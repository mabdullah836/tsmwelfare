"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailIcon } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setAlert({
        message: "Please enter your email address",
        type: "error"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to subscribe to newsletter")
      }

      setIsSubmitted(true)
      setEmail("")
      setAlert({
        message: "Thank you for subscribing to our newsletter!",
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to subscribe. Please try again later.",
        type: "error"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-20 bg-secondary">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in Touch</h2>
          <p className="text-lg text-muted-foreground">
            Get updates about our work and upcoming events. We'll only send you the important stuff, we promise!
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-primary/10 text-primary p-6 rounded-lg text-center max-w-md mx-auto">
            <MailIcon className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Thanks for Signing Up!</h3>
            <p>We'll keep you updated on all the good work we're doing together.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
        )}

        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
      </div>
    </section>
  )
}
