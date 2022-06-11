import styled from "styled-components"
import { white } from "../../colors";
import { UserPlate } from "../../components/UserPlate";
import { TextField } from "./TextField";
import { MultiTextField } from "./MultiTextField";
import { CategoryPicker } from "./CategoryPicker";
import { LanguageSelector } from './LanguageSelector';

const PageName = styled.h1`
    color: ${white};
    font-weight: bold;
    font-size: 48px;
`;

const CreateListForm = styled.form`
    display: flex;
    flex-direction: column;

    & > * {
        margin-bottom: 1em;
    }
`;

export function CreateList() {
    return (
        <main style={{padding: '1rem 2rem'}}>
            <UserPlate />
            <PageName>
                Create your first list!
            </PageName>
            <CreateListForm>
                <TextField label="Title" />
                <MultiTextField label="Items" />
                <CategoryPicker />
                <LanguageSelector style={{marginBottom: '1em'}}/>
            </CreateListForm>
        </main>
    )
}
