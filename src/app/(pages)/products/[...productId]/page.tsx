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
    <div className="container mx-auto py-10">
      <Card className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 md:p-10 rounded-2xl shadow-lg">
        <div className="w-full">
          <Slider images={product.images} altContent={product.title} />
        </div>

        <div className="flex flex-col h-full">
          <CardHeader className="space-y-4 p-0">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{product.brand.name}</Badge>
              <Badge variant="secondary">{product.category.name}</Badge>
            </div>

            <CardTitle className="text-3xl font-bold leading-tight">
              {product.title}
            </CardTitle>

            <CardDescription className="text-base leading-relaxed">
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

              <span className="text-sm text-muted-foreground">
                ({product.ratingsQuantity})
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-0 mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-2xl font-bold">
                {product.price}{" "}
                <span className="text-sm font-medium text-muted-foreground">
                  EGP
                </span>
              </p>

              <p className="text-sm text-muted-foreground">
                In Stock:{" "}
                <span className="font-semibold text-foreground">
                  {product.quantity}
                </span>
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-0 mt-auto pt-6">
            <AddToCart productId={product.id} />
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
