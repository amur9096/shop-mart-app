"use client";

import { CartResponse } from "@/interfaces";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => Promise<void>;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart: async () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getCart() {
    setIsLoading(true);

    try {
      const res = await fetch("/api/get-cart", { cache: "no-store" });

      if (!res.ok) {
        setCartData(null);
        return;
      }

      const data: CartResponse = await res.json();
      setCartData(data);
    } catch (err) {
      setCartData(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <cartContext.Provider
      value={{ cartData, setCartData, isLoading, setIsLoading, getCart }}
    >
      {children}
    </cartContext.Provider>
  );
}
