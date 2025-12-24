"use client";
import React, { useContext, useState } from "react";
import { wishListContext } from "../context/wishListContext";
import { useSession } from "next-auth/react";

import { addToWishListAction } from "@/app/(pages)/products/_action/addToWishListApi.action";
import toast from "react-hot-toast";
import { HeartIcon, Loader2 } from "lucide-react";
import { CardFooter } from "../ui/card";
import { useRouter } from "next/navigation";

export default function AddToWishList({ productId }: { productId: string }) {
  const { setWishListData, getWishList } = useContext(wishListContext);
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  async function addProduct() {
    if (session.status === "authenticated") {
      setIsLoading(true);

      const data = await addToWishListAction(productId);

      if (data.status === "success") {
        toast.success("Product added to wishlist successfully ✅");


        await getWishList();
      } else {
        toast.error(data.message || "Something went wrong");
      }

      setIsLoading(false);
    } else {
      toast.error("You must be logged in to add products to the wishlist");
      router.push("/login");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={addProduct}
        disabled={isLoading}
        aria-label="Add to wishlist"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <HeartIcon className="h-5 w-5 hover:text-red-500" />
        )}
      </button>
    </>
  );
}
