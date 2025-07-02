import React from "react";
import { ListSkeleton } from "@/components/shared/skeletons/ListSkeleton";
import { NoRecords } from "@/components/ui/no-records";

interface AdminListProps<T> {
  items: T[];
  loading?: boolean;
  emptyState?: { title: string; description?: string };
  pagination?: React.ReactNode;
  renderItem: (item: T, idx: number) => React.ReactNode;
  itemHeight?: number | string;
  skeletonItems?: number;
  className?: string;
}

export function AdminList<T>({
  items,
  loading = false,
  emptyState,
  pagination,
  renderItem,
  itemHeight = 64,
  skeletonItems = 4,
  className = "",
}: AdminListProps<T>) {
  return (
    <div className={`relative min-h-[100px] ${className}`}>
      {loading ? (
        <ListSkeleton items={skeletonItems} itemHeight={itemHeight} />
      ) : items.length === 0 ? (
        <NoRecords title={emptyState?.title || "No records found"} description={emptyState?.description} />
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, idx) => renderItem(item, idx))}
        </div>
      )}
      {pagination && <div className="mt-8 flex justify-center">{pagination}</div>}
    </div>
  );
}

export default AdminList; 