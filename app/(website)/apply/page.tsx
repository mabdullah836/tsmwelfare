import { ApplicationForm } from "@/components/application-form"

export const metadata = {
  title: "Apply for Assistance - Sirat-e-Mustaqeem Welfare Trust",
  description:
    "Submit your application for various types of assistance including orphan marriage support, education assistance, healthcare aid, and more.",
}

export default function ApplyPage() {
  return (
    <>
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Apply for Assistance
            </h1>
            <p className="text-xl text-white/90">
              Submit your application for various types of assistance. We are here to help you in your time of need.
            </p>
          </div>
        </div>
      </section>

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