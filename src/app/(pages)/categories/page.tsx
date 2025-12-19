import { CategoryI } from "@/interfaces";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const { data: categories }: { data: CategoryI[] } = await res.json();
  console.log(categories);

  return (
    <>
      <h1 className="text-3xl font-bold py-10">Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category._id}>
            <Link href={"/categories/" + category._id}>
              <Card className="h-96 hover:drop-shadow-2xl hover:scale-3d hover:duration-300 hover:cursor-pointer">
                <CardHeader>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="w-full h-72"
                  />
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
