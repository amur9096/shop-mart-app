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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <BrandCardSkeleton key={i} withHover={withHover} />
      ))}
    </div>
  );
}
