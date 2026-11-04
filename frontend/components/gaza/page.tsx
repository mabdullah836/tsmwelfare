import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, Droplets, HeartIcon, HeartPulse, Package, Baby } from "lucide-react"
import { Button } from "@/components/ui/button"

const efforts = [
  { icon: Package, text: "Emergency food packages for starving families" },
  { icon: HeartPulse, text: "Medical supplies for overwhelmed hospitals" },
  { icon: Baby, text: "Essential care for orphaned children" },
  { icon: Droplets, text: "Clean water in devastated areas" },
]

export default function GazaPage() {
  return (
    <section aria-labelledby="gaza-heading" className="bg-ink py-16 text-ink-foreground md:py-24">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-300">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 motion-safe:animate-pulse" aria-hidden />
              Emergency appeal
            </p>
            <h2 id="gaza-heading" className="mt-5 text-3xl leading-tight text-ink-foreground sm:text-4xl md:text-5xl">
              Emergency support for Gaza
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              Our brothers and sisters in Gaza are facing unprecedented suffering. Your urgent support can provide
              life-saving aid to families under siege.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {efforts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 rounded-xl bg-white/5 p-4 text-sm">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden />
              <p>
                <strong className="font-semibold">Urgent need: </strong>
                <span className="text-ink-muted">
                  Over 2 million people are without adequate food, water or medical care. Your donation today can save lives tomorrow.
                </span>
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-12 bg-gold px-7 text-base text-ink hover:bg-gold/90">
                <Link href="/donate?fund=gaza-relief">
                  <HeartIcon /> Donate for Gaza
                </Link>
              </Button>
              <p className="text-sm text-ink-muted">Goes directly to our Gaza Relief Fund. Any amount helps.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl bg-white/5">
              <Image
                src="/images/gaza-appeal.jpeg"
                alt="Gaza emergency appeal — send aid to Gaza and save lives today"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/5">
              <Image src="/images/gaza-solidarity.jpeg" alt="Solidarity with Palestine at Al-Aqsa Mosque" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-white/5">
              <Image src="/images/gaza-child.jpeg" alt="Child in Gaza receiving food aid" fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
