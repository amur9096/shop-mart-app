"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";

export default function CheckOut({ cartId }: { cartId: string }) {
  let detailsInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);
  let phonesInput = useRef<HTMLInputElement | null>(null);
  // check out session
  async function createCheckoutSession() {
    const shippingAddress = {
      details: detailsInput.current?.value,
      cityInput: cityInput.current?.value,
      phonesInput: phonesInput.current?.value,
    };
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify(shippingAddress),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmQ3OGZjODRkOTUwYzkwMjNiZjNlZiIsIm5hbWUiOiJBbXIgS2hhbGVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjQ1ODc4MzksImV4cCI6MTc3MjM2MzgzOX0.Cs-fiVZOwN1YrnNs6l19XTDKDasaZ_BYS7yBTIgihwU",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="h-11 w-full rounded-lg bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800">
              Proceed to Checkout
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Shipping Address</DialogTitle>
              <DialogDescription>
                Add your shipping address to complete your order.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label ref={detailsInput}>details</Label>
                <Input id="details" />
              </div>
              <div className="grid gap-3">
                <Label ref={cityInput}>City</Label>
                <Input id="city" />
              </div>
              <div className="grid gap-3">
                <Label ref={phonesInput}>phone</Label>
                <Input id="phone" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={() => createCheckoutSession()}>
                Visa
              </Button>
              <Button type="submit">Cash</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
