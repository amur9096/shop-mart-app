"use client";
import React, { useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader } from "lucide-react";
import toast from "react-hot-toast";

export default function AddToCart({ productId }: { productId: string }) {
    const [isLoading, setIsLoading] = useState(false);
  async function addProduct() {
    setIsLoading(true);
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      body: JSON.stringify({ productId: productId, quantity: 1 }),
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmQ3OGZjODRkOTUwYzkwMjNiZjNlZiIsIm5hbWUiOiJBbXIgS2hhbGVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ1ODc4MzksImV4cCI6MTc3MjM2MzgzOX0.Cs-fiVZOwN1YrnNs6l19XTDKDasaZ_BYS7yBTIgihwU",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    data.status === 'success' && toast.success("Product added to cart successfully");
    console.log(data);
    setIsLoading(false);
  }
  return (
    <>
      <CardFooter className="gap-2">
        <Button className="grow" onClick={addProduct} disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin" /> : "Add To Cart"}
        </Button>
        <HeartIcon />
      </CardFooter>
    </>
  );
}
