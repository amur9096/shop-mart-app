"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  token: string;
};

export default function AddAddressModal({ token }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.details || !form.phone || !form.city) {
      setErrorMsg("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/addresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.message || "Something went wrong");
        return;
      }

      setForm({ name: "", details: "", phone: "", city: "" });
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-6 py-2 font-semibold">+ Add New Address</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Add New Address
          </DialogTitle>
          <DialogDescription>
            Save a new address for faster checkout.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Address Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Home"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Input
              id="details"
              name="details"
              placeholder="Street, Building, Apartment..."
              value={form.details}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="0123456789"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              placeholder="Giza"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          {errorMsg && (
            <p className="text-sm font-semibold text-red-600">{errorMsg}</p>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="sm:flex-1"
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading} className="sm:flex-1">
              {loading ? "Adding..." : "Save Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
