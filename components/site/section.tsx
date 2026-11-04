import type { ReactNode } from "react"
import { cn } from "@/lib/utils/cn"

type Tone = "default" | "muted" | "ink" | "accent"

const toneClasses: Record<Tone, string> = {
  default: "bg-background",
  muted: "bg-muted/50",
  ink: "bg-ink text-ink-foreground",
  accent: "bg-accent/60",
}

export function Section({
  children,
  tone = "default",
  className,
  containerClassName,
  id,
  ...rest
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  containerClassName?: string
  id?: string
} & React.AriaAttributes) {
  return (
    <section id={id} className={cn("py-16 md:py-24", toneClasses[tone], className)} {...rest}>
      <div className={cn("container", containerClassName)}>{children}</div>
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
  id,
  invert = false,
  className,
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: "center" | "left"
  as?: "h1" | "h2" | "h3"
  id?: string
  invert?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-3xl md:mb-14",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", invert && "border-white/15 bg-white/10 text-gold")}>{eyebrow}</p>
      )}
      <Heading id={id} className={cn("text-3xl leading-tight sm:text-4xl md:text-[2.75rem]", invert ? "text-ink-foreground" : "text-foreground")}>
        {title}
      </Heading>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", invert ? "text-ink-muted" : "text-muted-foreground")}>
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
