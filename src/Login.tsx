import DiscordLogo from './images/discord-logo.svg';
import styled from 'styled-components';
import { veryLightBlue, white } from './colors';


function goToAuth() {
  window.location.href = 'https://discord.com/api/oauth2/authorize?client_id=975659450620858418&response_type=token&scope=identify';
}

const Logo = styled.img`
    width: 100%;
    max-width: 200px;
    margin-bottom: 2em;
`

const LoginButton = styled.button`
    background-color: ${veryLightBlue};
    outline: none;
    border: none;
    padding: 1em;
    color: ${white};

    &:hover {
        cursor: pointer;
    }
`

const Centralized = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
`;

export function Login() {
    return (
        <Centralized>
            <Logo src={DiscordLogo} alt="discord"></Logo>
            <LoginButton onClick={goToAuth}>LOGIN WITH DISCORD</LoginButton>
        </Centralized>
    )
}