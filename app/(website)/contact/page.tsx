"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Section, SectionHeader } from "@/components/site/section"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { AlertMessage } from "@/components/ui/alert-message"
import { PageHeader } from "@/components/page-header"
import { contactFaqs } from '@/lib/data/faqs'
import { FormInput } from "@/components/ui/form-input"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactItems = [
  {
    icon: MapPin,
    title: "Head office address",
    body: (
      <address className="not-italic">
        The Sirat-e-Mustaqeem Welfare Trust<br />Mansehra Colony, Lal Kothi Stop<br />Landhi, Karachi<br />Pakistan
      </address>
    ),
  },
  { icon: Phone, title: "Phone", body: <a href="tel:+11234567890" className="hover:text-primary">+1 (123) 456-7890</a> },
  { icon: Mail, title: "Email", body: <a href="mailto:info@sirat-e-mustaqeem.org" className="break-words hover:text-primary">info@sirat-e-mustaqeem.org</a> },
  { icon: Clock, title: "Hours", body: <>Monday - Friday: 9am - 5pm<br />Saturday: 10am - 2pm<br />Sunday: Closed</> },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>()

  const onSubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setAlert({
        message: "Thank you for your message. We'll get back to you soon!",
        type: "success"
      })
      reset()
    } catch (error) {
      setAlert({
        message: "Failed to send message. Please try again later.",
        type: "error"
      })
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {alert && (
        <AlertMessage
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <PageHeader title="Contact us" eyebrow="Get in touch">
        <p>We&apos;d love to hear from you. Reach out with questions, feedback, or to learn more about our services.</p>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl">Send us a message</h2>
              <p className="mt-1 text-muted-foreground">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormInput
                    id="name"
                    label="Your Name"
                    register={register}
                    errors={errors}
                    required
                    placeholder="e.g., John Doe"
                    inputProps={{ autoComplete: "name" }}
                  />
                  <FormInput
                    id="email"
                    label="Email Address"
                    type="email"
                    register={register}
                    errors={errors}
                    required
                    placeholder="e.g., john.doe@example.com"
                    pattern={{ value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }}
                    inputProps={{ autoComplete: "email" }}
                  />
                </div>
                <FormInput
                  id="subject"
                  label="Subject"
                  register={register}
                  errors={errors}
                  required
                  placeholder="e.g., Inquiry about services"
                />
                <FormInput
                  id="message"
                  label="Message"
                  register={register}
                  errors={errors}
                  required
                  rows={6}
                  placeholder="Your message here..."
                />
                <Button type="submit" size="lg" className="h-12 w-full text-base sm:w-auto" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : <>Send message <Send /></>}
                </Button>
              </form>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl bg-ink p-6 text-ink-foreground sm:p-8">
                <h2 className="text-2xl text-ink-foreground">Contact information</h2>
                <p className="mt-1 text-sm text-ink-muted">Here&apos;s how you can reach us directly.</p>
                <ul className="mt-6 space-y-5">
                  {contactItems.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold" aria-hidden>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 text-sm">
                        <h3 className="font-sans text-sm font-semibold text-ink-foreground">{title}</h3>
                        <div className="mt-1 text-ink-muted">{body}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeader eyebrow="Quick answers" title="Frequently asked questions" />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {contactFaqs.map((faq, index) => (
            <div key={index} className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          More questions? See the <Link href="/faq" className="font-semibold text-primary hover:underline underline-offset-4">full FAQ</Link>.
        </p>
      </Section>
    </>
  )
}
