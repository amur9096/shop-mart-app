import React from "react";
import { BrandI } from "../../../interfaces/brand";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Brands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "no-store",
  });

  const { data: brands }: { data: BrandI[] } = await res.json();

  return (
    <div className="py-6 sm:py-10 space-y-6 px-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Brands</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Explore products from your favorite brands.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <Card className="p-3 sm:p-4 rounded-2xl border drop-shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-muted-foreground/30 cursor-pointer">
              <CardHeader className="p-0 space-y-3">

                <div className="relative w-full aspect-square sm:aspect-3/2 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-3 sm:p-6"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-sm sm:text-lg font-semibold line-clamp-1">
                    {brand.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                    View products from {brand.name}
                  </p>
                </div>

              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
