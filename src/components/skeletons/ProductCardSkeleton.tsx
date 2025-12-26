import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full drop-shadow-lg rounded-2xl">
      <CardHeader className="space-y-3 p-3 sm:p-6">
        <Skeleton className="w-full aspect-3/4 sm:aspect-4/5 rounded-xl" />

        <Skeleton className="h-4 sm:h-5 w-3/4" />

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-4 sm:h-5 w-16 sm:w-20 rounded-full" />
          <Skeleton className="h-4 sm:h-5 w-14 sm:w-16 rounded-full" />
        </div>

        <Skeleton className="h-3 sm:h-4 w-full" />
        <Skeleton className="h-3 sm:h-4 w-4/5" />
      </CardHeader>

      <CardContent className="space-y-3 px-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 sm:h-4 w-20 sm:w-24" />
          <Skeleton className="h-3 sm:h-4 w-8 sm:w-10" />
        </div>

        <Skeleton className="h-5 sm:h-6 w-20 sm:w-24" />
      </CardContent>

      <CardFooter className="pt-0 px-3 sm:px-6 pb-3 sm:pb-6">
        <Skeleton className="h-9 sm:h-10 w-full rounded-xl" />
      </CardFooter>
    </Card>
  );
}
