"use server"
export async function addToCartAction(productId: string) {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      body: JSON.stringify({ productId: productId, quantity: 1 }),
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmQ3OGZjODRkOTUwYzkwMjNiZjNlZiIsIm5hbWUiOiJBbXIgS2hhbGVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ1ODc4MzksImV4cCI6MTc3MjM2MzgzOX0.Cs-fiVZOwN1YrnNs6l19XTDKDasaZ_BYS7yBTIgihwU",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
}