import React from "react";
import { BrandI } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MyStarIcon from "@/components/myStar/myStarIcon";
import Link from "next/link";
import AddToCart from "@/components/addToCart/page";

export default async function BrandDetails({
  params,
}: {
  params: { brandId: string };
}) {
  const { brandId } = await params;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
  );
  const { data: brand }: { data: BrandI } = await res.json();

  return (
    <>
      <h1 className="text-3xl font-bold pt-10">{brand.name}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div>
          <Card>
            <CardHeader>
              <Image
                src={brand.image}
                alt={brand.slug}
                width={300}
                height={300}
                className="w-full"
              />
              <CardTitle>{brand.name}</CardTitle>

              <CardDescription>{brand.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
                <MyStarIcon />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
