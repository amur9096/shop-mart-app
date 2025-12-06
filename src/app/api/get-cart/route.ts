import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "GET",
    headers: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmQ3OGZjODRkOTUwYzkwMjNiZjNlZiIsIm5hbWUiOiJBbXIgS2hhbGVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ1ODc4MzksImV4cCI6MTc3MjM2MzgzOX0.Cs-fiVZOwN1YrnNs6l19XTDKDasaZ_BYS7yBTIgihwU",
      "Content-Type": "application/json",
    },
  });
  const data: CartResponse = await res.json();
  return NextResponse.json(data);
}
