import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/site/section"

export function DonationCounter() {
  const goal = 100000
  const current = 65000
  const percent = Math.round((current / goal) * 100)

  return (
    <Section>
      <div className="mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-3xl border bg-card p-6 shadow-sm sm:p-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow mb-4">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden /> Current goal
          </p>
          <h2 className="text-3xl leading-tight sm:text-4xl">Help us reach our goal</h2>
          <p className="mt-3 text-muted-foreground">
            We&apos;re raising money to help 50 children go to school this year. We&apos;re almost there!
          </p>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Raised</p>
              <p className="font-display text-3xl font-bold tabular-nums text-foreground sm:text-4xl">Rs. {current.toLocaleString()}</p>
            </div>
            <p className="text-right text-sm text-muted-foreground">
              Goal
              <span className="block font-semibold tabular-nums text-foreground">Rs. {goal.toLocaleString()}</span>
            </p>
          </div>

          <div
            className="mt-5 h-3 w-full overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-label="Fundraising progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{percent}%</span> funded — every contribution counts.
            </p>
            <Button asChild size="lg">
              <Link href="/donate">Donate now</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  )
}
