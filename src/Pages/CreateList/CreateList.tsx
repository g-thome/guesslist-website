import styled from "styled-components"
import { white } from "../../colors";
import { UserPlate } from "../../components/UserPlate";
import { TextField } from "./TextField";
import { MultiTextField } from "./MultiTextField";
import { CategoryPicker } from "./CategoryPicker";

const PageName = styled.h1`
    color: ${white};
    font-weight: bold;
    font-size: 48px;
`;

export function CreateList() {
    return (
        <main style={{padding: '1rem 2rem'}}>
            <UserPlate />
            <PageName>
                Create your first list!
            </PageName>
            <form style={{ display: 'flex', flexDirection: 'column'}}>
                <TextField label="Title" />
                <MultiTextField label="Items" />
                <CategoryPicker />
            </form>
        </main>
    )
}