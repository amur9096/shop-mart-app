import AddToCart from "@/components/addToCart/page";
import MyStarIcon from "@/components/myStar/myStarIcon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { CategoryI, ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryDetails({ params }: { params: Params }) {
  const { categoryId } = await params;

  const [catRes, prodRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`),
    fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
    ),
  ]);

  const { data: category }: { data: CategoryI } = await catRes.json();
  const { data: products }: { data: ProductI[] } = await prodRes.json();

  return (
    <div className="py-6 sm:py-10 space-y-6 px-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{category.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Products in this category
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-8 sm:p-10 text-center space-y-3 bg-muted/30">
          <h2 className="text-lg sm:text-xl font-semibold">No products found</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            This category doesn't have any products yet.
          </p>

          <Link
            href="/products"
            className="inline-block text-primary text-sm sm:text-base font-medium hover:underline"
          >
            Browse all products from {category?.name}
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((productItem) => (
              <Card
                key={productItem.id}
                className="flex flex-col h-full drop-shadow-sm hover:drop-shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <Link href={`/products/${productItem.id}`} className="flex-1">
                  <CardHeader className="space-y-2 p-3 sm:p-4">
                    <div className="relative w-full aspect-3/4 sm:aspect-4/5 bg-white rounded-xl overflow-hidden">
                      <Image
                        src={productItem.imageCover}
                        alt={productItem.title}
                        fill
                        className="object-contain p-3 sm:p-4"
                      />
                    </div>

                    <CardTitle className="text-sm sm:text-lg font-bold line-clamp-2">
                      {productItem.title}
                    </CardTitle>

                    <div className="flex flex-wrap gap-1 text-[10px] sm:text-xs text-muted-foreground">
                      <span>{productItem.category.name}</span>
                      <span>•</span>
                      <span>{productItem.brand.name}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2 px-3 pb-3 sm:px-4 sm:pb-4">
                    <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <MyStarIcon />
                      <MyStarIcon />
                      <MyStarIcon />
                      <MyStarIcon />
                      <span className="ml-1">{productItem.ratingsQuantity}</span>
                    </div>

                    <p className="text-base sm:text-lg font-bold">
                      {productItem.price}{" "}
                      <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                        EGP
                      </span>
                    </p>
                  </CardContent>
                </Link>

                <CardFooter className="px-3 pb-3 sm:px-4 sm:pb-4 pt-0">
                  <div className="w-full">
                    <AddToCart productId={productItem.id} />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
