"use client";

import { createContext, useEffect, useState } from "react";
import { WishListResponse } from "@/interfaces";
import { getUserToken } from "@/app/Helpers/getUserToken";

export const wishListContext = createContext<{
  wishListData: WishListResponse | null;
  setWishListData: (v: WishListResponse | null) => void;
  isLoading: boolean;
  getWishList: () => void;
}>({
  wishListData: null,
  setWishListData: () => {},
  isLoading: false,
  getWishList: () => {},
});

export default function WishListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wishListData, setWishListData] = useState<WishListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getWishList() {
    setIsLoading(true);
    const token = await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: { token },
      cache: "no-store",
    });

    const data: WishListResponse = await res.json();
    setWishListData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <wishListContext.Provider value={{ wishListData, setWishListData, isLoading, getWishList }}>
      {children}
    </wishListContext.Provider>
  );
}
