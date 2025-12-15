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
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("email is required")
    .min(3, "email must be at least 3 characters")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "invalid email"),

  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password must be at least 8 characters")
    .max(20, "password must be at most 20 characters")
    .regex(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  console.log(searchParams.get("error"));

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: true,
      callbackUrl: "/",
    });
    setIsLoading(false);
    console.log(res);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[75vh] ">
        <h1 className="text-4xl font-bold mb-8">Login Page</h1>

        <Card className="p-5 w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full cursor-pointer " type="submit">
                {isLoading && <Loader2 className="animate-spin" />}
                Submit
              </Button>

              {searchParams.get("error") && (
                <p className="text-red-500 text-center">
                  {searchParams.get("error")}
                </p>
              )}
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}

// register like signin in everything 