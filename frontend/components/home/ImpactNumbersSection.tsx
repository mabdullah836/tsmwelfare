import Link from "next/link";
import { ArrowRight, CalendarHeart, GraduationCap, HandHeart, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeader } from "@/components/site/section";

const ImpactNumbersSection = () => {
  const yearsOfService = new Date().getFullYear() - 2016;
  const impactData = [
    { value: `${yearsOfService}+`, label: "Years of service", icon: CalendarHeart },
    { value: "2,500+", label: "Families nourished", icon: HandHeart },
    { value: "800+", label: "Students empowered", icon: GraduationCap },
    { value: "50+", label: "Medical camps", icon: Stethoscope },
  ];

  return (
    <Section tone="accent">
      <SectionHeader
        eyebrow="Our impact"
        title="Transforming lives since 2016"
        description={`For over ${yearsOfService} years, The Sirat-e-Mustaqeem Welfare Trust has created lasting change in our community.`}
      />
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {impactData.map(({ value, label, icon: Icon }) => (
          <div key={label} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <Icon className="h-6 w-6 text-primary" aria-hidden />
            <dt className="order-3 mt-1 text-sm font-medium text-muted-foreground">{label}</dt>
            <dd className="order-2 mt-4 font-display text-3xl font-extrabold tabular-nums tracking-tight text-foreground sm:text-5xl">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-12 text-center">
        <p className="mb-5 text-muted-foreground">And this is just the beginning…</p>
        <Button asChild size="lg">
          {/* Previously a <button> with no action; it now leads to the volunteer sign-up. */}
          <Link href="/volunteer">
            Join our mission <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  );
};

export default ImpactNumbersSection;
