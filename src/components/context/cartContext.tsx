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
    setIsLoading(true);
    const res= await fetch('http://localhost:3000/api/get-cart')
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
