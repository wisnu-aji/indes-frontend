import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../prisma/connection";

export default NextAuth({
  // adapter: PrismaAdapter(prisma),

  callbacks: {
    async signIn({ user }) {
      if (user.email) {
        const isExist = await prisma.adminUtama.findFirst({
          where: { email: user.email },
        });
        if (isExist) return true;
        const isExist2 = await prisma.admin.findFirst({
          where: { email: user.email },
        });
        if (isExist2) return true;
      }
      return "/admin?error=true";
    },
    async jwt({ token }) {
      if (token.email && !token.role) {
        const isAdminUtama = await prisma.adminUtama.findFirst({
          where: { email: token.email },
        });

        if (isAdminUtama) {
          token.role = "admin-utama";
          token.name = isAdminUtama.name;
        } else {
          const isAdmin = await prisma.admin.findFirst({
            where: { email: token.email },
          });
          if (isAdmin) {
            token.role = "admin";
            token.name = isAdmin.name;
          }
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      if (token?.role && token?.name) {
        session.role = token.role;
        session.user!.name = token?.name;
      }

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
});
