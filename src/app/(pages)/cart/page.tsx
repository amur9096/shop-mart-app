"use client";

import React, { useContext, useEffect, useState } from "react";
import { getUserToken } from "@/app/Helpers/getUserToken";
import Loading from "@/app/loading";
import CheckOut from "@/components/checkOut/checkOut";
import { cartContext } from "@/components/context/cartContext";
import { Button } from "@/components/ui/button";
import { CartResponse } from "@/interfaces";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartData, isLoading, getCart, setCartData } = useContext(cartContext);

  const [removingId, setRemovingId] = useState<null | string>(null);
  const [updatingId, setUpdatingId] = useState<null | string>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  const cartItems = cartData?.data?.products ?? [];
  const numItems = cartData?.numOfCartItems ?? cartItems.length;

  useEffect(() => {
    getCart();
  }, []);

  //  remove item from CArt
  async function removeCartItem(productId: string) {
    const token = await getUserToken();
    setRemovingId(productId);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        {
          method: "DELETE",
          headers: { token },
        }
      );

      const data: CartResponse = await res.json();

      if (data.status === "success") {
        toast.success("Item removed from cart");
        await getCart();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setRemovingId(null);
  }

  //  update item quantity in Cart
  async function updateItemQuantity(productId: string, count: number) {
    const token = await getUserToken();
    setUpdatingId(productId);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
        {
          method: "PUT",
          body: JSON.stringify({ count }),
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      const data: CartResponse = await res.json();

      if (data.status === "success") {
        toast.success("Quantity updated");
        await getCart();
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setUpdatingId(null);
  }

  // clear cart (Remove all items from cart)
  async function clearCart() {
    const token = await getUserToken();
    setIsClearing(true);

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "DELETE",
        headers: { token },
      });

      const data = await res.json();

      if (data.message === "success") {
        toast.success("Cart cleared");
        setCartData(null);
        await getCart();
      } else {
        toast.error("Failed to clear cart");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }

    setIsClearing(false);
  }

  if (isLoading) return <Loading />;

  return (
    <>
      {cartItems.length > 0 ? (
        <section className="bg-background text-foreground">
          <div className="container mx-auto px-4 py-10">
            <div className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-8">
              <h1 className="text-3xl font-bold tracking-tight">
                Shopping Cart
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                {numItems} items in your cart
              </p>

              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
                <div className="lg:col-span-2 space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col gap-4 rounded-2xl border border-border bg-background/40 p-5 transition hover:shadow-md sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4 sm:w-1/5">
                        {item?.product?.imageCover?.trim() ? (
                          <Image
                            src={item.product.imageCover}
                            alt={item?.product?.title ?? "Product image"}
                            width={110}
                            height={110}
                            className="h-24 w-24 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="h-24 w-24 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {item?.product?.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item?.product?.brand?.name ?? "Brand"} •{" "}
                              {item?.product?.category?.name ?? "Category"}
                            </p>
                          </div>

                          <div className="text-right text-sm text-muted-foreground">
                            <div className="text-lg font-semibold text-foreground">
                              {item?.price} EGP
                            </div>
                            <span>each</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              disabled={
                                item?.count === 1 ||
                                updatingId === item.product._id
                              }
                              aria-label="decrease"
                              className="flex size-9 items-center justify-center rounded-full border border-border text-lg font-semibold text-foreground transition hover:bg-muted disabled:opacity-50"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product._id,
                                  item.count - 1
                                )
                              }
                            >
                              -
                            </button>

                            <span className="min-w-6 text-center text-base font-semibold">
                              {updatingId === item.product._id ? (
                                <Loader2 className="animate-spin inline-block" />
                              ) : (
                                item.count
                              )}
                            </span>

                            <button
                              disabled={updatingId === item.product._id}
                              aria-label="increase"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product._id,
                                  item.count + 1
                                )
                              }
                              className="flex size-9 items-center justify-center rounded-full border border-border text-lg font-semibold text-foreground transition hover:bg-muted disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeCartItem(item.product._id)}
                            disabled={removingId === item.product._id}
                            className="text-sm font-medium text-red-500 transition hover:text-red-600 hover:underline cursor-pointer disabled:opacity-50"
                          >
                            {removingId === item.product._id && (
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
                  <div className="rounded-2xl border border-border bg-background/40 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">Order Summary</h2>

                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>Subtotal ({numItems} items)</span>
                        <span className="font-semibold text-foreground">
                          EGP {cartData?.data?.totalCartPrice ?? 0}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span>Shipping</span>
                        <span className="font-semibold text-green-500">
                          Free
                        </span>
                      </div>

                      <div className="border-t border-border pt-3 text-base font-semibold text-foreground">
                        <div className="flex items-center justify-between">
                          <span>Total</span>
                          <span>{cartData?.data?.totalCartPrice ?? 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="my-6 space-y-5">
                      <Link href="/products">
                        <Button
                          variant="outline"
                          className="h-11 w-full rounded-xl font-semibold"
                        >
                          Continue Shopping
                        </Button>
                      </Link>

                      {cartData?.cartId && (
                        <CheckOut cartId={cartData.cartId} />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      disabled={isClearing}
                      className="flex items-center gap-2 rounded-full border border-red-500/30 text-red-500 hover:bg-red-500/10 disabled:opacity-50"
                    >
                      {isClearing ? (
                        <Loader2 className="animate-spin inline-block mr-1" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                      Clear cart
                    </Button>
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
                📦
              </div>

              <h2 className="text-2xl font-bold tracking-tight">
                No Items In Your Cart Yet...
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
