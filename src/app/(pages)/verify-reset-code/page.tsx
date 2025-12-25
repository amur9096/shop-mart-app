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
import { Card } from "@/components/ui/card";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  resetCode: z
    .string()
    .nonempty("Reset code is required")
    .regex(/^\d{6}$/, "Reset code must be 6 digits"),
});

type FormValues = z.infer<typeof formSchema>;

export default function VerifyResetCode() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { resetCode: "" },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: FormValues) {
    setServerError(null);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      if (!res.ok || data?.statusMsg === "fail") {
        const msg = data?.message || "Invalid reset code";
        setServerError(msg);
        toast.error(msg);
        return;
      }

      toast.success("Code verified ");

      sessionStorage.setItem("resetVerified", "true");

      router.push("/reset-password");
    } catch (error) {
      setServerError("Network error, try again");
      toast.error("Network error, try again");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[75vh]">
      <h1 className="text-4xl font-bold mb-8">Verify Reset Code</h1>

      <Card className="p-6 w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="self-start">Reset Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                        if (val.length === 6) {
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    >
                      <InputOTPGroup className="gap-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
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
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        </Form>
      </Card>

      <p className="mt-4 text-sm text-muted-foreground">
        Didn't receive a code?{" "}
        <Link href="/forgot-password" className="text-blue-600 underline">
          Send again
        </Link>
      </p>
    </div>
  );
}
