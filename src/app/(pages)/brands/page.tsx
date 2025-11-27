import React from "react";
import { BrandI } from "../../../interfaces/brand";
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

export default async function Brands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brands }: { data: BrandI[] } = await res.json();
  console.log(brands);

  return (
    <>
      <h1 className="text-3xl font-bold pt-10">Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand._id}>
            <Card>
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
          </div>
        ))}
      </div>
    </>
  );

  //   <>
  //     <h1 className="text-3xl font-bold pt-10">Brands</h1>
  //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  //       {brands.map((brand) => (
  //         <div key={brands._id}>
  //           <Card>
  //             <CardHeader>
  //               <Image
  //                 src={brands.image}
  //                 alt=""
  //                 width={300}
  //                 height={300}
  //                 className="w-full"
  //               />
  //               <CardTitle>{brands.name}</CardTitle>
  //             </CardHeader>
  //           </Card>
  //         </div>
  //       ))}
  //     </div>
  //   </>
  // );
}
