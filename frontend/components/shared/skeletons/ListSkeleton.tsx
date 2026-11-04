import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface ListSkeletonProps {
  items?: number;
  itemHeight?: number | string;
  className?: string;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  items = 4,
  itemHeight = 64,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`} data-testid="list-skeleton">
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

export default ListSkeleton; 