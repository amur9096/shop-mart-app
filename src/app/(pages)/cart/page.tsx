"use client";
import Loading from "@/app/loading";
import { cartContext } from "@/components/context/cartContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";

export default function Cart() {
  let { cartData, isLoading } = useContext(cartContext);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto py-6 px-4 ">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1 ">
            {cartData?.numOfCartItems} items in your cart
          </p>
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
            <div className="lg:col-span-2 space-y-4">
              {cartData?.data.products.map((item) => (
                <div key={item._id} className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 ">
                          {item.product.brand.name}
                           {item.product.category.name}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold ">{item.price} EGP</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-3 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        aria-label="decrease"
                        className="size-8 rounded-lg border hover:bg-accent"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-medium">
                        {item.count}
                        </span>
                      <button
                        aria-label="increase"
                        className="size-8 rounded-lg border hover:bg-accent"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label="remove"
                    className="text-sm hover:underline cursor-pointer flex text-destructive items-center"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 sticky top-18 ">
              <div className="rounded-xl border p-5 shadow-sm ">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground ">
                      Subtotal : {cartData?.numOfCartItems} items
                    </span>
                    <span className="font-semibold ">Total Price : {cartData?.data.totalCartPrice} EGP</span>
                  </div>

                  <div className="flex items-center justify-between ">
                    <span className="text-sm text-muted-foreground">

                      Shipping
                    </span>

                    <span className="font-medium text-cyan-800">Free</span>
                  </div>

                  <div className="my-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold"> Total</span>
                      <span className="font-bold text-lg "> {cartData?.data.totalCartPrice} EGP</span>
                    </div>
                    <Button className="w-full mt-4 text-lg">
                      Proceed To Checkout
                    </Button>
                    <Button className="w-full mt-4 text-lg">
                      Continue Shopping
                    </Button>
                  </div>
                </div>
                <Button
                  variant={"outline"}
                  className="text-destructive hover:text-destructive flex mt-2 ms-auto "
                >
                  <Trash2 /> Clear Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
