"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
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
      <PageHeader title="Contact Us">
        <p className="text-xl text-white/90">
          We'd love to hear from you. Reach out with questions, feedback, or to learn more about our services.
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormInput
                        id="name"
                        label="Your Name"
                        register={register}
                        errors={errors}
                        required
                        placeholder="e.g., John Doe"
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
                      rows={5}
                      placeholder="Your message here..."
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Here's how you can reach us directly.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Head Office Address</h3>
                      <address className="not-italic text-muted-foreground">
                        The Sirat-e-Mustaqeem Welfare Trust
                        <br />
                        Mansehra Colony, Lal Kothi Stop
                        <br />
                        Landhi, Karachi
                        <br />
                        Pakistan
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+11234567890" className="hover:text-primary">
                          +1 (123) 456-7890
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@sirat-e-mustaqeem.org" className="hover:text-primary">
                          info@sirat-e-mustaqeem.org
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9am - 5pm
                        <br />
                        Saturday: 10am - 2pm
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contactFaqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
