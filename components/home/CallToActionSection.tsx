import Link from "next/link";
import { ArrowRight, HandCoins, LifeBuoy, Users } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/section";

const paths = [
  {
    icon: HandCoins,
    title: "Donate money",
    text: "Give Zakat, Sadaqah or a general donation to fund food, healthcare and education.",
    href: "/donate",
    cta: "Donate now",
    label: "Donate money to Sirat-e-Mustaqeem Welfare Trust",
  },
  {
    icon: Users,
    title: "Volunteer your time",
    text: "Help at distributions, medical camps and events across Karachi.",
    href: "/volunteer",
    cta: "Become a volunteer",
    label: "Volunteer your time for community service",
  },
  {
    icon: LifeBuoy,
    title: "Apply for assistance",
    text: "If you or your family need support, tell us about your situation.",
    href: "/apply",
    cta: "Apply now",
    label: "Apply for assistance from our welfare trust",
  },
];

const CallToActionSection = () => (
  <Section>
    <SectionHeader
      eyebrow="Get involved"
      title="Support our welfare trust — make a difference today"
      description="Join us in our mission to provide community service, education, healthcare and food distribution. Every donation and every volunteer counts."
    />
    <ul className="grid gap-5 md:grid-cols-3">
      {paths.map(({ icon: Icon, title, text, href, cta, label }, i) => (
        <li key={href}>
          <Link
            href={href}
            aria-label={label}
            className={
              "group flex h-full flex-col rounded-2xl border p-7 shadow-sm transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-md " +
              (i === 0 ? "border-transparent bg-primary text-primary-foreground" : "bg-card")
            }
          >
            <span
              className={
                "flex h-12 w-12 items-center justify-center rounded-xl " +
                (i === 0 ? "bg-white/15 text-primary-foreground" : "bg-accent text-primary")
              }
              aria-hidden
            >
              <Icon className="h-6 w-6" />
            </span>
            <span className="mt-5 font-display text-xl font-bold">{title}</span>
            <span className={"mt-2 flex-1 text-sm leading-relaxed " + (i === 0 ? "text-primary-foreground/85" : "text-muted-foreground")}>
              {text}
            </span>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
              {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </Section>
);

export default CallToActionSection;
