"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  id: string;
  token: string;
};

export default function DeleteAddressBtn({ id, token }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const toastId = toast.loading("Removing address...");

      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
        {
          method: "DELETE",
          headers: { token },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.dismiss(toastId);
        toast.error(data?.message || "Failed to delete address");
        return;
      }

      toast.dismiss(toastId);
      toast.success("Address removed successfully");

      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-full py-2 text-sm font-semibold rounded-xl"
          disabled={loading}
        >
          Remove
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[92vw] max-w-md rounded-2xl p-6 sm:p-7">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="text-lg sm:text-xl font-bold">
            Delete Address?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm sm:text-base leading-relaxed">
            This action cannot be undone. This will permanently remove the
            address.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <AlertDialogCancel
            disabled={loading}
            className="w-full sm:w-auto rounded-xl"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="w-full sm:w-auto rounded-xl bg-red-600 hover:bg-red-700"
          >
            {loading ? "Removing..." : "Yes, delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
