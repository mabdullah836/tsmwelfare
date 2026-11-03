import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Heart, Lightbulb, Users } from "lucide-react";
import TeamGrid from "./TeamGrid";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/site/section";

const values = [
  { title: "Compassion", description: "We approach our work with empathy and understanding, recognizing the dignity of all people.", icon: Heart },
  { title: "Integrity", description: "We are committed to transparency, accountability, and ethical practices in all we do.", icon: Award },
  { title: "Innovation", description: "We embrace creative solutions and new approaches to address complex community challenges.", icon: Lightbulb },
  { title: "Collaboration", description: "We believe in the power of partnerships to create meaningful and lasting change.", icon: Users },
];

// Server-rendered: this page no longer ships animation libraries to the browser.
export default function AboutClient() {
  const years = new Date().getFullYear() - 2016;
  const stats = [
    { value: "5,000+", label: "Lives impacted" },
    { value: "2016", label: "Founded in" },
    { value: "12+", label: "Programs" },
    { value: "50+", label: "Volunteers" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sirat-e-Mustaqeem Welfare Trust",
            "url": "https://www.smwelfare.org/",
            "logo": "/images/logo.png",
            "description": "A non-profit organization in Pakistan dedicated to community service, education, healthcare, and food distribution.",
            "sameAs": ["https://www.facebook.com/smwelfare/"]
          })
        }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <Image src="/images/about-hero.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-center opacity-40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="container py-24 md:py-32">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow mb-5 border-white/15 bg-white/10 text-gold">About us</p>
            <h1 className="text-4xl leading-[1.08] sm:text-5xl md:text-6xl">
              Our mission to <span className="text-gold">serve</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted md:text-xl">
              We are dedicated to empowering communities, creating change, building futures and inspiring hope.
            </p>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <dt className="order-2 text-sm text-ink-muted">{s.label}</dt>
                <dd className="order-1 font-display text-3xl font-bold tabular-nums sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">Our journey</p>
            <h2 className="text-3xl leading-tight sm:text-4xl">Our story</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Founded in 2016, The Sirat-e-Mustaqeem Welfare Trust began with a simple mission: to guide people towards the straight path through service to humanity. What started as a small group of dedicated volunteers has grown into a thriving organization with a significant impact across communities.
              </p>
              <p>
                For over {years} years, we&apos;ve been committed to serving the needy and underprivileged. Through our various departments including healthcare, education, food distribution, and marriage support for orphans, we&apos;ve touched thousands of lives.
              </p>
              <p>
                Today, The Sirat-e-Mustaqeem Welfare Trust continues to be guided by our founding principles of compassion, integrity, and Islamic values as we work to build a better future for all.
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link href="/services">
                Learn more about our work <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted shadow-xl sm:aspect-[4/3] md:aspect-[4/5]">
            {/* The original image (/images/our-story.jpg) does not exist in the repo. */}
            <Image src="/images/welfare-work-4.jpg" alt="Volunteers of the trust at a community distribution" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-background/95 px-5 py-3 shadow-lg backdrop-blur">
              <p className="font-display text-2xl font-bold">{years}+</p>
              <p className="text-sm text-muted-foreground">Years of service</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section tone="muted">
        <SectionHeader eyebrow="What guides us" title="Our core values" description="These principles shape every decision we make and every action we take." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ title, description, icon: Icon }) => (
            <li key={title} className="rounded-2xl border bg-card p-7 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Team */}
      <Section>
        <SectionHeader eyebrow="Our people" title="Meet our team" description="Dedicated individuals working together to make a difference." />
        <TeamGrid />
        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/volunteer">Join our team</Link>
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl leading-tight text-primary-foreground md:text-4xl">Ready to make a difference?</h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            Whether you want to volunteer, donate, or partner with us, we&apos;d love to hear from you. Together, we can create lasting change.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="secondary" size="lg">
              <Link href="/donate">Donate now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
