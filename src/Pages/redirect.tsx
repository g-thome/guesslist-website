import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { DISCORD_API_AUTH_URL, DISCORD_CDN } from "../constants";
import { useUserContext } from "../context/UserContext";
import { IDiscordAPIUser } from "../types";
import { fetcherWithToken } from "../utils";

export default function Redirect() {
    const { setUser } = useUserContext();
    const [accessToken, setAccessToken] = useState<string>();
    const router = useRouter();
    
    useEffect(() => {
        const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [token] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];
        setAccessToken(token);
    }, [])

  const { data: userFromAPI, error } = useSWR<IDiscordAPIUser>(
    [DISCORD_API_AUTH_URL, accessToken],
    fetcherWithToken
  );

  if (error) {
    alert("something went wrong trying to get user from discord");
  }

  useEffect(() => {
    if (!userFromAPI || !accessToken) return;
      
      const avatar = `${DISCORD_CDN}/avatars/${userFromAPI.id}/${userFromAPI.avatar}.png`

      const user = {
        id: userFromAPI.id,
        username: userFromAPI.username,
          discriminator: userFromAPI.discriminator,
        avatar,
        accessToken,
      }
      window.localStorage.setItem('user', JSON.stringify(user));
    setUser(user);

    router.push("/MyLists");
  }, [userFromAPI, setUser, router, accessToken]);

  return <h1>Loading...</h1>;
}
