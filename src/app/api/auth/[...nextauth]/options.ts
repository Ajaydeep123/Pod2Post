import prisma from "@/lib/db.config";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}

export interface CustomUser extends Omit<User, 'id'> {
  id?: string;
  provider?: string;
}

export const authOptions: AuthOptions = {
  pages: { signIn: "/" },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user.email || !user.name || !account?.providerAccountId || !account?.provider) {
          return false;
        }
        
        const findUser = await prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            email: user.email,
            name: user.name,
            oauth_id: account.providerAccountId,
            provider: account.provider,
            image: user.image ?? null,
          },
        });
        user.id = findUser.id.toString();
        return true;
      } catch (error) {
        console.error("Sign-in error:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};