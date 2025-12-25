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
    <div className="py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Brands</h1>
        <p className="text-muted-foreground mt-2">
          Explore products from your favorite brands.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <Card className="p-4 rounded-2xl border drop-shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-muted-foreground/30 cursor-pointer">
              <CardHeader className="p-0 space-y-4">
                <div className="relative w-full aspect-3/2 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-6"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-semibold">{brand.name}</h3>
                  <p className="text-xs text-muted-foreground">
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
