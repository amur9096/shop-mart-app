"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { cartContext } from "../context/cartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function AddToCart({ productId }: { productId: string }) {
  const { getCart, setCartData } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  async function addProduct() {
    if (session.status == "authenticated") {
      setIsLoading(true);
      const data = await addToCartAction(productId);
      data.status === "success" &&
        toast.success("Product added to cart successfully");
      console.log(data);
      setIsLoading(false);
      setCartData(data);
    } else {
      toast.error("You must be logged in to add products to the cart");
      router.push("/login");
    }
  }
  return (
    <>
      <CardFooter className="gap-2">
        <Button className="grow" onClick={addProduct} disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin" /> : "Add To Cart"}
        </Button>
        <HeartIcon />
      </CardFooter>
    </>
  );
}
