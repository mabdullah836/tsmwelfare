import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface TableSkeletonProps {
  rows?: number;
  rowHeight?: number | string;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 4,
  rowHeight = 64,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`} data-testid="table-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full rounded-lg"
          style={{ height: typeof rowHeight === "number" ? `${rowHeight}px` : rowHeight }}
        />
      ))}
    </div>
  );
};

export default TableSkeleton; 