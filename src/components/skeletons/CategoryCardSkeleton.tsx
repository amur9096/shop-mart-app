import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

type CategoryCardSkeletonProps = {
  withHover?: boolean;
};

export default function CategoryCardSkeleton({
  withHover = false,
}: CategoryCardSkeletonProps) {
  return (
    <Card
      className={`p-4 rounded-2xl border drop-shadow-sm ${
        withHover
          ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-muted-foreground/30"
          : ""
      }`}
    >
      <CardHeader className="p-0 space-y-4">
        <div className="relative w-full aspect-3/2 bg-white rounded-xl overflow-hidden flex items-center justify-center">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>

        <div className="text-center space-y-2">
          <Skeleton className="h-5 w-28 mx-auto" />
          <Skeleton className="h-3 w-24 mx-auto" />
        </div>
      </CardHeader>
    </Card>
  );
}
