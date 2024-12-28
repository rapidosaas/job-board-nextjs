import { NextAuthOptions } from "next-auth";
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import MongoClientPromise from '@/lib/mongodb';

// Add these type augmentations
declare module "next-auth" {
  interface User {
    id: string;
  }
  interface Session {
    user: User & {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
  ],
  adapter: MongoDBAdapter(MongoClientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    // Ensure the id is included in the session
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
};