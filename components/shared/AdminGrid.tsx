import React from "react";
import { GridSkeleton } from "@/components/shared/skeletons/GridSkeleton";
import { NoRecords } from "@/components/ui/no-records";

interface AdminGridProps<T> {
  items: T[];
  loading?: boolean;
  emptyState?: { title: string; description?: string };
  pagination?: React.ReactNode;
  renderItem: (item: T, idx: number) => React.ReactNode;
  gridClassName?: string;
  itemHeight?: number | string;
  skeletonItems?: number;
  className?: string;
}

export function AdminGrid<T>({
  items,
  loading = false,
  emptyState,
  pagination,
  renderItem,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full",
  itemHeight = 256,
  skeletonItems = 4,
  className = "",
}: AdminGridProps<T>) {
  return (
    <div className={`relative min-h-[200px] ${className}`}>
      {loading ? (
        <GridSkeleton items={skeletonItems} itemHeight={itemHeight} gridClassName={gridClassName} />
      ) : items.length === 0 ? (
        <NoRecords title={emptyState?.title || "No records found"} description={emptyState?.description} />
      ) : (
        <div className={gridClassName}>
          {items.map((item, idx) => renderItem(item, idx))}
        </div>
      )}
      {pagination && <div className="mt-8 flex justify-center">{pagination}</div>}
    </div>
  );
}

export default AdminGrid; 