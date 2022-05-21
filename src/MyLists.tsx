import styled from "styled-components";
import { Link } from 'react-router-dom';
import { UserPlate } from "./UserPlate";
import { white, veryLightBlue } from "./colors";


function CreateOne() {
    const Text = styled.span`
        color: ${white};
        margin-left: 2rem;
    `;

    const LinkToCreateList = styled(Link)`
        color: ${veryLightBlue};
    `
    return (
        <div>
            <Text>You don't have any lists. Do you want <LinkToCreateList to={'/create-list'}>to create one</LinkToCreateList>?</Text>
        </div>
    )
}

export function MyLists() { 
    const PageName = styled.h1`
        margin-left: 2rem;
        color: ${white};
        font-weight: normal;
    `;

    return (
        <>
            <UserPlate />
            <PageName>
                My Lists
            </PageName>
            <CreateOne />
        </>
    )
}