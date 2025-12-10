import { UserResponse } from "@/interfaces";

declare module "next-auth" {
  interface Session {
    user: UserResponse;
  }

  interface User {
    user: UserResponse;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserResponse;
    token: string;
  }
}
