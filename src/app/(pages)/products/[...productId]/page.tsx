import { ProductI } from "@/interfaces";
import { Params } from "next/dist/server/request/params";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MyStarIcon from "@/components/myStar/myStarIcon";
import Slider from "@/components/productSlider/Slider";
import AddToCart from "@/components/addToCart/page";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products/" + productId
  );
  const { data: product }: { data: ProductI } = await res.json();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <Card className="grid md:grid-cols-2 items-center w-3/4 mx-auto gap-4">
          <div>
            <Slider images={product.images} altContent={product.title} />
          </div>
          <div>
            <CardHeader>
              <CardDescription>{product.brand.name}</CardDescription>

              <CardTitle>{product.title}</CardTitle>

              <CardDescription>{product.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <CardDescription>{product.category.name}</CardDescription>
              <div className="flex items-center gap-1 ">
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
                <span className="ml-2">({product.ratingsQuantity})</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="font-bold">{product.price} EGP</p>
                <p className="font-bold">Quantity: {product.quantity} </p>
              </div>
            </CardContent>

            <AddToCart productId={product.id} />
          </div>
        </Card>
      </div>
    </>
  );
}
