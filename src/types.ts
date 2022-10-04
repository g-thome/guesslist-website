export interface IDiscordAPIUser {
    id: string
    username: string
    discriminator: string
    avatar: string
    bot?: boolean
    system?: boolean
    mfa_enabled?: boolean
    banner?: string
    accent_color?: number
    locale?: string
    verified?: boolean
    email?: string
    flags?: number
    premium_type?: number
    public_flags?: number
}

export interface IDraft {
  title: string;
  items: string[];
  categories: string[];
  language: string;
}

export enum ListStatus {
  DRAFT,
  IN_REVIEW,
  NEEDS_CORRECTIONS,
  PUBLISHED,
}