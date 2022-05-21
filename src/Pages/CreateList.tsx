import { useState, KeyboardEvent, useEffect } from "react";
import styled from "styled-components"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { white, arsenic, gray } from "../colors";
import { UserPlate } from "../components/UserPlate";
import { keygen } from "../keygen";

const StyledLabel = styled.span`
    color: ${white};
    font-size: 35px;
`;

const StyledInput = styled.input`
        margin-top: 0.5em;
        padding: 0.5em 1em;
        width: 100%;
        border: none;
        border-radius: 10px;
        background-color: ${arsenic};
        outline: none;
        color: ${white};
        font-size: 25px;
`;

function TextField({ label }) {
    return (
        <label>
            <StyledLabel>{label}</StyledLabel>
            <StyledInput type="text" placeholder="Enter list name" />
        </label>           
    )
}
const AddFieldButton = styled(AddCircleIcon)`
        margin-top: 0.3em;
        width: 2rem;
        height: 2rem;
        color: ${gray};

        &:hover {
            cursor: pointer;
        }
`;

function MultiTextField({ label }) {
    interface IItemListItem {
        text: string;
        itemId: string;
    }
    
    const [items, setItems] = useState<IItemListItem[]>([{ text: '', itemId: 'itemslist-0' }]);
    const [focusItemId, setFocusItemId] = useState('');
    
    useEffect(() => {
        document.getElementById(focusItemId)?.focus();
    }, [focusItemId]);

    function addField() { 
        const id = keygen('itemslist');
        setItems([...items, { text: '', itemId: id }]);
        setFocusItemId(id);
    }

    function keyDown(evt: KeyboardEvent<HTMLInputElement>) {
        if (evt.key === 'Enter') {
            setItems([...items, { text: '', itemId: keygen('itemslist') }]);
        }

        if (evt.key === 'Backspace' && items.length > 1 && evt.currentTarget.value === '') {
            setItems(items.filter(i => i.itemId !== evt.currentTarget.id));
            const previous = items.findIndex(i => i.itemId === evt.currentTarget.id) - 1;
            setFocusItemId(items[previous].itemId);
        }
    }
    
    return (
        <label>
            <StyledLabel>{label}</StyledLabel>
            {items.map((i) => {
                return <StyledInput autoFocus key={i.itemId} id={i.itemId} type="text" onKeyDown={keyDown} />
            })}
            <AddFieldButton fontSize="large" onClick={addField}  />
        </label> 
    )
}

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
            <form>
                <TextField label="Title" />
                <MultiTextField label="Items" />
            </form>
        </main>
    )
}