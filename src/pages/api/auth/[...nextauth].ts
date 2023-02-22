import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_API_USER_INFO,
} from "../../../constants";
import { IDiscordAPIUser } from "../../../types";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      userinfo: {
        url: DISCORD_API_USER_INFO,
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.profile = { ...profile };
      }

      return token;
    },
    async session({ token, session }) {
      session.user = { ...session.user, ...(token.profile as IDiscordAPIUser) };
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
export default NextAuth(authOptions);
