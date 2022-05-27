import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  callbacks: {
    async jwt({token, user, account, profile, isNewUser}) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      if (user?.roles) {
        token.roles = user.roles
      }
      return token
    },
    async session({session, user, token}) {
      if(token?.accessToken) {
        session.accessToken = token.accessToken
      }
      if (token?.roles) {
        user.roles = token.roles
      }
      return session
    }
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
});
