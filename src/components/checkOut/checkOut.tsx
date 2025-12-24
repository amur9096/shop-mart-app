"use client";
import React, { useRef, useState } from "react";
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
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserToken } from "@/app/Helpers/getUserToken";
import { Loader2 } from "lucide-react";

export default function CheckOut({ cartId }: { cartId: string }) {
  const detailsInput = useRef<HTMLInputElement>(null);
  const cityInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);

  const [loadingCash, setLoadingCash] = useState(false);
  const [loadingVisa, setLoadingVisa] = useState(false);

  const [open, setOpen] = useState(false);

  const router = useRouter();

  function getShippingAddress() {
    return {
      details: detailsInput.current?.value.trim() || "",
      city: cityInput.current?.value.trim() || "",
      phone: phoneInput.current?.value.trim() || "",
    };
  }

  function validateShipping(shipping: any) {
    if (!shipping.details || !shipping.city || !shipping.phone) {
      toast.error("Please fill all shipping fields");
      return false;
    }
    return true;
  }

  //  Visa Checkout Session
  async function createCheckoutSession() {
    const token = await getUserToken();
    const shippingAddress = getShippingAddress();

    if (!validateShipping(shippingAddress)) return;

    try {
      setLoadingVisa(true);
      toast.loading("Creating Visa session...", { id: "visa" });

      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          method: "POST",
          body: JSON.stringify(shippingAddress),
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to create Visa session", {
          id: "visa",
        });
        return;
      }

      toast.success("Redirecting to payment...", { id: "visa" });

      // ✅ Close Dialog before redirect
      setOpen(false);

      window.location.href = data.session.url;
    } catch {
      toast.error("Network error", { id: "visa" });
    } finally {
      setLoadingVisa(false);
    }
  }

  // ✅ Cash Order
  async function createCashOrder() {
    const token = await getUserToken();
    const shippingAddress = getShippingAddress();

    if (!validateShipping(shippingAddress)) return;

    try {
      setLoadingCash(true);
      toast.loading("Creating Cash order...", { id: "cash" });

      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        {
          method: "POST",
          body: JSON.stringify(shippingAddress),
          headers: {
            token,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to create order", { id: "cash" });
        return;
      }

      toast.success("Order created successfully ✅", { id: "cash" });

      // ✅ Close dialog automatically after success
      setOpen(false);

      router.push("/allorders");
      router.refresh();
    } catch {
      toast.error("Network error", { id: "cash" });
    } finally {
      setLoadingCash(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <Input
            ref={detailsInput}
            placeholder="Details (street, building...)"
          />
          <Input ref={cityInput} placeholder="City" />
          <Input ref={phoneInput} placeholder="Phone" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>

          <Button
            type="button"
            disabled={loadingVisa}
            onClick={createCheckoutSession}
          >
            {loadingVisa ? <Loader2 /> : "Visa"}
          </Button>

          <Button
            type="button"
            disabled={loadingCash}
            onClick={createCashOrder}
          >
            {loadingCash ? <Loader2 /> : "Cash"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
