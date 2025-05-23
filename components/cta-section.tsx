import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTASectionProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  className?: string
}

export function CTASection({ title, description, ctaText, ctaLink, className }: CTASectionProps) {
  return (
    <section className={cn("bg-primary text-primary-foreground section-padding", className)}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-primary-foreground/90 mb-8">{description}</p>
          <Button asChild size="lg" variant="secondary" className="font-medium">
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
