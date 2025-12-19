"use client";

import React, { useContext, useState } from "react";
import Loading from "@/app/loading";
import { wishListContext } from "@/components/context/wishListContext";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { getUserToken } from "@/app/Helpers/getUserToken";
import { WishListResponse } from "@/interfaces";
import AddToCart from "@/components/addToCart/page";

export default function WishList() {
  const { wishListData, isLoading, setWishListData, getWishList } =
    useContext(wishListContext);

  const [removingId, setRemovingId] = useState<string | null>(null);
  const [isClearing, setIsClearing] = useState<string | boolean>(false);

  const items = wishListData?.data ?? [];

  async function removeWishListItem(productId: string) {
    const token = await getUserToken();
    setRemovingId(productId);

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
      { method: "DELETE", headers: { token } }
    );

    const data: WishListResponse = await res.json();

    if (data.status === "success") {
      toast.success("Removed from wishlist");
      setWishListData(data);
    } else {
      toast.error("Failed to remove");
    }

    setRemovingId(null);
  }

  // async function clearWishList1() {
  //   try {
  //     setIsClearing(true);
  //     const token = await getUserToken();

  //     await Promise.all(
  //       items.map((p) =>
  //         fetch("https://ecommerce.routemisr.com/api/v1/wishlist/" + p._id, {
  //           method: "DELETE",
  //           headers: { token },
  //         })
  //       )
  //     );

  //     toast.success("Wishlist cleared");
  //     await getWishList();
  //   } catch {
  //     toast.error("Failed to clear wishlist");
  //   } finally {
  //     setIsClearing(false);
  //   }
  // }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : items.length > 0 ? (
        <section className="bg-white">
          <div className="container mx-auto px-4 py-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Wishlist
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  {items.length} items in your wishlist
                </p>
              </div>

              {/* <Button
                variant="outline"
                onClick={clearWishList}
                disabled={isClearing}
                className="flex items-center gap-2"
              >
                {isClearing ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
                Clear wishlist
              </Button> */}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2 space-y-4">
                {items.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4 sm:w-1/5">
                      <Image
                        src={product.imageCover}
                        alt={product.title ?? "Product"}
                        width={110}
                        height={110}
                        className="h-24 w-24 rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <Link href={"/products/" + product._id}>
                            <h3 className="text-lg font-semibold text-slate-900 hover:underline">
                              {product.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-slate-500">
                            {product.brand?.name ?? "Brand"} •{" "}
                            {product.category?.name ?? "Category"}
                          </p>
                        </div>

                        <div className="text-right text-sm text-slate-600">
                          <div className="text-lg font-semibold text-slate-900">
                            EGP {product.price}
                          </div>
                          <span>each</span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <AddToCart productId={product._id} />

                        <button
                          onClick={() => removeWishListItem(product._id)}
                          className="text-sm font-medium text-red-500 transition hover:text-red-600 hover:underline"
                          disabled={removingId === product._id}
                        >
                          {removingId === product._id && (
                            <Loader2 className="animate-spin inline-block mr-1" />
                          )}
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1 lg:sticky lg:top-20">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Wishlist Summary
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Total items:{" "}
                    <span className="font-semibold">{items.length}</span>
                  </p>

                  <div className="mt-4">
                    <Link href="/products">
                      <Button
                        variant="outline"
                        className="h-11 w-full rounded-lg border-2 border-slate-300 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Your WishList is empty
          </h2>
          <p className="text-sm text-slate-500">
            Looks like you haven't added anything to your WishList yet.
          </p>

          <Link href="/products">
            <Button className="mt-2 rounded-lg bg-slate-900 px-5  font-semibold text-white hover:bg-slate-800">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
