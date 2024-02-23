import { PrismaAdapter } from "@auth/prisma-adapter";
import { default as NextAuth, NextAuthConfig } from "next-auth";
import { default as GithubProvider } from "next-auth/providers/github";

import { prisma } from "~/db";
import { env } from "~/env";

export const options: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(options);
