import { getUserToken } from "@/app/Helpers/getUserToken";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductI } from "@/interfaces";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function WishList(productId: string) {
  const token = await getUserToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId: productId, quantity: 1 }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const { data: product }: { data: ProductI[] } = await res.json();
  console.log(product);

  return (
    <>
      <h1 className="text-3xl font-bold pt-10">WishList Page</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {product.map((product) => (
          <div key={product._id}>
            <Link href={"/categories/" + product._id}>
              <Card className="h-96 hover:drop-shadow-2xl hover:scale-3d hover:duration-300 hover:cursor-pointer">
                <CardHeader>
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-72"
                  />
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
