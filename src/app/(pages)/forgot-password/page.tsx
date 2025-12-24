"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("email is required")
    .min(3, "email must be at least 3 characters")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    setServerError(null);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (!res.ok || data?.statusMsg === "error") {
        const msg = data?.message || "Something went wrong";
        setServerError(msg);
        toast.error(msg);
        return;
      }

      toast.success("Reset code sent to your email ✅");


      sessionStorage.setItem("resetEmail", values.email);

      router.push("/verify-reset-code");
    } catch (error) {
      setServerError("Network error, try again");
      toast.error("Network error, try again");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh]">
      <h1 className="text-4xl font-bold mb-8">Forgot Password?</h1>

      <Card className="p-5 w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Name@example.com" {...field} />
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
                  Sending...
                </span>
              ) : (
                "Send Reset Code"
              )}
            </Button>
          </form>
        </Form>
      </Card>

      <p className="mt-4 text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
