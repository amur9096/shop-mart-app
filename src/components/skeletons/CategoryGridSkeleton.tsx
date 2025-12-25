import React from "react";
import BrandCardSkeleton from "./BrandCardSkeleton";

type CategoryGridSkeletonProps = {
  count?: number;
  withHover?: boolean;
};

export default function CategoryGridSkeleton({
  count = 12,
  withHover = false,
}: CategoryGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BrandCardSkeleton key={i} withHover={withHover} />
      ))}
    </div>
  );
}
