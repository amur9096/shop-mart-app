import React from "react";
import BrandCardSkeleton from "./BrandCardSkeleton";

type BrandsGridSkeletonProps = {
  count?: number;
  withHover?: boolean;
};

export default function BrandsGridSkeleton({
  count = 12,
  withHover = false,
}: BrandsGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BrandCardSkeleton key={i} withHover={withHover} />
      ))}
    </div>
  );
}
