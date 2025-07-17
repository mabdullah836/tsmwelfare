import React from "react";
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
    <div className={`overflow-x-auto ${className}`}>
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
                  onClick={isSortable ? () => handleSort && handleSort(col.key) : undefined}
                  aria-sort={isSorted ? (sortOrder === "asc" ? "ascending" : "descending") : undefined}
                  style={{ cursor: isSortable ? "pointer" : undefined }}
                  scope="col"
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {isSorted && (
                      <span className="ml-1 text-xs">
                        {sortOrder === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </span>
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