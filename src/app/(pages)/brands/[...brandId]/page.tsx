import AddToCart from "@/components/addToCart/page";
import MyStarIcon from "@/components/myStar/myStarIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandI, ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import Link from "next/link";

export default async function BrandDetails({ params }: { params: Params }) {
  const { brandId } = await params;

  const [brandRes, productRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
      cache: "no-store",
    }),
    fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
      cache: "no-store",
    }),
  ]);

  const { data: brand }: { data: BrandI } = await brandRes.json();
  const { data: products }: { data: ProductI[] } = await productRes.json();

  return (
    <div className="py-6 sm:py-10 space-y-6 px-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{brand.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Products from this brand
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col h-full drop-shadow-lg hover:drop-shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <Link href={`/products/${product.id}`} className="flex-1">
              <CardHeader className="space-y-2 p-3 sm:p-6">

                <div className="relative w-full aspect-3/4 sm:aspect-4/5 bg-white rounded-xl overflow-hidden">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="object-contain p-3 sm:p-4"
                  />
                </div>

                <CardTitle className="text-sm sm:text-lg font-bold leading-snug line-clamp-2">
                  {product.title}
                </CardTitle>

                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-1">
                    {product.category.name}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 py-1">
                    {product.brand.name}
                  </Badge>
                </div>

                <CardDescription className="hidden sm:block line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2 px-3 pb-3 sm:px-6 sm:pb-6">
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

                <p className="text-base sm:text-lg font-bold">
                  {product.price}{" "}
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    EGP
                  </span>
                </p>
              </CardContent>
            </Link>

            <CardFooter className="pt-0 px-3 pb-3 sm:px-6 sm:pb-6">
              <div className="w-full">
                <AddToCart productId={product.id} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
