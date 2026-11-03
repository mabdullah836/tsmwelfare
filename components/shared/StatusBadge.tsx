import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils/cn"

const STATUS_VARIANTS: Record<string, NonNullable<BadgeProps["variant"]>> = {
  approved: "success",
  completed: "success",
  active: "success",
  pending: "warning",
  processing: "info",
  rejected: "danger",
  failed: "danger",
  cancelled: "neutral",
}

export function StatusBadge({ status, className }: { status?: string | null; className?: string }) {
  const value = (status || "pending").toLowerCase()
  return (
    <Badge variant={STATUS_VARIANTS[value] ?? "neutral"} className={cn("capitalize", className)}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </Badge>
  )
}
