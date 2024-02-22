import { PrismaAdapter } from "@auth/prisma-adapter";
import { default as NextAuth, NextAuthConfig } from "next-auth";

import { prisma } from "~/db";

export const options: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [],
};

export const { auth, signIn, signOut, handlers } = NextAuth(options);
