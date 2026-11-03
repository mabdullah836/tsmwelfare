"use client";

import { PageHeader } from "@/components/page-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/data/faqs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      <PageHeader title="Frequently asked questions" eyebrow="FAQ">
        <p>Find answers to common questions about our organization, programs, and how you can get involved in our mission of serving humanity.</p>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border bg-card px-5 shadow-sm transition-shadow data-[state=open]:shadow-md sm:px-6"
              >
                {/* Radix renders the trigger inside a heading element; a nested <h2> inside the button was invalid HTML. */}
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-2xl bg-accent/60 p-8 text-center">
            <h2 className="text-2xl">Still have questions?</h2>
            <p className="mt-2 text-muted-foreground">We&apos;re here to help!</p>
            <Button asChild className="mt-6">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
} 