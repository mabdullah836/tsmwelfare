import { cn } from "@/lib/utils"

interface Stat {
  value: string
  label: string
}

interface StatsSectionProps {
  title: string
  description: string
  stats: Stat[]
  className?: string
}

export function StatsSection({ title, description, stats, className }: StatsSectionProps) {
  return (
    <section className={cn("bg-primary/5 section-padding", className)}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
