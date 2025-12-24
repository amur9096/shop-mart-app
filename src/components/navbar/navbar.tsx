"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Heart, Loader2, ShoppingCart, UserIcon } from "lucide-react";
import { ModeToggle } from "../theme/Theme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { cartContext } from "../context/cartContext";
import { wishListContext } from "../context/wishListContext";

export default function Navbar() {
  const { cartData, isLoading: cartLoading } = useContext(cartContext);
  const { wishListData, isLoading: wishListLoading } =
    useContext(wishListContext);
  const pathname = usePathname();
  const session = useSession();
  const isAuth = session.status === "authenticated";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
            S
          </span>
          <span className="tracking-tight">ShopMart</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-md font-medium text-muted-foreground">
          <Link className="hover:text-foreground transition " href="/products">
            Products
          </Link>
          <Link className="hover:text-foreground transition" href="/brands">
            Brands
          </Link>
          <Link className="hover:text-foreground transition" href="/categories">
            Categories
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />

          {isAuth && pathname !== "/wishlist" && (
            <Link
              href="/wishlist"
              className="relative p-2 rounded-xl hover:bg-muted transition"
            >
              <Heart className="h-5 w-5 " />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-xs">
                {wishListLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  wishListData?.count ?? 0
                )}
              </Badge>
            </Link>
          )}

          {isAuth && pathname !== "/cart" && (
            <Link
              href="/cart"
              className="relative p-2 rounded-xl hover:bg-muted transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-xs">
                {cartLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  cartData?.numOfCartItems ?? 0
                )}
              </Badge>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <UserIcon className="h-5 w-5 " />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {isAuth ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/allorders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
