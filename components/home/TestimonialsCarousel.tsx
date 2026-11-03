import { Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/section";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Father of 3",
    message:
      "My daughter was very sick and I had no money for the doctor. The health department helped us get free treatment. Now she's healthy and going to school again.",
  },
  {
    name: "Fatima Bibi",
    role: "Widow with 4 children",
    message:
      "After my husband died, I didn't know how to feed my children. The trust gives us monthly support and food packages. My kids are still in school because of their help.",
  },
  {
    name: "Muhammad Ali",
    role: "Orphan",
    message:
      "I'm an orphan and had no money for my wedding. The marriage support department helped me with everything. Now I have my own family and I'm very grateful.",
  },
];

const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

const TestimonialsCarousel = () => (
  <Section>
    <SectionHeader
      eyebrow="Stories"
      title="What people say about us"
      description="These are real stories from people we've helped. They tell us how our work has changed their lives."
    />
    <ul className="grid gap-5 md:grid-cols-3">
      {testimonials.map((t) => (
        <li key={t.name}>
          <figure className="flex h-full flex-col rounded-2xl border bg-card p-7 shadow-sm">
            <Quote className="h-8 w-8 text-primary/30" aria-hidden />
            <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">“{t.message}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-accent-foreground" aria-hidden>
                {initials(t.name)}
              </span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-sm text-muted-foreground">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  </Section>
);

export default TestimonialsCarousel;
