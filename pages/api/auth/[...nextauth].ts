import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";
import Providers from "next-auth/providers";

const prisma = new PrismaClient();

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (req, res) =>
  NextAuth(req, res, {
    adapter: Adapters.Prisma.Adapter({ prisma }),
    session: {
      // use JWTs instead
      jwt: true,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    callbacks: {
      session: async (session, token) => {
        // Make the user ID available on the session object (for getSession etc.)
        session.userId = token.sub;
        session.isNewUser = token.isNewUser;
        return session;
      },
      jwt: async (token, user, account, profile, isNewUser) => {
        // Set an isNewUser property on the token to pass it to the session client-side.
        if (account) {
          token.isNewUser = isNewUser;
        }
        return token;
      },
    },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // ...add more providers here
    ],
    // Might not need this?
    database: process.env.DATABASE_URL,
    pages: {
      signIn: "/login",
    },
  });
