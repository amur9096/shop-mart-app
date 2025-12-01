import { ProductI } from "@/interfaces";
import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MyStarIcon from "@/components/myStar/myStarIcon";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import AddToCart from "@/components/addToCart/page";

export default async function Products() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  const { data: products }: { data: ProductI[] } = await res.json();
  console.log(products[0]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <Card>
              <Link href={"/products/" + product.id}>
                <CardHeader>
                  <Image
                    src={product.imageCover}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full"
                  />
                  <CardTitle>{product.title.split(" ", 2).join(" ")}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                  <CardDescription>{product.brand.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />

                    <p>{product.ratingsAverage}</p>
                  </div>
                  <p className="mt-2">
                    Price:{" "}
                    <span className="font-semibold">{product.price} </span>
                    EGP
                  </p>
                </CardContent>
              </Link>
          <AddToCart productId={product.id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
