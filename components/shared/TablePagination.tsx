import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TablePaginationProps {
  page: number
  pages: number
  total?: number
  selectedCount?: number
  pageCount?: number
  onPageChange: (page: number) => void
}

export function TablePagination({ page, pages, total, selectedCount, pageCount, onPageChange }: TablePaginationProps) {
  const lastPage = Math.max(1, pages || 1)
  return (
    <div className="flex flex-col-reverse gap-3 border-t px-1 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground" aria-live="polite">
        {selectedCount !== undefined && pageCount !== undefined
          ? `${selectedCount} of ${pageCount} row(s) selected`
          : typeof total === "number"
            ? `${total} record${total === 1 ? "" : "s"}`
            : null}
      </p>
      <nav className="flex items-center gap-2" aria-label="Pagination">
        <span className="mr-2 text-muted-foreground">
          Page <span className="font-medium text-foreground">{Math.min(page, lastPage)}</span> of{" "}
          <span className="font-medium text-foreground">{lastPage}</span>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(lastPage, page + 1))}
          disabled={page >= lastPage}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight />
        </Button>
      </nav>
    </div>
  )
}
