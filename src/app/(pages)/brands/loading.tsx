import { Skeleton } from "@/components/ui/skeleton";
import BrandsGridSkeleton from "@/components/skeletons/BrandsGridSkeleton";

export default function LoadingBrands() {
  return (
    <div className="py-10 space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-[320px]" />
      </div>

      <BrandsGridSkeleton count={12} />
    </div>
  );
}
