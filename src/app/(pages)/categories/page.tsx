import React from "react";
import { CategoryI } from "@/interfaces";
import { Card, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
    cache: "no-store",
  });

  const { data: categories }: { data: CategoryI[] } = await res.json();

  return (
    <div className="py-6 sm:py-10 space-y-6 px-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Categories</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">
          Discover products by browsing categories.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <Link key={category._id} href={`/categories/${category._id}`}>
            <Card className="p-3 sm:p-4 rounded-2xl border drop-shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-muted-foreground/30 cursor-pointer">
              <CardHeader className="p-0 space-y-3">
                <div className="relative w-full aspect-square sm:aspect-3/2 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={category?.image}
                    alt={category?.name}
                    fill
                    className="object-contain p-3 sm:p-6"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-sm sm:text-lg font-semibold line-clamp-1">
                    {category.name}
                  </h3>

                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                    View products from {category.name}
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
