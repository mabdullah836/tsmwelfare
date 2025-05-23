import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { QuoteIcon } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  role: string
  avatarUrl?: string
}

interface TestimonialSectionProps {
  title: string
  description: string
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialSection({ title, description, testimonials, className }: TestimonialSectionProps) {
  return (
    <section className={cn("section-padding", className)}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-lg mb-6">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t pt-6">
                {testimonial.avatarUrl ? (
                  <Image
                    src={testimonial.avatarUrl || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
