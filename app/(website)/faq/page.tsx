"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Sirat-e-Mustaqeem Welfare Trust?",
      answer:
        "Sirat-e-Mustaqeem Welfare Trust is a non-profit organization dedicated to serving the community through various welfare programs, educational initiatives, and humanitarian aid projects.",
    },
    {
      question: "How can I donate to your organization?",
      answer:
        "You can donate through our website using credit/debit cards, bank transfers, or by sending a check. We also accept in-kind donations. Visit our donation page for more details.",
    },
    {
      question: "Are donations tax-deductible?",
      answer:
        "Yes, all donations to Sirat-e-Mustaqeem Welfare Trust are tax-deductible. We provide receipts for all donations received.",
    },
    {
      question: "How can I volunteer with your organization?",
      answer:
        "We welcome volunteers who want to contribute their time and skills. You can sign up through our website or contact our volunteer coordinator for more information.",
    },
    {
      question: "What programs do you currently run?",
      answer:
        "We run various programs including food distribution, educational support, healthcare assistance, and emergency relief efforts. Check our services page for detailed information.",
    },
    {
      question: "How is my donation used?",
      answer:
        "Your donations directly support our community programs. We maintain transparency in our financial operations and publish regular reports on fund utilization.",
    },
    {
      question: "Do you provide assistance to individuals?",
      answer:
        "Yes, we provide assistance to individuals and families in need through our various welfare programs. Please contact us or visit our office for more information.",
    },
    {
      question: "How can I stay updated about your activities?",
      answer:
        "You can subscribe to our newsletter, follow us on social media, or regularly visit our website for updates on our activities and programs.",
    },
  ]

  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our organization, programs, and how you can get involved.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg px-6">
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Still have questions? We're here to help!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
} 