import ProductsGridSkeleton from "@/components/skeletons/ProductsGridSkeleton";

export default function Loading() {
  return (
    <div className="py-10 space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-40 bg-muted rounded-md" />
        <div className="h-4 w-72 bg-muted rounded-md" />
      </div>

      <ProductsGridSkeleton count={12} />
    </div>
  );
}
