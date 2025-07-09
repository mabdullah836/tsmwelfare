import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">{title}</h1>
          <p className="text-xl text-white/90 mb-8 text-balance">{subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="font-medium">
              <Link href={ctaLink}>{ctaText}</Link>
            </Button>
            {secondaryCtaText && secondaryCtaLink && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-medium"
              >
                <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
    </section>
  )
}
