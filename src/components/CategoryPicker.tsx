import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";
import styled from "styled-components";
import { gray, white, arsenic } from "../colors";
import { StyledLabel } from "./StyledLabel";

const categories = [
  "history",
  "geography",
  "physics",
  "chemistry",
  "biology",
  "mathematics",
  "literature",
  "music",
  "art",
  "sports",
  "philosophy",
  "economy",
  "business",
  "law",
  "gaming",
  "computers",
  "internet",
  "programming",
  "esports",
  "celebrities",
  "nature",
  "animals",
  "painting & sculpture",
  "entertainment",
  "food",
  "fashion",
  "cars",
  "architecture",
  "youtube & twitch",
  "space",
  "religion",
  "language",
];

const SuggestionsList = styled.ul`
  list-style: none;
  color: ${white};
  background-color: ${arsenic};
  padding: 1em;
  border-radius: 0.5em;
  font-size: 1.2em;
  width: fit-content;

  li {
    cursor: pointer;
  }

  li:not(:last-child) {
    border-bottom: 1px solid ${gray};
    padding-bottom: 0.8em;
  }

  li:not(:first-child) {
    margin-top: 0.8em;
  }
`;

const InputBackground = styled.span`
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
`;

const InvisibleInput = styled.div`
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

const insertHashtag = (text: string) => "#" + text;

const emptyCharacter = String.fromCodePoint(0xfeff);

export function CategoryPicker({ onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  useEffect(() => {
    onChange(categoriesSelected);
  }, [categoriesSelected, onChange]);

  function matchSearch(search: string) {
    const matches = new Set();
    categories.map((c) => {
      if (
        c.toLowerCase().includes(search.toLowerCase()) &&
        !categoriesSelected.includes(c) &&
        search.length > 0
      ) {
        matches.add(c);
      }
    });

    return Array.from(matches);
  }

  function onInput(evt: ChangeEvent<HTMLInputElement>) {
    const txt = evt.target.textContent;

    if (txt.length === 0) {
      setSuggestions([]);
      evt.target.textContent = emptyCharacter;
      evt.target.setSelectionRange(txt.length, txt.length);
      return;
    }

    setSuggestions(matchSearch(txt.replace(emptyCharacter, "")));
  }

  function keyDown(evt: KeyboardEvent<HTMLInputElement>) {
    const txt = evt.currentTarget.textContent;

    if (evt.key === "Enter") {
      evt.preventDefault();

      if (suggestions.length > 0) {
        setSuggestions([]);
        setCategoriesSelected([...categoriesSelected, suggestions[0]]);
        evt.currentTarget.textContent = "";
      }
    }

    if (["Backspace", "Delete"].includes(evt.key)) {
      if (txt.length === 0 || txt === emptyCharacter) {
        evt.preventDefault();
        evt.currentTarget.textContent = emptyCharacter;
        setCategoriesSelected(categoriesSelected.slice(0, -1));
      } else {
        setSuggestions(matchSearch(txt));
      }
    }
  }

  function keyUp(evt: KeyboardEvent<HTMLInputElement>) {
    if (
      ["Backspace", "Delete"].includes(evt.key) &&
      evt.currentTarget.textContent.length === 0
    ) {
      evt.currentTarget.textContent = emptyCharacter;
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <StyledLabel>Categories</StyledLabel>
      <InputBackground
        onClick={() => document.getElementById("categories-input").focus()}
      >
        {categoriesSelected.map(insertHashtag).map((c) => (
          <Category key={c}>{c}</Category>
        ))}
        <InvisibleInput
          id="categories-input"
          role="textbox"
          aria-multiline="true"
          contentEditable
          suppressContentEditableWarning
          placeholder="What are the subjects of your list?"
          onInput={onInput}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
        >
          {emptyCharacter}
        </InvisibleInput>
      </InputBackground>
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </SuggestionsList>
      )}
    </div>
  );
}
