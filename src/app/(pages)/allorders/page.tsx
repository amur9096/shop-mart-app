import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { AllOrderProductI, AllOrdersI, ProductI } from "@/interfaces";
import { getUserToken } from "@/app/Helpers/getUserToken";
import Image from "next/image";

export default async function AllOrders(userID: string) {
  const token = await getUserToken();
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/orders" + userID,
    {
      method: "GET",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  );
  const { data: ordersDetails }: { data: AllOrdersI[] } = await res.json();
  console.log(ordersDetails);

  return (
    <>
      <h1 className="text-3xl font-bold py-10">All Orders</h1>

      {ordersDetails.map((order) => (
        <div className="grid grid-cols-1 gap-6">
          <Card key={order._id} className="space-y-5 mb-5  drop-shadow-2xl">
            <CardHeader>
              <CardTitle className="font-semibold text-2xl">
                Order Number #75389
              </CardTitle>

              <CardDescription>
                Order Date: {new Date(order.createdAt).toLocaleString()}
              </CardDescription>

              <CardDescription>
                Payment:
                <span
                  className={order.isPaid ? "text-green-600" : "text-red-600"}
                >
                  {order.isPaid ? "Paid" : "Not paid"}
                </span>
              </CardDescription>
              <CardDescription>
                Delivery:{" "}
                <span
                  className={
                    order.isDelivered ? "text-green-600" : "text-yellow-700"
                  }
                >
                  {order.isDelivered ? "Delivered" : "Not delivered yet"}
                </span>
              </CardDescription>
              <CardDescription>
                Total :
                <span className="font-bold text-lg">
                  {order.totalOrderPrice} EGP
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <h3 className="font-semibold text-2xl"> Shipping Address</h3>
              <div className="flex gap-2 ">
                <p>{order.shippingAddress?.details ?? "No Address"}</p> ,
                <p>{order.shippingAddress?.city ?? "No City"}</p>
              </div>

              <p> {order.shippingAddress?.phone ?? "No Phone"}</p>
            </CardContent>

            <CardFooter className="justify-between">
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="font-medium ">View Order Items</Button>
                </PopoverTrigger>

                <PopoverContent className="w-80">
                  {order.cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 border-b pb-2 mb-2 cursor-pointer hover:bg-slate-200"
                    >
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={60}
                        height={60}
                        className="rounded"
                      />
                      <Link href={"/products/" + item.product._id}>
                        <div>
                          <p className="font-semibold">{item.product.title}</p>
                          <p>Price: {item.price} EGP</p>
                          <p>Qty: {item.count}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
              <p> Last Update: {new Date(order.updatedAt).toLocaleString()}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </>
  );
}
