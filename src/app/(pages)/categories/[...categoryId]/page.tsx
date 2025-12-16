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

export default async function CategoryDetails({ params }: { params: Params }) {
  const { categoryId } = await params;

  const [catRes, prodRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`),
    fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
    ),
  ]);

  const { data: category }: { data: CategoryI } = await catRes.json();
  const { data: product }: { data: ProductI[] } = await prodRes.json();

  return (
    //need to update if there's no products display (no Products found in this category )
    <>
      <h1 className="text-3xl font-bold pt-10">{category.name}</h1>
      <p className="text-gray-600 py-7"> Products in this category</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {product.map((category) => (
          <div key={category.id}>
            <Card>
              <CardHeader>
                <Image
                  src={category.imageCover}
                  alt=""
                  width={300}
                  height={300}
                  className="w-full"
                />
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.category.name}</CardDescription>
                <CardDescription>{category.brand.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <MyStarIcon />
                  <MyStarIcon />
                  <MyStarIcon />
                  <MyStarIcon />

                  <p>{category.ratingsQuantity}</p>
                </div>
                <p className="mt-2">
                  Price:
                  <span className="font-semibold">{category.price} </span>
                  EGP
                </p>
              </CardContent>

              <AddToCart productId={category.id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
