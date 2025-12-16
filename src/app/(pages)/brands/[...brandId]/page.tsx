import AddToCart from "@/components/addToCart/page";
import MyStarIcon from "@/components/myStar/myStarIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrandI, ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function BrandDetails({ params }: { params: Params }) {
  const { brandId } = await params;
  const [brandRes, productRes] = await Promise.all([
    fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`),
    fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`),
  ]);
  const { data: brand }: { data: BrandI } = await brandRes.json();
  const { data: product }: { data: ProductI[] } = await productRes.json();
  return (
    <>
      <h1 className="text-3xl font-bold pt-10"> {brand.name}</h1>
      <p className="text-gray-600 py-7">Products from this brand</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {product.map((brand) => (
          <div key={brand.id}>
            <Link href={`/products/${brand.id}`}>
              <Card className="hover:drop-shadow-2xl hover:scale-3d hover:duration-300 hover:cursor-pointer">
                <CardHeader>
                  <Image
                    src={brand.imageCover}
                    alt={brand.title}
                    width={300}
                    height={300}
                    className="w-full"
                  />
                  <CardTitle>{brand.title}</CardTitle>
                  <CardDescription>{brand.title}</CardDescription>
                  <CardDescription>{brand.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />
                    <MyStarIcon />

                    <p>{brand.ratingsQuantity}</p>
                  </div>
                  <p className="mt-2">
                    Price:
                    <span className="font-semibold">{brand.price} </span>
                    EGP
                  </p>
                </CardContent>

                <AddToCart productId={brand.id} />
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
