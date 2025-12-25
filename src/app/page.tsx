"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Headphones, ShieldCheck, Truck } from "lucide-react";

export default function HomePage() {
  const session = useSession();

  return (
    <div className="py-10 space-y-14">
      <section className="relative overflow-hidden rounded-2xl border bg-background">
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-muted via-background to-muted opacity-80" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_60%)]" />

        <div className="absolute -top-32 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="container mx-auto max-w-4xl px-4 text-center flex flex-col items-center justify-center min-h-[70vh] py-16">
          <p className="text-sm sm:text-base font-semibold text-muted-foreground">
            {session?.status === "authenticated"
              ? `Welcome back, ${session?.data?.user?.name}!`
              : "Welcome to our store!"}
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to <span className="text-primary">ShopMart</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-muted-foreground">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer
            service.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-xl px-8 text-base font-semibold shadow hover:opacity-90 transition"
            >
              <Link href="/products">Shop Now</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-xl px-8 text-base font-semibold hover:bg-muted transition"
            >
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-3">
            <Truck className="h-7 w-7" />
            <h3 className="text-lg font-semibold">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Get your orders delivered quickly and safely to your doorstep.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-3">
            <ShieldCheck className="h-7 w-7" />
            <h3 className="text-lg font-semibold">Secure Payments</h3>
            <p className="text-sm text-muted-foreground">
              Your transactions are protected with trusted payment methods.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 space-y-3">
            <Headphones className="h-7 w-7" />
            <h3 className="text-lg font-semibold">24/7 Support</h3>
            <p className="text-sm text-muted-foreground">
              We're here to help you anytime you need assistance.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
