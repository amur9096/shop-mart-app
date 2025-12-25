import React from "react";
import {
  Card,
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
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { decodeJwt } from "@/app/Helpers/decodeUserIdFromToken";
import { AllOrdersI } from "@/interfaces";

export default async function AllOrders() {
  const session = await getServerSession(authOptions);

  if (!session?.token) {
    return (
      <section className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-red-600">Unauthorized</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please login to view your orders.
          </p>
          <div className="mt-6">
            <Link href="/login">
              <Button className="rounded-xl px-6 font-semibold">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const decoded = decodeJwt(session.token);
  const userId: string | undefined = decoded?.id;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: {
        token: session.token,
      },
      cache: "no-store",
    }
  );

  const json = await res.json();

  const ordersDetails: AllOrdersI[] = Array.isArray(json)
    ? json
    : json?.data ?? [];

  if (ordersDetails.length === 0) {
    return (
      <section className="bg-background text-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-xl rounded-3xl border-b border-border bg-card p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              📦
            </div>

            <h2 className="text-2xl font-bold tracking-tight">
              No Orders Yet...
            </h2>

            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              You haven't placed any orders yet. Start shopping now and your
              orders will appear here.
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
    );
  }

  return (
    <section className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {ordersDetails.map((order) => (
            <Card
              key={order.id}
              className="rounded-2xl border border-border bg-card shadow-sm"
            >
              <CardHeader>
                <CardTitle className="font-semibold text-2xl">
                  Order ID: {order._id}
                </CardTitle>

                <CardDescription>
                  Order Date: {new Date(order.createdAt).toLocaleString()}
                </CardDescription>

                <CardDescription>
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
                  Total:{" "}
                  <span className="font-bold text-lg ">
                    {order.totalOrderPrice} EGP
                  </span>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <h3 className="font-semibold text-2xl">Shipping Address</h3>
                <div className="flex gap-2">
                  <p>{order.shippingAddress?.details ?? "No Address"}</p>,
                  <p>{order.shippingAddress?.city ?? "No City"}</p>
                </div>
                <p>{order.shippingAddress?.phone ?? "No Phone"}</p>
              </CardContent>

              <CardFooter className="justify-between">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="font-medium">View Order Items</Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-80">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 border-b pb-2 mb-2 cursor-pointer hover:bg-muted"
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
                            <p className="font-semibold">
                              {item.product.title}
                            </p>
                            <p>Price: {item.price} EGP</p>
                            <p>Qty: {item.count}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>

                <p>Last Update: {new Date(order.updatedAt).toLocaleString()}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
