import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { departments } from "@/lib/constants/departments"
import { Section, SectionHeader } from "@/components/site/section"

// Rendered as its own page (heading level 1) and embedded on the home page (level 2).
export function DepartmentsSection({ headingLevel = 1 }: { headingLevel?: 1 | 2 }) {
  return (
    <Section tone={headingLevel === 1 ? "default" : "muted"}>
      <SectionHeader
        as={headingLevel === 1 ? "h1" : "h2"}
        eyebrow="Our departments"
        title="Six ways we serve our community"
        description="We work across specialised departments to serve our community holistically. Each division focuses on distinct needs with tailored programmes and support."
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((department, index) => (
          <li
            key={department.title}
            className="group relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-primary/30 hover:shadow-md sm:p-7"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
                <department.icon className="h-6 w-6" />
              </span>
              <span className="font-display text-sm font-bold text-muted-foreground/60" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg font-bold">{department.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{department.description}</p>
          </li>
        ))}
      </ul>

      {headingLevel === 2 && (
        <div className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
            See all our services <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </Section>
  )
}
