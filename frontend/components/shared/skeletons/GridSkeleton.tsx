import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface GridSkeletonProps {
  items?: number;
  itemHeight?: number | string;
  className?: string;
  gridClassName?: string;
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({
  items = 4,
  itemHeight = 256,
  className = "",
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full",
}) => {
  return (
    <div className={`${gridClassName} ${className}`} data-testid="grid-skeleton">
      {Array.from({ length: items }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full rounded-lg"
          style={{ height: typeof itemHeight === "number" ? `${itemHeight}px` : itemHeight }}
        />
      ))}
    </div>
  );
};

export default GridSkeleton; 