import { Skeleton } from "@/components/ui/skeleton";
import ProductsGridSkeleton from "@/components/skeletons/ProductsGridSkeleton";

export default function LoadingBrands() {
  return (
    <div className="py-10 space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-[320px]" />
      </div>

      <ProductsGridSkeleton count={4} />
    </div>
  );
}
