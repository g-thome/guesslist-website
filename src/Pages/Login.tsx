import Image from "next/image";
import React from "react";
import DiscordLogo from "../../public/discord-logo.svg";
import styled from "styled-components";
import { veryLightBlue, white } from "../colors";
import { DISCORD_AUTHORIZATION_URL } from "../constants";

function goToAuth() {
  window.location.href = DISCORD_AUTHORIZATION_URL
}

const LoginButton = styled.button`
  background-color: ${veryLightBlue};
  outline: none;
  border: none;
  padding: 1em;
  color: ${white};

  &:hover {
    cursor: pointer;
  }
`;

const Centralized = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export default function Login() {
  return (
    <Centralized>
      <Image
        src={DiscordLogo}
        alt="discord"
        style={{
          width: "100%",
          maxWidth: "200px",
          marginBottom: "2em",
        }}
      />
      <LoginButton onClick={goToAuth}>LOGIN WITH DISCORD</LoginButton>
    </Centralized>
  );
}
