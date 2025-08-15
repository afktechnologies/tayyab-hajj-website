// File: app/api/auth/[...nextauth]/options.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import UserModel from "@/models/User";
import clientPromise from "@/lib/mongodb";
import db from "@/lib/db";
import { Adapter, AdapterUser } from "next-auth/adapters";

// Extend AdapterUser to include role
interface CustomAdapterUser extends AdapterUser {
  role: string;
}

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await db.connectDb();

        if (!credentials) return null;

        const email = credentials.email;
        const password = credentials.password;
        const user = await UserModel.findOne({ email });

        if (user) {
          return isValidPassword({ password, user });
        } else {
          throw new Error("This email doesn't exist.");
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise) as Adapter,

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      await db.connectDb();

      const user = await UserModel.findById(token.sub);
      if (user) {
        session.user.id = token.sub || user._id.toString();
        session.user.role = user.role || "user";
        token.role = user.role || "user";
      }
      return session;
    },
  },
};

const isValidPassword = async ({ password, user }: { password: string; user: any }) => {
  if (!user.password) throw new Error("Please enter your password");
  if (password !== user.password)
    throw new Error("Email or Password is incorrect!");
  return user;
};