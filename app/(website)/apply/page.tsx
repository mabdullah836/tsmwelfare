import { PageHeader } from "@/components/page-header"
import { ApplicationForm } from "@/components/application-form"

export const metadata = {
  title: "Apply for Assistance - Sirat-e-Mustaqeem Welfare Trust",
  description:
    "Submit your application for various types of assistance including orphan marriage support, education assistance, healthcare aid, and more.",
}

export default function ApplyPage() {
  return (
    <>
      <PageHeader title="Apply for Assistance">
        <p className="text-xl text-white/90">
          Submit your application for various types of assistance. We are here to help you in your time of need.
        </p>
      </PageHeader>

      <section className="py-16">
        <div className="container max-w-2xl">
          <div className="bg-card rounded-lg shadow-lg p-6 md:p-8">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  )
} 