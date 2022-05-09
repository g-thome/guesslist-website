import DiscordLogo from './images/discord-logo.svg';
import styled from 'styled-components';
import { purple, white } from './colors';

const Logo = styled.img`
    width: 100%;
    max-width: 200px;
    margin-bottom: 2em;
`

const LoginButton = styled.button`
    background-color: ${purple};
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
    const logo = new URL('./images/discord-logo.svg', import.meta.url);
    return (
        <Centralized>
            <Logo src={DiscordLogo} alt="discord"></Logo>
            <LoginButton>LOGIN WITH DISCORD</LoginButton>
        </Centralized>
    )
}