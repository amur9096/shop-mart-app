import AddToCart from "@/components/addToCart/page";
import MyStarIcon from "@/components/myStar/myStarIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
    <>
      <h1 className="text-3xl font-bold pt-10">{category.name}</h1>
      <p className="text-gray-600 py-7">Products in this category</p>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center space-y-3 bg-muted/30">
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="text-muted-foreground">
            This category doesn't have any products yet.
          </p>

          <Link
            href="/products"
            className="inline-block text-primary font-medium hover:underline"
          >
            Browse all products from {category?.name}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((productItem) => (
            <div key={productItem.id}>
              <Card className="hover:drop-shadow-2xl hover:scale-3d hover:duration-300 hover:cursor-pointer">
                <Link href={`/products/${productItem.id}`}>
                  <CardHeader>
                    <Image
                      src={productItem.imageCover}
                      alt={productItem.title}
                      width={300}
                      height={300}
                      className="w-full"
                    />
                    <CardTitle>{productItem.title}</CardTitle>
                    <CardDescription>
                      {productItem.category.name}
                    </CardDescription>
                    <CardDescription>{productItem.brand.name}</CardDescription>
                  </CardHeader>
                </Link>

                <CardContent>
                  <div className="flex items-center gap-1">
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <p>{productItem.ratingsQuantity}</p>
                  </div>

                  <p className="mt-2">
                    Price:
                    <span className="font-semibold"> {productItem.price} </span>
                    EGP
                  </p>

                  <div className="mt-4">
                    <AddToCart productId={productItem.id} />
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
