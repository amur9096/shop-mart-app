import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center">
        <h1 className="text-6xl font-extrabold">Welcome to ShopMart</h1>
        <p className="text-gray-500 max-w-190 text-xl">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>
        <div className="flex gap-2">
          <Button size="icon-lg">Shop Now</Button>
          <Button variant={"outline"} size="icon-lg">
            Browse Categories
          </Button>
        </div>
      </div>
    </>
  );
}
