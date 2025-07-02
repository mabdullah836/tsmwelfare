import React from "react";
import { TableSkeleton } from "@/components/shared/skeletons/TableSkeleton";
import { NoRecords } from "@/components/ui/no-records";
import { Pagination } from "@/components/ui/pagination";

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
}

export function AdminTable<T>({
  columns,
  data,
  loading = false,
  emptyState,
  pagination,
  renderRow,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  skeletonRows = 4,
  skeletonRowHeight = 64,
}: AdminTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <div className="rounded-md border" role="table">
        <div className={`flex bg-muted/50 font-medium ${headerClassName}`} role="rowgroup">
          {columns.map((col) => (
            <div
              key={col.key}
              className={`p-4 ${col.className || "flex-1"}`}
              role="columnheader"
            >
              {col.label}
            </div>
          ))}
        </div>
        <div className={bodyClassName} role="rowgroup">
          {loading ? (
            <TableSkeleton rows={skeletonRows} rowHeight={skeletonRowHeight} />
          ) : data.length === 0 ? (
            <NoRecords
              title={emptyState?.title || "No records found"}
              description={emptyState?.description}
            />
          ) : (
            data.map((item, idx) => renderRow(item, idx))
          )}
        </div>
      </div>
      {pagination && <div className="mt-8 flex justify-center">{pagination}</div>}
    </div>
  );
}

export default AdminTable; 