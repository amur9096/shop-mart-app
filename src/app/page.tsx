"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const session = useSession();

  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/10 via-background to-background" />

        <div className="absolute -top-32 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm sm:text-base font-semibold text-muted-foreground">
            {session?.status === "authenticated"
              ? `Welcome back, ${session?.data?.user?.name}!`
              : "Welcome to our store!"}
          </p>

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-primary">ShopMart</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-muted-foreground">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer
            service.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/products">
              <Button className="h-12 rounded-xl px-7 text-base font-semibold shadow hover:opacity-90 transition">
                Shop Now
              </Button>
            </Link>

            <Link href="/categories">
              <Button
                variant="outline"
                className="h-12 rounded-xl px-7 text-base font-semibold hover:bg-muted transition"
              >
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
