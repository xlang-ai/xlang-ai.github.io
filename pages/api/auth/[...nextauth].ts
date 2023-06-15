import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email";
import { SendEmail } from "@/pages/utils/email";
import Providers from "next-auth/providers"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session.user && token) {
        // unify the user id with mongodb user id
        session.user.id = token.id as string;
        // if has not sent the user waitlist email
        const user = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
        });
        // have not sent out email of waitlist
        if (user && !user.waitlistSent){
          console.log("sent email out!");
          SendEmail(user.email as string, user.name as string);
          // set user.waitlistSent as True
          await prisma.user.update({
            where: { id: user.id },
            data: { waitlistSent: true },
          })
        }
      }
      return session;
    }
  }
}
export default NextAuth(authOptions)


