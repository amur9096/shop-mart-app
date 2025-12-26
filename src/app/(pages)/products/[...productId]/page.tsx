import { ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import MyStarIcon from "@/components/myStar/myStarIcon";
import Slider from "@/components/productSlider/Slider";
import AddToCart from "@/components/addToCart/page";
import { Badge } from "@/components/ui/badge";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId,
    { cache: "no-store" }
  );

  const { data: product }: { data: ProductI } = await res.json();

  return (
    <div className="container mx-auto py-6 sm:py-10 px-4">
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-4 sm:p-6 md:p-10 rounded-2xl shadow-lg">
        <div className="w-full">
          <div className="rounded-2xl overflow-hidden bg-white border">
            <div className="h-80 sm:h-[420px] md:h-full">
              <Slider images={product.images} altContent={product.title} />
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
          <CardHeader className="space-y-3 p-0">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs px-3 py-1">
                {product.brand.name}
              </Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1">
                {product.category.name}
              </Badge>
            </div>

            <CardTitle className="text-2xl sm:text-3xl font-bold leading-tight line-clamp-2">
              {product.title}
            </CardTitle>

            <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-none">
              {product.description}
            </CardDescription>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
              </div>

              <span className="text-xs sm:text-sm text-muted-foreground">
                ({product.ratingsQuantity})
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0 mt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-xl sm:text-2xl font-bold">
                {product.price}{" "}
                <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                  EGP
                </span>
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground">
                In Stock:{" "}
                <span className="font-semibold text-foreground">
                  {product.quantity}
                </span>
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-6">
            <div className="w-full">
              <AddToCart productId={product.id} />
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
