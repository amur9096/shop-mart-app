import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Card className="max-w-lg w-full rounded-2xl border shadow-sm">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-fit rounded-2xl border p-4">
            <SearchX className="w-10 h-10 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight">404</h1>
            <h2 className="text-xl font-semibold">Page not found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or was moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-xl">
              <Link href="/">Go Home</Link>
            </Button>

            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
