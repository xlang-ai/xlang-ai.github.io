import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      assessed: boolean;
    } & DefaultSession["user"];
  }
}
