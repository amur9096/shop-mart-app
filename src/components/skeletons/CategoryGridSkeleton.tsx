import CategoryCardSkeleton from "./CategoryCardSkeleton";

type CategoryGridSkeletonProps = {
  count?: number;
  withHover?: boolean;
};

export default function CategoryGridSkeleton({
  count = 12,
  withHover = false,
}: CategoryGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} withHover={withHover} />
      ))}
    </div>
  );
}
