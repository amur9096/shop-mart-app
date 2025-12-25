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
    <div className="py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <p className="text-muted-foreground mt-2">Products from this brand</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col h-full drop-shadow-lg hover:drop-shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <Link href={`/products/${product.id}`} className="flex-1">
              <CardHeader className="space-y-3">
                <div className="relative w-full aspect-4/5 bg-white rounded-xl overflow-hidden">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <CardTitle className="text-lg font-bold leading-snug">
                  {product.title.split(" ", 2).join(" ")}
                </CardTitle>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{product.category.name}</Badge>
                  <Badge variant="secondary">{product.brand.name}</Badge>
                </div>

                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
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

                <p className="text-lg font-bold">
                  {product.price}{" "}
                  <span className="text-sm font-medium text-muted-foreground">
                    EGP
                  </span>
                </p>
              </CardContent>
            </Link>

            <CardFooter className="pt-0">
              <AddToCart productId={product.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
