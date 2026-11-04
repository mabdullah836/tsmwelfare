import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

type ServiceLandingPageProps = {
  title: string;
  intro: string;
  offerings: { label: string; description?: string }[];
  getInvolved: string;
  futurePlans: string;
};

export default function ServiceLandingPage({
  title,
  intro,
  offerings,
  getInvolved,
  futurePlans,
}: ServiceLandingPageProps) {
  return (
    <>
      <PageHeader title={title} eyebrow="Programs">
        <p>{intro}</p>
      </PageHeader>
      <section className="py-12 md:py-16">
        <div className="container grid max-w-6xl gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl">What we offer</h2>
            <ul className="mt-6 space-y-4">
              {offerings.map((item, i) => (
                <li key={i} className="flex items-start gap-4 rounded-xl bg-muted/50 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden>
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    {item.description && <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl bg-ink p-6 text-ink-foreground sm:p-8">
              <h2 className="text-xl text-ink-foreground">Get involved</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{getInvolved}</p>
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild className="bg-gold text-ink hover:bg-gold/90">
                  <Link href="/volunteer">Volunteer <ArrowRight /></Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 bg-transparent text-ink-foreground hover:bg-white/10 hover:text-ink-foreground">
                  <Link href="/contact">Contact us</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-accent/60 p-5 text-sm">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <p className="text-accent-foreground">{futurePlans}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
