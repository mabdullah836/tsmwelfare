import { Inbox } from "lucide-react"

interface NoRecordsProps {
  title?: string
  description?: string
  showImage?: boolean
}

export function NoRecords({
  title = "No Records Found",
  description = "There are no records available at the moment.",
  showImage = true
}: NoRecordsProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      {showImage && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Inbox className="h-6 w-6" aria-hidden />
        </div>
      )}
      <h3 className="text-base font-semibold">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
