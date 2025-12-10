import { ErrorLoginResponse, SuccessLoginResponse } from "@/interfaces";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const payload: SuccessLoginResponse | ErrorLoginResponse =
          await res.json();
        if ("token" in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(payload.message);
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
