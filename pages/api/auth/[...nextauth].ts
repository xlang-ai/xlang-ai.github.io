import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email";
import { SendEmail } from "@/pages/utils/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@prisma/client";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "j5r8zE#9p2$@uF",
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        // send out email to the user
        console.log("Send out email");
        SendEmail(session.user.email, session.user.name);
      }
      return session;
    }
  }
}
export default NextAuth(authOptions)


