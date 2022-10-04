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

export interface IList {
    title: string
    items: string[]
    categories: string[]
    language: string
}