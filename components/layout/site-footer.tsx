import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FacebookIcon, HeartHandshake, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const columns = [
  {
    title: "Organisation",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Services", href: "/services" },
      { label: "Departments", href: "/departments" },
      { label: "Events", href: "/events" },
      { label: "Media Gallery", href: "/media" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Donate", href: "/donate" },
      { label: "Bank Details", href: "/bank-details" },
      { label: "Zakat Calculator", href: "/zakat-calculator" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Apply for Assistance", href: "/apply" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container">
        {/* Donate strip */}
        <div className="flex flex-col items-start gap-6 border-b border-white/10 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-gold" aria-hidden>
              <HeartHandshake className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold">Your Zakat and Sadaqah change lives.</p>
              <p className="mt-1 text-ink-muted">Every rupee reaches families who need it most.</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="bg-gold text-ink hover:bg-gold/90">
              <Link href="/donate">
                Donate now <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground">
              <Link href="/volunteer">Become a volunteer</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 rounded-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1">
                <Image src="/images/logo.png" alt="" width={44} height={44} className="h-10 w-10 object-contain" />
              </span>
              <span className="font-display text-lg font-bold leading-tight">
                The Sirat-e-Mustaqeem
                <br />
                Welfare Trust
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Serving humanity for over {year - 2016} years — guiding people towards the straight path through compassion,
              service and community support.
            </p>
            <a
              href="https://www.facebook.com/smwelfare/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <FacebookIcon className="h-5 w-5" aria-hidden />
              <span className="sr-only">Facebook (opens in a new tab)</span>
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-foreground">{col.title}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-ink-muted transition-colors hover:text-ink-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider">Contact</h2>
            <address className="mt-4 space-y-3 text-sm not-italic text-ink-muted">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <span>
                  Head Office: Mansehra Colony, Lal Kothi Stop,
                  <br /> Landhi, Karachi, Pakistan
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href="tel:+921234567890" className="hover:text-ink-foreground">+92 123 456 7890</a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a href="mailto:info@sirat-e-mustaqeem.org" className="break-words hover:text-ink-foreground">info@sirat-e-mustaqeem.org</a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} The Sirat-e-Mustaqeem Welfare Trust. All rights reserved.</p>
          <p dir="rtl" lang="ur" className="text-sm">دی صراط مستقیم ویلفیئر ٹرسٹ</p>
        </div>
      </div>
    </footer>
  )
}
