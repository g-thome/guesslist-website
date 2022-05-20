import styled from "styled-components"
import { lightGrey, white } from "./colors";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 1rem 0 0 1rem;
`

const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 .6em;
`;

const UserNameAndAvatar = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: normal;
    font-size: 20px;
`

const Username = styled.span`
    color: ${white};
`;

const Discriminator = styled.span`
    color: ${lightGrey};
`

export function UserPlate() {
    return (
        <Container>
            <Avatar src={sessionStorage.getItem('userAvatar')} />
            <UserNameAndAvatar>
                <Username>{sessionStorage.getItem('userName')}</Username>
                <Discriminator>#{sessionStorage.getItem('userDiscriminator')}</Discriminator>
            </UserNameAndAvatar>
        </Container>
    )
}