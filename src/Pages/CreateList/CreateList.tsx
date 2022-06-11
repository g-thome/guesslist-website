import { useState } from 'react';
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

interface ICreateList {
    title: string;
    items: string[];
    categories: string[];
    language: string;
}

export function CreateList() {
    const [title, setTitle] = useState("");
    const [items, setItems] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [language, setLanguage] = useState("");

    return (
        <main style={{padding: '1rem 2rem'}}>
            <UserPlate />
            <PageName>
                Create your first list!
            </PageName>
            <CreateListForm>
                <TextField onChange={(evt) => setTitle(evt.currentTarget.value)} label="Title" />
                <MultiTextField onChange={setItems} label="Items" />
                <CategoryPicker onChange={setCategories} />
                <LanguageSelector onSelect={setLanguage} style={{marginBottom: '1em'}}/>
            </CreateListForm>
        </main>
    )
}
