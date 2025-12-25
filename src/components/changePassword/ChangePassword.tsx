"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  token: string;
};

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("current password is required")
      .min(6, "current password must be at least 6 characters"),

    password: z
      .string()
      .nonempty("new password is required")
      .min(8, "password must be at least 8 characters")
      .max(20, "password must be at most 20 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),

    rePassword: z.string().nonempty("confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

type FormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordModal({ token }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Something went wrong");
        return;
      }

      toast.success("Password changed Successfully, Please login again");

      setOpen(false);
      form.reset();

      await signOut({ redirect: false });
      router.push("/login");
      router.refresh();
    } catch (error) {
      toast.error("Network error, try again");
    }
  }

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

      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black"
      >
        {isShown ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold">
          Change Password
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Update your account password securely.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="Current Password"
                      isShown={show.current}
                      toggle={() =>
                        setShow((prev) => ({ ...prev, current: !prev.current }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="New Password"
                      isShown={show.newPass}
                      toggle={() =>
                        setShow((prev) => ({ ...prev, newPass: !prev.newPass }))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="Confirm New Password"
                      isShown={show.confirm}
                      toggle={() =>
                        setShow((prev) => ({ ...prev, confirm: !prev.confirm }))
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
                  Updating...
                </span>
              ) : (
                "Save Password"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
