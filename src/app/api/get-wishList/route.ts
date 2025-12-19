import { getUserToken } from "@/app/Helpers/getUserToken";
import { WishListResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
    const token = await getUserToken();
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: {
        token:
            token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })
    const data : WishListResponse = await res.json();
    return NextResponse.json(data);
}