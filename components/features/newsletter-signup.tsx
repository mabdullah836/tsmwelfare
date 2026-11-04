"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MailIcon } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"
import { useForm } from 'react-hook-form';

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
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border bg-muted/60 px-6 py-10 sm:px-12 sm:py-14">
          <div aria-hidden className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_right,black_20%,transparent_70%)]" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow mb-4">
                <MailIcon className="h-3.5 w-3.5" aria-hidden /> Newsletter
              </p>
              <h2 className="text-3xl leading-tight sm:text-4xl">Stay in touch</h2>
              <p className="mt-3 text-muted-foreground">
                Get updates about our work and upcoming events. We&apos;ll only send you the important stuff, we promise!
              </p>
            </div>

            {isSubmitted ? (
              <div className="rounded-2xl border bg-card p-6 text-center" role="status">
                <MailIcon className="mx-auto mb-3 h-10 w-10 text-primary" aria-hidden />
                <h3 className="text-lg font-bold">Thanks for signing up!</h3>
                <p className="mt-1 text-sm text-muted-foreground">We&apos;ll keep you updated on all the good work we&apos;re doing together.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-3 sm:flex-row" noValidate>
                <Input
                  id="email"
                  type="email"
                  aria-label="Email address"
                  autoComplete="email"
                  placeholder="you@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="h-12 flex-1 bg-background"
                  aria-invalid={!!errors.email}
                />
                <Button type="submit" size="lg" disabled={isSubmitting} className="h-12 w-full sm:w-auto">
                  {isSubmitting ? "Subscribing…" : "Subscribe"}
                </Button>
              </form>
            )}
          </div>
        </div>
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
