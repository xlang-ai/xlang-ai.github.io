import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: "929416102259-k1tgd4ue71g0e81kii3uaq2ua2uildo6.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)


