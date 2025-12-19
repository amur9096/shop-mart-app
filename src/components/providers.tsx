"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./context/cartContext";
import WishListContextProvider from "./context/wishListContext";

// Client-only wrapper for providers and client-side-only components.
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <WishListContextProvider>
        {children}
        <Toaster />
      </WishListContextProvider>
    </CartContextProvider>
  );
}
