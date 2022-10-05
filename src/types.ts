import { DefaultSession } from "next-auth";

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
  categories: string[];
  language: string;
}

export enum ListStatus {
  DRAFT = "Draft",
  IN_REVIEW = "In review",
  NEEDS_CORRECTIONS = "Needs corrections",
  PUBLISHED = "Published",
}

export interface IList {
  id: string;
  title: string;
  items: string[];
  categories: string[];
  language: string;
  authorId: string;
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
