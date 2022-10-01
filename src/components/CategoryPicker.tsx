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

export function CategoryPicker({ onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [text, setText] = useState("");

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
    const txt = evt.target.value;

    setText(txt);

    if (txt.length === 0) {
      setSuggestions([]);
      return;
    }

    setSuggestions(matchSearch(txt));
  }

  function keyDown(evt: KeyboardEvent<HTMLInputElement>) {
    const txt = evt.currentTarget.value;

    if (evt.key === "Enter") {
      if (suggestions.length > 0) {
        pickSuggestion(suggestions[0]);
      }
    }

    if (["Backspace", "Delete"].includes(evt.key)) {
      if (txt === "") {
        setCategoriesSelected(categoriesSelected.slice(0, -1));
      } else {
        setSuggestions(matchSearch(txt));
      }
    }
  }

  function pickSuggestion(suggestion: string) {
    setText("");
    setSuggestions([]);
    setCategoriesSelected([...categoriesSelected, suggestion]);
  }

  function focus() {
    document.getElementById("categoriesInput").focus();
  }

  return (
    <div className="flex flex-col">
      <StyledLabel>Categories</StyledLabel>
      <div
        onClick={focus}
        className="mt-0.5 py-4 px-8 w-full border-0 rounded-full bg-arsenic outline-0 text-white text-2xl cursor-text"
      >
        {categoriesSelected
          .map((c) => "#" + c)
          .map((c) => (
            <span
              key={c}
              className="text-arsenic bg-gray px-2 py-1 rounded text-center mr-1 inline"
            >
              {c}
            </span>
          ))}
        <input
          id="categoriesInput"
          onChange={onInput}
          onKeyDown={keyDown}
          type="text"
          value={text}
          className="border-0 outline-0 bg-transparent text-white inline"
        ></input>
      </div>
      {suggestions.length > 0 && (
        <ul className="list-none mt-2 text-white bg-arsenic rounded p-1 text-sm w-fit not:last:border-b-1 not:last:pb-0.8 not:first:mt-0.8">
          {suggestions.map((s) => (
            <li
              key={s}
              onClick={(evt) => pickSuggestion(evt.currentTarget.dataset.value)}
              className="cursor-pointer text-base p-2"
              data-value={s}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
