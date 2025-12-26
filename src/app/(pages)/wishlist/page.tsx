"use client";

import React, { useContext, useState } from "react";
import Loading from "@/app/loading";
import { wishListContext } from "@/components/context/wishListContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { getUserToken } from "@/app/Helpers/getUserToken";
import { WishListResponse } from "@/interfaces";
import AddToCart from "@/components/addToCart/page";

export default function WishList() {
  const { wishListData, isLoading, getWishList } = useContext(wishListContext);

  const [removingId, setRemovingId] = useState<string | null>(null);

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
      await getWishList();
    } else {
      toast.error("Failed to remove");
    }

    setRemovingId(null);
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : items.length > 0 ? (
        <section className="bg-background text-foreground">
          <div className="container mx-auto px-4 py-6 sm:py-10">
            <div className="rounded-2xl border border-border bg-background/40 p-4 sm:p-6 transition hover:shadow-md">

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Wishlist
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  {items.length} items in your wishlist
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">

                <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                  {items.map((product) => (
                    <div
                      key={product._id}
                      className="flex gap-4 rounded-2xl border border-border bg-background/40 p-4 sm:p-5 transition hover:shadow-md"
                    >
                      <div className="shrink-0">
                        <Image
                          src={product?.imageCover}
                          alt={product?.title ?? "Product"}
                          width={90}
                          height={90}
                          className="h-[90px] w-[90px] sm:h-24 sm:w-24 rounded-xl object-cover bg-white"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link href={"/products/" + product._id}>
                              <h3 className="text-base sm:text-lg font-semibold hover:underline line-clamp-2">
                                {product?.title}
                              </h3>
                            </Link>

                            <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-1">
                              {product?.brand?.name ?? "Brand"} •{" "}
                              {product?.category?.name ?? "Category"}
                            </p>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-base sm:text-lg font-semibold text-foreground">
                              {product?.price}{" "}
                              <span className="text-xs text-muted-foreground">
                                EGP
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex-1">
                            <AddToCart
                              productId={product._id}
                              variant="inline"
                              hideWishListButton
                            />
                          </div>

                          <button
                            onClick={() => removeWishListItem(product._id)}
                            className="text-xs sm:text-sm font-medium text-red-500 transition hover:text-red-600 hover:underline disabled:opacity-50 whitespace-nowrap"
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
                  <div className="rounded-2xl border border-border bg-background/40 p-4 sm:p-6 shadow-sm">
                    <h2 className="text-base sm:text-lg font-semibold">
                      Wishlist Summary
                    </h2>

                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                      Total items:{" "}
                      <span className="font-semibold text-foreground">
                        {items.length}
                      </span>
                    </p>

                    <div className="mt-5">
                      <Link href="/products">
                        <Button
                          variant="outline"
                          className="h-11 w-full rounded-xl font-semibold"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-background text-foreground">
          <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-xl rounded-3xl border-b border-border bg-card p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                ❤️
              </div>

              <h2 className="text-2xl font-bold tracking-tight">
                No Items In Your WishList Yet...
              </h2>

              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                You haven't Put any Products yet. Start shopping now and your
                Products will appear here.
              </p>

              <div className="mt-6 flex justify-center gap-3">
                <Link href="/products">
                  <Button className="rounded-xl px-6 font-semibold">
                    Browse Products
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    variant="outline"
                    className="rounded-xl px-6 font-semibold"
                  >
                    Back Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
