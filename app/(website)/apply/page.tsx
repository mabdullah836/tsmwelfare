import { ClipboardList, FileCheck2, PhoneCall, ShieldCheck } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { ApplicationForm } from "@/components/application-form"

export const metadata = {
  title: { absolute: "Apply for Assistance - Sirat-e-Mustaqeem Welfare Trust" },
  description:
    "Submit your application for various types of assistance including orphan marriage support, education assistance, healthcare aid, and more.",
}

const steps = [
  { icon: ClipboardList, title: "Fill in the form", text: "Tell us who you are and what kind of help you need." },
  { icon: FileCheck2, title: "Attach documents", text: "Upload supporting documents so we can review your case." },
  { icon: PhoneCall, title: "We contact you", text: "Our team reviews each application and gets back to you." },
]

export default function ApplyPage() {
  return (
    <>
      <PageHeader title="Apply for assistance" eyebrow="Request support">
        <p>Submit your application for various types of assistance. We are here to help you in your time of need.</p>
      </PageHeader>

      <section className="py-12 md:py-16">
        <div className="container grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="text-2xl">How it works</h2>
              <ol className="mt-5 space-y-5">
                {steps.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">
                        <span className="sr-only">Step {i + 1}: </span>
                        {title}
                      </p>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border bg-card p-5 text-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p className="text-muted-foreground">
                <strong className="font-semibold text-foreground">Your information is handled with care.</strong> Applications
                are reviewed only by our team.
              </p>
            </div>
          </aside>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="mb-6 text-xl">Application form</h2>
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  )
}
