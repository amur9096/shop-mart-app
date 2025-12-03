"use client";
import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Loader, Loader2, ShoppingCart, UserIcon } from "lucide-react";
import { cartContext } from "../context/cartContext";

export default function Navbar() {
  const { cartData, isLoading } = useContext(cartContext);
  return (
    <>
      <nav className="bg-gray-100 shadow text-2xl font-semibold py-4">
        <div className="container mx-auto ">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="rounded-lg bg-black text-white px-3 py-0.5 absolute">
                S
              </span>
              <h1 className="relative -end-11 -bottom-1 font-extrabold">
                Shop Mart
              </h1>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">Products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4 ">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserIcon />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <Link href="/profile ">
                    <DropdownMenuItem>Profile </DropdownMenuItem>
                  </Link>
                  <Link href="/login ">
                    <DropdownMenuItem>Login </DropdownMenuItem>
                  </Link>
                  <Link href="/register ">
                    <DropdownMenuItem>Register </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="relative">
                <Link href="/cart" className="cursor-pointer">
                  <ShoppingCart />
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono  absolute -top-3 -end-3">
                    {isLoading?<Loader2 className="animate-spin" />: cartData?.numOfCartItems}
                  </Badge>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
