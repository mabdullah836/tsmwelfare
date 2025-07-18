"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailIcon } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/ui/form-input';

export function NewsletterSignup() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<{ email: string }>();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      })

      if (!response.ok) {
        // Try to get error message from API
        const res = await response.json().catch(() => null);
        throw new Error(res?.message || "Failed to subscribe to newsletter");
      }

      setIsSubmitted(true);
      reset();
      setAlert({
        message: "Thank you for subscribing to our newsletter!",
        type: "success"
      });
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to subscribe. Please try again later.",
        type: "error"
      });
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="flex-1"
              aria-invalid={!!errors.email}
              aria-describedby="newsletter-email-error"
            />
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">Subscribe</Button>
          </form>
        )}
        {errors.email && (
          <AlertMessage
            message={errors.email.message as string}
            type="error"
            onClose={() => {}}
          />
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
  );
}
