import React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { TableSkeleton } from "@/components/shared/skeletons/TableSkeleton";
import { NoRecords } from "@/components/ui/no-records";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface Column {
  key: string;
  label: React.ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: Column[];
  data: T[];
  loading?: boolean;
  emptyState?: { title: string; description?: string };
  pagination?: React.ReactNode;
  renderRow: (item: T, idx: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  skeletonRows?: number;
  skeletonRowHeight?: number;
  handleSort?: (key: string) => void;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export function AdminTable<T>({
  columns,
  data,
  loading = false,
  emptyState,
  pagination,
  renderRow,
  className = "",
  skeletonRows = 4,
  skeletonRowHeight = 64,
  handleSort,
  sortBy,
  sortOrder,
}: AdminTableProps<T>) {
  return (
    <div className={`w-full ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => {
              const isSortable = col.key !== "actions" && !!handleSort;
              const isSorted = sortBy === col.key;
              return (
                <TableHead
                  key={col.key}
                  className={col.className || ""}
                  aria-sort={isSorted ? (sortOrder === "asc" ? "ascending" : "descending") : undefined}
                  scope="col"
                >
                  {isSortable && typeof col.label === "string" ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className="-mx-2 inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {col.label}
                      {isSorted ? (
                        sortOrder === "asc" ? <ArrowUp className="h-3.5 w-3.5" aria-hidden /> : <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" aria-hidden />
                      )}
                    </button>
                  ) : (
                    <span className="inline-flex items-center">{col.label}</span>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <TableSkeleton rows={skeletonRows} rowHeight={skeletonRowHeight} />
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <NoRecords
                  title={emptyState?.title || "No records found"}
                  description={emptyState?.description}
                />
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, idx) => renderRow(item, idx))
          )}
        </TableBody>
      </Table>
      {pagination && <div className="mt-8 flex justify-center">{pagination}</div>}
    </div>
  );
}

export default AdminTable; 