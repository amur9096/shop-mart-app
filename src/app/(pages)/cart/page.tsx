"use client";
import { getUserToken } from "@/app/Helpers/getUserToken";
import Loading from "@/app/loading";
import CheckOut from "@/components/checkOut/checkOut";
import { cartContext } from "@/components/context/cartContext";
import { Button } from "@/components/ui/button";
import { CartResponse } from "@/interfaces";
import { Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartData, isLoading, getCart, setCartData } = useContext(cartContext);
  const [removingId, setRemovingId] = useState<null | string>(null);
  const [updatingId, setUpdatingId] = useState<null | string>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  if (
    typeof cartData?.data.products[0]?.product == "string" ||
    cartData == null
  ) {
    getCart();
  }

  // delete item from cart
  async function removeCartItem(productId: string) {
    const token = await getUserToken();
    setRemovingId(productId);
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      }
    );
    const data: CartResponse = await res.json();
    console.log(data);
    if (data.status == "success") {
      toast.success("Item removed from cart");
      setCartData(data);
    }
    setRemovingId(null);
  }
  // update quantity
  async function updateItemQuantity(productId: string, count: number) {
    const token = await getUserToken();
    setUpdatingId(productId);
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data: CartResponse = await res.json();
    console.log(data);

    if (data.status == "success") {
      toast.success("Product quantity updated successfully");
      setCartData(data);
    }
    setUpdatingId(null);
  }
  // clear Cart
  async function clearCart() {
    const token = await getUserToken();

    setIsClearing(true);
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart/", {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    });
    const data: CartResponse = await res.json();
    console.log(data);

    if (data.message == "success") {
      // toast.success("Item removed from cart");
      setCartData(null);
    }
    setIsClearing(false);
  }

  return (
    <>
      {isLoading ||
      (typeof cartData?.data.products[0] == "string" && getCart()) ? (
        <Loading />
      ) : cartData?.numOfCartItems! > 0 ? (
        <section className="bg-white">
          <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Shopping Cart
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {cartData?.numOfCartItems} items in your cart
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
              <div className="lg:col-span-2 space-y-4">
                {cartData?.data.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-4 sm:w-1/5">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={110}
                        height={110}
                        className="h-24 w-24 rounded-xl object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {item.product.title}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {item.product?.brand?.name ?? "Brand"} •{" "}
                            {item.product?.category?.name ?? "Category"}
                          </p>
                        </div>
                        <div className="text-right text-sm text-slate-600">
                          <div className="text-lg font-semibold text-slate-900">
                            EGP {item.price}
                          </div>
                          <span>each</span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            disabled={item.count == 1}
                            aria-label="decrease"
                            className="flex size-9 items-center justify-center rounded-full border border-slate-300 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                            onClick={() =>
                              updateItemQuantity(
                                item.product._id,
                                item.count - 1
                              )
                            }
                          >
                            -
                          </button>
                          <span className="min-w-6 text-center text-base font-semibold text-slate-900">
                            {updatingId == item.product._id ? (
                              <Loader2 className=" animate-spin inline-block " />
                            ) : (
                              item.count
                            )}
                          </span>
                          <button
                            aria-label="increase"
                            onClick={() =>
                              updateItemQuantity(
                                item.product._id,
                                item.count + 1
                              )
                            }
                            className="flex size-9 items-center justify-center rounded-full border border-slate-300 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeCartItem(item.product._id)}
                          className="text-sm font-medium text-red-500 transition hover:text-red-600 hover:underline cursor-pointer"
                        >
                          {removingId == item.product._id && (
                            <Loader2 className=" animate-spin inline-block mr-1 " />
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
                    Order Summary
                  </h2>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">
                        Subtotal ({cartData?.numOfCartItems} items)
                      </span>
                      <span className="font-semibold text-slate-900">
                        EGP {cartData?.data.totalCartPrice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                      <div className="flex items-center justify-between">
                        <span>Total</span>
                        <span>{cartData?.data.totalCartPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <Button
                      variant="outline"
                      className="h-11 w-full rounded-lg border-2 border-slate-300 bg-white text-sm font-semibold text-slate-800 hover:bg-slate-50"
                    >
                      Continue Shopping
                    </Button>
                    <CheckOut cartId={cartData?.cartId!} />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex items-center gap-2 rounded-full border-2 border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    {isClearing ? (
                      <Loader2 className=" animate-spin inline-block mr-1 " />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                    clear cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Your cart is empty
          </h2>
          <p className="text-sm text-slate-500">
            Looks like you haven't added anything to your cart yet.
          </p>

          <Link href="/products">
            <Button className="mt-2 rounded-lg bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800">
              Add Products To Cart
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
