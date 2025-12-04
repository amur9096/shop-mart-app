"use client";
import { CartResponse } from "@/interfaces";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: () => {},
});

export default function cartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  async function getCart() {
    setIsLoading;
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmQ3OGZjODRkOTUwYzkwMjNiZjNlZiIsIm5hbWUiOiJBbXIgS2hhbGVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ1ODc4MzksImV4cCI6MTc3MjM2MzgzOX0.Cs-fiVZOwN1YrnNs6l19XTDKDasaZ_BYS7yBTIgihwU",
        "Content-Type": "application/json",
      },
    });
    const data: CartResponse = await res.json();
    setCartData(data);
    console.log(data);

    setIsLoading(false);
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <cartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading , getCart}}
    >
      {children}
    </cartContext.Provider>
  );
}
