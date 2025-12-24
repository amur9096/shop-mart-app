"use client";

import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { cartContext } from "../context/cartContext";
import { addToCartAction } from "@/app/(pages)/products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddToWishList from "../addToWishList/AddtoWishList";

type AddToCartProps = {
  productId: string;
  hideWishListButton?: boolean;
  variant?: "card" | "inline"; // ✅ مهم جدًا
};

export default function AddToCart({
  productId,
  hideWishListButton = false,
  variant = "card", // ✅ default: نفس شكل Products
}: AddToCartProps) {
  const { setCartData } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  async function addProduct() {
    if (session.status === "authenticated") {
      setIsLoading(true);

      const data = await addToCartAction(productId);

      if (data.status === "success") {
        toast.success("Product added to cart successfully");
        setCartData(data);
      }

      setIsLoading(false);
    } else {
      toast.error("You must be logged in to add products to the cart");
      router.push("/login");
    }
  }

  // ✅ Layout for Wishlist / pages not using CardFooter
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-2">
        <Button
          className="w-full rounded-xl font-semibold"
          onClick={addProduct}
          disabled={isLoading}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Add To Cart"}
        </Button>

        {!hideWishListButton && <AddToWishList productId={productId} />}
      </div>
    );
  }

  // ✅ Default layout for Products page (keeps old UI)
  return (
    <CardFooter className="gap-2">
      <Button className="grow" onClick={addProduct} disabled={isLoading}>
        {isLoading ? <Loader className="animate-spin" /> : "Add To Cart"}
      </Button>

      {!hideWishListButton && <AddToWishList productId={productId} />}
    </CardFooter>
  );
}
