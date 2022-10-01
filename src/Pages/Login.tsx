import Image from "next/image";
import Link from "next/link";
import React from "react";
import DiscordLogo from "../../public/discord-logo.svg";
import { DISCORD_AUTHORIZATION_URL } from "../constants";

export default function Login() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="mb-2">
        <Image src={DiscordLogo} alt="discord" width={200} height={200} />
      </div>
      <Link href={DISCORD_AUTHORIZATION_URL}>
        <button className="cursor-pointer bg-veryLightBlue outline-none border-0 py-2 px-4 text-white w-fit">
          LOGIN WITH DISCORD
        </button>
      </Link>
    </div>
  );
}
