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
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

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
  const [showPassword, setShowPassword] = useState(false);

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
    <>
      <div className="flex flex-col justify-center items-center min-h-[75vh] ">
        <h1 className="text-4xl font-bold mb-8">Welcome Back !</h1>

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
                      <PasswordInput
                        field={field}
                        placeholder="Password"
                        isShown={showPassword}
                        toggle={() => setShowPassword((prev) => !prev)}
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
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 underline block text-center"
              >
                Forgot your password?
              </Link>

              {searchParams.get("error") && (
                <p className="text-red-500 text-center">
                  {searchParams.get("error")}
                </p>
              )}
            </form>
          </Form>
        </Card>
        <h3 className="mt-4">
          if you don't have an account, please
          <Link href={"/register"} className="text-blue-600 underline ">
            SignUp
          </Link>
          Now
        </h3>
      </div>
    </>
  );
}
