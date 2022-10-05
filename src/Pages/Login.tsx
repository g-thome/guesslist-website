import { signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import DiscordLogo from "../../public/discord-logo.svg";

export default function Login() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="mb-2">
        <Image src={DiscordLogo} alt="discord" width={200} height={200} />
      </div>
      <button
        onClick={() =>
          signIn("discord", {
            callbackUrl: "/my-lists",
          })
        }
        className="cursor-pointer bg-veryLightBlue outline-none border-0 py-2 px-4 text-white w-fit"
      >
        LOGIN WITH DISCORD
      </button>
    </div>
  );
}
