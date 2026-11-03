import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpen, Check, Handshake, Heart, HeartPulse, Leaf, Sprout, Users, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/page-header";
import { Section, SectionHeader } from "@/components/site/section";

const approach = [
  { title: "Direct Services", description: "Providing immediate assistance to individuals and families in need through our various programs.", icon: Heart },
  { title: "Education & Training", description: "Offering workshops, classes, and resources to help people develop new skills and knowledge.", icon: BookOpen },
  { title: "Advocacy", description: "Working to address systemic issues and create positive change at the community and policy levels.", icon: Award },
  { title: "Community Building", description: "Creating opportunities for connection and collaboration to strengthen our community.", icon: Users },
  { title: "Resource Coordination", description: "Connecting people with the services and support they need, both within our organization and beyond.", icon: Handshake },
  { title: "Volunteer Engagement", description: "Engaging community members in meaningful service that makes a difference.", icon: UsersRound },
];

// Previously a photo carousel; its three images were never added to /public, so the stories are shown as cards.
const highlights = [
  { title: "Community Garden Initiative", description: "Our urban garden now provides fresh produce to 200+ families each month while teaching sustainable practices.", icon: Sprout },
  { title: "Youth Mentorship Program", description: "87% of participants showed improved academic performance and self-confidence after one year.", icon: UsersRound },
  { title: "Senior Companion Services", description: "Helping older adults remain independent with weekly check-ins and assistance.", icon: HeartPulse },
];

const tabs = [
  { value: "community", label: "Community", icon: Users },
  { value: "education", label: "Education", icon: BookOpen },
  { value: "environment", label: "Environment", icon: Leaf },
  { value: "health", label: "Health", icon: Heart },
  { value: "youth", label: "Youth", icon: UsersRound },
];

function Feature({ title, text, points, image, imageAlt, href, cta, reverse }: {
  title: string; text: string; points: string[]; image?: string; imageAlt?: string; href: string; cta: string; reverse?: boolean
}) {
  return (
    <div className="grid items-center gap-10 rounded-3xl border bg-card p-6 shadow-sm sm:p-10 md:grid-cols-2">
      <div className={reverse ? "md:order-2" : undefined}>
        <h3 className="text-2xl sm:text-3xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{text}</p>
        <ul className="mt-6 space-y-3">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary" aria-hidden>
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8">
          <Link href={href}>
            {cta} <ArrowRight />
          </Link>
        </Button>
      </div>
      {image && (
        <div className={"relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted " + (reverse ? "md:order-1" : "")}>
          <Image src={image} alt={imageAlt ?? ""} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
        </div>
      )}
    </div>
  )
}

function Placeholder({ title, text, children }: { title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-dashed bg-card px-6 py-14 text-center sm:px-10">
      <h3 className="text-2xl sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">{text}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">{children}</div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Our services" eyebrow="What we do">
        <p>Discover the various ways we&apos;re working to make a positive impact in our community through comprehensive support programs.</p>
      </PageHeader>

      <Section>
        <SectionHeader
          eyebrow="Our focus areas"
          title="Transforming communities through targeted services"
          description="Each program is designed to address specific needs while fostering long-term growth and resilience."
        />

        <Tabs defaultValue="community" className="w-full">
          <div className="mb-10 flex justify-center">
            <TabsList className="flex h-auto max-w-full justify-start gap-1 overflow-x-auto rounded-full p-1.5">
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="shrink-0 gap-2 rounded-full px-4 py-2 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm sm:px-5"
                >
                  <Icon className="h-4 w-4" aria-hidden /> {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="community">
            <Feature
              title="Community Outreach"
              text="Our community programs bring people together through events, support services, and neighborhood initiatives that strengthen social bonds and improve quality of life."
              points={["Monthly events — food drives, cultural celebrations, and educational workshops", "Support services — emergency assistance and resource coordination"]}
              image="/images/community.jpg"
              imageAlt="Volunteers of the trust with food packages"
              href="/community-programs"
              cta="Learn about our programs"
            />
          </TabsContent>

          <TabsContent value="education">
            <Feature
              reverse
              title="Education Initiatives"
              text="We provide learning opportunities for all ages, from literacy programs to vocational training, helping community members gain skills for better futures."
              points={["After-school tutoring programs", "Adult education and GED preparation", "Digital literacy workshops"]}
              image="/images/education-program.jpg"
              imageAlt="Students learning in a classroom"
              href="/education-programs"
              cta="View education opportunities"
            />
          </TabsContent>

          <TabsContent value="environment">
            <Placeholder title="Environmental programs coming soon" text="We're developing initiatives to promote sustainability and environmental awareness in our community.">
              <Button asChild variant="outline">
                <Link href="/contact">Get updates</Link>
              </Button>
            </Placeholder>
          </TabsContent>

          <TabsContent value="health">
            <Feature
              title="Health & Wellness Services"
              text="Our health initiatives provide access to medical care, mental health support, and wellness education for underserved populations."
              points={["Free health screenings", "Mental health support"]}
              image="/images/welfare-work-2.jpg"
              imageAlt="Doctor examining a child at a free medical camp"
              href="/health-services"
              cta="View health programs"
            />
          </TabsContent>

          <TabsContent value="youth">
            <Placeholder title="Youth development programs" text="We empower young people through mentorship, skill-building activities, and leadership opportunities.">
              <Button asChild>
                <Link href="/youth-programs">Learn more</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/volunteer">Become a mentor</Link>
              </Button>
            </Placeholder>
          </TabsContent>
        </Tabs>
      </Section>

      <Section tone="muted">
        <SectionHeader eyebrow="Our approach" title="Comprehensive support systems" description="We employ multiple strategies to create meaningful, lasting change in people's lives." />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {approach.map(({ title, description, icon: Icon }) => (
            <li key={title} className="rounded-2xl border bg-card p-7 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary" aria-hidden>
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeader eyebrow="Impact stories" title="Service highlights" description="See how our programs are making a real difference in people's lives." />
        <ul className="grid gap-5 md:grid-cols-3">
          {highlights.map(({ title, description, icon: Icon }) => (
            <li key={title} className="relative overflow-hidden rounded-2xl bg-ink p-7 text-ink-foreground">
              <Icon className="h-8 w-8 text-gold" aria-hidden />
              <h3 className="mt-6 text-xl text-ink-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container max-w-3xl text-center">
          <h2 className="text-3xl leading-tight text-primary-foreground md:text-4xl">Ready to make a difference?</h2>
          <p className="mt-4 text-lg text-primary-foreground/85">
            Whether you need support or want to join our mission, we&apos;re here to help you take the next step.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get help</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link href="/volunteer">Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
