import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "460093740617-rgb3b5dqg1elss62ot8pka0g12gjv2l5.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // ...add more providers here
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: "j5r8zE#9p2$@uF",
  }
}
export default NextAuth(authOptions)


