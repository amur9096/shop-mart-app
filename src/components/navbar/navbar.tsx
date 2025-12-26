"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Heart, Loader2, ShoppingCart, UserIcon, Menu } from "lucide-react";
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
import { useContext } from "react";
import { cartContext } from "../context/cartContext";
import { wishListContext } from "../context/wishListContext";

export default function Navbar() {
  const { cartData, isLoading: cartLoading } = useContext(cartContext);
  const { wishListData, isLoading: wishListLoading } =
    useContext(wishListContext);

  const pathname = usePathname();
  const session = useSession();
  const isAuth = session.status === "authenticated";

  const wishCount = wishListData?.count ?? 0;
  const cartCount = cartData?.numOfCartItems ?? 0;

  const dropdownAnimation =
    "rounded-xl border bg-popover p-2 shadow-md " +
    "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 " +
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";

  const navLinkClass = (href: string) => {
    const isActive = pathname === href;

    return `w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
      hover:bg-muted hover:text-foreground
      ${
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-muted-foreground"
      }`;
  };

  const ActiveDot = ({ href }: { href: string }) =>
    pathname === href ? (
      <span className="h-2 w-2 rounded-full bg-primary" />
    ) : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-3 sm:px-4">
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
            S
          </span>
          <span className="tracking-tight hidden sm:inline">ShopMart</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-md font-medium">
          <Link
            className={`px-3 py-1 rounded-full transition hover:bg-muted ${
              pathname === "/products"
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
            href="/products"
          >
            Products
          </Link>

          <Link
            className={`px-3 py-1 rounded-full transition hover:bg-muted ${
              pathname === "/brands"
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
            href="/brands"
          >
            Brands
          </Link>

          <Link
            className={`px-3 py-1 rounded-full transition hover:bg-muted ${
              pathname === "/categories"
                ? "bg-muted text-foreground"
                : "text-muted-foreground"
            }`}
            href="/categories"
          >
            Categories
          </Link>
        </nav>

        <div className="flex items-center gap-1 rounded-full border bg-background/80 px-2 py-1 shadow-sm">
          <ModeToggle />

          {isAuth && pathname !== "/wishlist" && (
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full hover:bg-muted transition"
            >
              <Heart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-xs">
                {wishListLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  wishCount
                )}
              </Badge>
            </Link>
          )}

          {isAuth && pathname !== "/cart" && (
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-muted transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center rounded-full text-xs">
                {cartLoading ? <Loader2 className="animate-spin" /> : cartCount}
              </Badge>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className={`w-52 ${dropdownAnimation}`}
            >
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {isAuth ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className={navLinkClass("/profile")}>
                      <ActiveDot href="/profile" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/allorders"
                      className={navLinkClass("/allorders")}
                    >
                      <ActiveDot href="/allorders" />
                      Orders
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-red-500 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login" className={navLinkClass("/login")}>
                      <ActiveDot href="/login" />
                      Login
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/register"
                      className={navLinkClass("/register")}
                    >
                      <ActiveDot href="/register" />
                      Register
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className={`w-52 ${dropdownAnimation}`}
              >
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/products" className={navLinkClass("/products")}>
                    <ActiveDot href="/products" />
                    Products
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/brands" className={navLinkClass("/brands")}>
                    <ActiveDot href="/brands" />
                    Brands
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/categories"
                    className={navLinkClass("/categories")}
                  >
                    <ActiveDot href="/categories" />
                    Categories
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
