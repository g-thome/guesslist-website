import { ChangeEvent, useState, KeyboardEvent } from "react";
import styled from "styled-components";
import { gray, white, arsenic } from "../../colors";
import { StyledLabel } from "./StyledLabel";

const categories = [
    'history',
    'geography',
    'physics',
    'chemistry',
    'biology',
    'mathematics',
    'literature',
    'music',
    'art',
    'sports',
    'philosophy',
    'economy',
    'business',
    'law',
    'gaming',
    'computers',
    'internet',
    'programming',
    'esports',
    'celebrities',
    'nature',
    'animals',
    'painting & sculpture',
    'entertainment',
    'food',
    'fashion',
    'cars',
    'architecture',
    'youtube & twitch',
    'space',
    'religion',
    'language'
];

const Suggestion = styled.li`
    color: ${white};

    &:hover {
        cursor: pointer;
    }
`;

const InputBackground = styled.div`
    font-size: 25px;
    background-color: ${arsenic};
    border-radius: 10px;
    padding: 0.5em 1em;
    margin-top: 0.5em;
    height: fit-content;
    max-height: 10000px;

    &:hover {
        cursor: text;
    }
`

const InvisibleInput = styled.span`
    border: none;
    outline: none;
    background-color: transparent;
    color: ${white};
    width: 100%;
    display: inline;
`;

const Category = styled.span`
    color: ${arsenic};
    background-color: ${gray};
    padding: 0.2em;
    border-radius: 10px;
    text-align: center;
    margin-right: 0.5em;
    display: inline;
`;

const insertHashtag = (text: string) => '#' + text;

const emptyCharacter = String.fromCodePoint(0xFEFF);

export function CategoryPicker() {
    const [suggestions, setSuggestions] = useState([]);
    const [categoriesSelected, setCategoriesSelected] = useState([]);

    function matchSearch(searchRaw: string) {
        const search = searchRaw.startsWith(emptyCharacter) ? searchRaw.substring(1) : searchRaw;
        console.log('search: ', search);
        const matches = new Set();
        categories.map(c => {
            if (c.toLowerCase().includes(search.toLowerCase())
                && !categoriesSelected.includes(c)
                && search.length > 0) {
                matches.add(c);
            }
        })
    
        return Array.from(matches);
    }

    function onType(evt: ChangeEvent<HTMLInputElement>) {
        const txt = evt.target.textContent;
        
        if (txt.length === 0) {
            setSuggestions([]);
            return;
        }

        setSuggestions(matchSearch(txt));
    }

    function keyDown(evt: KeyboardEvent<HTMLInputElement>) {
        const txt = evt.currentTarget.textContent;
        
        if (evt.key === 'Enter') {
            evt.preventDefault();

            if (suggestions.length > 0) {
                setSuggestions([]);
                setCategoriesSelected([...categoriesSelected, suggestions[0]]);
                evt.currentTarget.textContent = '';
            }
        }

        if (evt.key === 'Backspace' || evt.key === 'Delete') {
            if (txt.length === 0 || txt === emptyCharacter) {
                evt.preventDefault();
                evt.currentTarget.textContent = emptyCharacter;
                setCategoriesSelected(categoriesSelected.slice(0, -1));
            } else {
                setSuggestions(matchSearch(txt));
            }
        }
    }

    return (
        <>
            <StyledLabel>Categories</StyledLabel>
            <InputBackground onClick={() => document.getElementById('categories-input').focus()}>
                    {categoriesSelected.map(insertHashtag).map(c => <Category key={c}>{c}</Category>)}
                <InvisibleInput
                    id="categories-input"
                    role="textbox"
                    aria-multiline="true"
                    contentEditable
                    suppressContentEditableWarning
                    placeholder="What are the subjects of your list?"
                    onInput={onType}
                    onKeyDown={keyDown}
                >{emptyCharacter}</InvisibleInput>
            </InputBackground>
            {suggestions.length > 0 && (
                suggestions.map(s => (
                    <Suggestion key={s}>{s}</Suggestion>
                ))
            )}
        </>
    )
} 