import { UserResponse } from "@/interfaces";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserResponse & { id: string };
    token: string;
  }

  interface User extends UserResponse {
    id: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
    user?: UserResponse;
  }
}
