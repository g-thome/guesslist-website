import { DefaultSession } from "next-auth";
import { Category } from "@prisma/client";

export interface IDiscordAPIUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
}

export interface IDraft {
  title: string;
  items: string[];
  categories: Category[];
  language: string;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      image_url: string;
    } & DefaultSession["user"] &
      IDiscordAPIUser;
  }
}
