import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "810048904934-apspkubg9fqbk7jl22p892qac8bmprf8.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
