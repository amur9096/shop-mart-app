import { ProductI } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import MyStarIcon from "@/components/myStar/myStarIcon";
import Link from "next/link";
import AddToCart from "@/components/addToCart/page";

export default async function Products() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    cache: "no-store",
  });

  const { data: products }: { data: ProductI[] } = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex flex-col h-full drop-shadow-lg hover:drop-shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <Link href={"/products/" + product.id} className="flex-1">
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
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {product.category.name}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {product.brand.name}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <MyStarIcon />
                  <MyStarIcon />
                  <MyStarIcon />
                  <MyStarIcon />
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.ratingsAverage}
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
  );
}
