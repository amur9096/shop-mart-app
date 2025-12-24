import { ErrorLoginResponse, SuccessLoginResponse } from "@/interfaces";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

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
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const payload: SuccessLoginResponse | ErrorLoginResponse =
          await res.json();

        if ("token" in payload) {
          return {
            ...payload.user,
            _id: payload.user._id,
            id: payload.user._id,
            token: payload.token,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = (user as any).id || (user as any)._id;
        token.token = (user as any).token;
        token.user = user as any;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.user = {
        ...(token.user as any),
        id: token.id as string,
      };
      session.token = token.token as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
