import { getUserToken } from "@/app/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token:
        token,
      "Content-Type": "application/json",
    },
  });
  const data: CartResponse = await res.json();
  return NextResponse.json(data);
}
