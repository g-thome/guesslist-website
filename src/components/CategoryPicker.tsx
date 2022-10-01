import { ChangeEvent, useState, useEffect, KeyboardEvent } from "react";
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
    <div className="flex flex-col">
      <StyledLabel>Categories</StyledLabel>
      <span
        className="mt-0.5 py-4 px-8 w-full border-0 rounded-full bg-arsenic outline-0 text-white text-2xl"
        onClick={() => document.getElementById("categories-input").focus()}
      >
        {categoriesSelected
          .map((c) => "#" + c)
          .map((c) => (
            <span
              key={c}
              className="text-arsenic bg-gray px-2 py-1 rounded text-center mr-0.5 inline"
            >
              {c}
            </span>
          ))}
        <div
          id="categories-input"
          role="textbox"
          aria-multiline="true"
          contentEditable
          suppressContentEditableWarning
          placeholder="What are the subjects of your list?"
          onInput={onInput}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
          className="border-0 outline-0 bg-transparent text-white w-full inline"
        >
          {emptyCharacter}
        </div>
      </span>
      {suggestions.length > 0 && (
        <ul className="list-none text-white bg-arsenic p-1 rounded text-sm w-fit not:last:border-b-1 not:last:pb-0.8 not:first:mt-0.8">
          {suggestions.map((s) => (
            <li key={s} className="cursor-pointer">
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
