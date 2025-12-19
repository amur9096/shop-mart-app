import { getUserToken } from "@/app/Helpers/getUserToken";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  const token = await getUserToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${params.productId}`,
    {
      method: "DELETE",
      headers: { token },
    }
  );

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
