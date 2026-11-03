import type { ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

/**
 * Hero band at the top of every inner public page.
 * `children` is the supporting copy (kept for compatibility with existing pages).
 */
export function PageHeader({
  title,
  eyebrow,
  children,
  actions,
  className,
}: {
  title: string
  eyebrow?: string
  children?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <section className={cn("relative overflow-hidden border-b bg-gradient-to-b from-accent/70 to-background", className)}>
      <div aria-hidden className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="container relative py-14 md:py-20">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h1 className="text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">{title}</h1>
          {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </div>
    </section>
  )
}
