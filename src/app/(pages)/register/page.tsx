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

const formSchema = z
  .object({
    name: z
      .string()
      .nonempty("name is required")
      .min(3, "name must be at least 3 characters")
      .max(50, "name must be at most 50 characters"),

    email: z
      .string()
      .nonempty("email is required")
      .min(3, "email must be at least 3 characters")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email"
      ),

    password: z
      .string()
      .nonempty("password is required")
      .min(8, "password must be at least 8 characters")
      .max(20, "password must be at most 20 characters")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),

    confirmPassword: z.string().nonempty("confirm password is required"),
    Phone: z.string().nonempty("phone number is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      Phone: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (res.ok && data.message == "success") {
      router.push("/login");
      return;
    }

    if (res.status === 409) {
      form.setError("email", { type: "manual", message: data.message });
      router.push("/login?reason=exists");
      return;
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[75vh] ">
        <h1 className="text-4xl font-bold mb-8">Register Now & Join Us </h1>

        <Card className="p-5 w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Amr" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="phone"
                        placeholder="Phone Number without country code"
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
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
