import React from "react";
import { BrandI } from "../../../interfaces/brand";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AddToCart from "@/components/addToCart/page";
import Link from "next/link";

export default async function Brands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brands }: { data: BrandI[] } = await res.json();
  console.log(brands);

  return (
    <>
      <h1 className="text-3xl font-bold py-10">Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
        {brands.map((brand) => (
          <div key={brand._id}>
            <Link href={"/brands/" + brand._id}>
              <Card className="hover:drop-shadow-2xl hover:scale-3d hover:duration-300 hover:cursor-pointer">
                <CardHeader>
                  <Image
                    src={brand.image}
                    alt=""
                    width={300}
                    height={300}
                    className="w-full"
                  />
                  <CardTitle>{brand.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
