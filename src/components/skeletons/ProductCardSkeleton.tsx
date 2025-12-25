import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full drop-shadow-lg rounded-2xl">
      <CardHeader className="space-y-3">
        <Skeleton className="w-full aspect-4/5 rounded-xl" />

        <Skeleton className="h-5 w-3/4" />

        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-10" />
        </div>

        <Skeleton className="h-6 w-24" />
      </CardContent>

      <CardFooter className="pt-0">
        <Skeleton className="h-10 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
}
