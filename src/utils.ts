import { DISCORD_CDN } from "./constants";

export const fetcher = (url: string) => fetch(url).then(res => res.json())

export const fetcherWithToken = (url: string, token) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((res) => res.json());
};

// https://discord.com/developers/docs/reference#image-formatting
export const discordImage = (avatarHash: string) => `${DISCORD_CDN}/${avatarHash}`