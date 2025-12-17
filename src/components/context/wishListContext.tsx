"use client";
import { WishListResponse } from "@/interfaces";
import { createContext, useEffect, useState } from "react";

export const wishListContext = createContext<{
  wishListData: WishListResponse | null;
  setWishListData: (value: WishListResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getWishList: () => void;
}>({
  wishListData: null,
  setWishListData: () => {},
  isLoading: false,
  setIsLoading: () => {},
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
    const res = await fetch("http://localhost:3000/api/get-wishlist");
    const data: WishListResponse = await res.json();
    setWishListData(data);
    console.log(data);

    setIsLoading(false);
  }
  useEffect(() => {
    getWishList();
  }, []);
  return (
    <wishListContext.Provider
      value={{wishListData,setWishListData,isLoading,setIsLoading,  getWishList,}}
    >
      {children}
    </wishListContext.Provider>
  );
}
