import Image from "next/image"
import Link from "next/link"
import { ArrowRight, HeartHandshake, Stethoscope, GraduationCap, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  { icon: Stethoscope, label: "Medical care" },
  { icon: UtensilsCrossed, label: "Food for families" },
  { icon: GraduationCap, label: "Education" },
  { icon: HeartHandshake, label: "Financial assistance" },
]

const stats = [
  { value: "2,500+", label: "Families nourished" },
  { value: "800+", label: "Students supported" },
  { value: "50+", label: "Medical camps" },
]

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_25%,transparent_70%)]" />
      <div aria-hidden className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="container relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="animate-fade-up">
          <p dir="rtl" lang="ur" className="mb-4 text-lg font-semibold text-primary sm:text-xl">
            دی صراط مستقیم ویلفیئر ٹرسٹ
          </p>
          <h1 className="text-4xl leading-[1.08] text-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Transforming lives through <span className="text-primary">community support</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            For over a decade, we&apos;ve delivered essential services directly to communities — reaching families in
            remote areas with medical care, food, education and financial help.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="What we provide">
            {services.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm font-medium shadow-sm">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-7 text-base">
              <Link href="/donate">
                Donate now <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
              <Link href="/services">Explore our work</Link>
            </Button>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t pt-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="text-xs text-muted-foreground sm:text-sm">{s.label}</dt>
                <dd className="order-first font-display text-2xl font-bold text-foreground sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl bg-muted shadow-xl sm:col-span-1 sm:row-span-2 sm:aspect-auto">
              <Image
                src="/images/welfare-work-1.jpg"
                alt="Volunteers distributing food to children"
                fill
                priority
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-lg sm:block">
              <Image src="/images/welfare-work-2.jpg" alt="Doctor examining a child at a free medical camp" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative hidden aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-lg sm:block">
              <Image src="/images/welfare-work-3.jpg" alt="Community members during relief work" fill sizes="25vw" className="object-cover" />
            </div>
          </div>

          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border bg-card/95 p-4 shadow-xl backdrop-blur sm:left-auto sm:right-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
              <HeartHandshake className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-none">Since 2016</p>
              <p className="mt-1 text-sm text-muted-foreground">Serving Landhi, Karachi &amp; beyond</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
