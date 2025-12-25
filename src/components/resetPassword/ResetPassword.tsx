"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  triggerText?: string;
};

const resetSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("new password is required")
      .min(8, "password must be at least 8 characters")
      .max(20, "password must be at most 20 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: z.string().nonempty("confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordModal({
  triggerText = "Reset Password",
}: Props) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState({ pass: false, confirm: false });
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const PasswordInput = ({
    field,
    placeholder,
    isShown,
    toggle,
  }: {
    field: any;
    placeholder: string;
    isShown: boolean;
    toggle: () => void;
  }) => (
    <div className="relative">
      <Input
        type={isShown ? "text" : "password"}
        placeholder={placeholder}
        {...field}
        className="pr-10"
      />

      {field.value?.length > 0 && (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black"
        >
          {isShown ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );

  async function onSubmit(values: FormValues) {
    const email = sessionStorage.getItem("resetEmail");

    if (!email) {
      toast.error("No email found. Please start from Forgot Password.");
      return;
    }

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            newPassword: values.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Reset password failed");
        return;
      }

      toast.success("Password reset successfully ");

      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetVerified");

      form.reset();
      setOpen(false);

      router.push("/login");
    } catch {
      toast.error("Network error, try again");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>Enter your new password below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="New Password"
                      isShown={show.pass}
                      toggle={() => setShow((p) => ({ ...p, pass: !p.pass }))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="Confirm Password"
                      isShown={show.confirm}
                      toggle={() =>
                        setShow((p) => ({ ...p, confirm: !p.confirm }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
