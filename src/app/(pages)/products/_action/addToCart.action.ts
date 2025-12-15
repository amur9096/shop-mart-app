"use server";

import { getUserToken } from "@/app/Helpers/getUserToken";

export async function addToCartAction(productId: string) {
  const token = await getUserToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId: productId, quantity: 1 }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
