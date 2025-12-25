"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(30, "Password must be less than 30 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const [show, setShow] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const verified = sessionStorage.getItem("resetVerified");
    if (!verified) {
      router.push("/forgot-password");
    }
  }, [router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    setServerError(null);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            newPassword: values.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data?.statusMsg === "fail") {
        const msg = data?.message || "Failed to reset password";
        setServerError(msg);
        toast.error(msg);
        return;
      }

      toast.success("Password reset successfully ✅");

      // ✅ clear verification flag
      sessionStorage.removeItem("resetVerified");

      router.push("/login");
    } catch (error) {
      setServerError("Network error, try again");
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

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh] px-4">
      <h1 className="text-4xl font-bold mb-8">Reset Password</h1>

      <Card className="p-6 w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="Password"
                      isShown={show.password}
                      toggle={() =>
                        setShow((prev) => ({
                          ...prev,
                          password: !prev.password,
                        }))
                      }
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
                      isShown={show.confirmPassword}
                      toggle={() =>
                        setShow((prev) => ({
                          ...prev,
                          confirmPassword: !prev.confirmPassword,
                        }))
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {serverError && (
              <p className="text-red-500 text-sm text-center">{serverError}</p>
            )}

            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </Card>

      <p className="mt-4 text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
