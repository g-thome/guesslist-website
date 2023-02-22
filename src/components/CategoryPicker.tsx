import { ChangeEvent, useState, KeyboardEvent } from "react";
import { useDidUpdateEffect } from "../hooks/useDidUpdate";
import { StyledLabel } from "./StyledLabel";
import { ALLOWED_CATEGORIES } from "../constants";

type CategoryPickerProps = {
  initialValue?: string[];
  onChange: Function;
};

export function CategoryPicker({
  onChange,
  initialValue,
}: CategoryPickerProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<string[]>(
    initialValue || []
  );
  const [text, setText] = useState("");

  useDidUpdateEffect(() => {
    onChange(categoriesSelected);
  }, [categoriesSelected]);

  useDidUpdateEffect(() => {
    setCategoriesSelected(initialValue);
  }, [initialValue]);

  function matchSearch(search: string) {
    const matches = new Set<string>();
    ALLOWED_CATEGORIES.map((c) => {
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
    if (evt.key !== "Enter") {
      return;
    }

    if (suggestions.length > 0) {
      pickSuggestion(suggestions[0]);
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
      <ul className="mt-2 mb-4 flex flex-wrap gap-y-2">
        {categoriesSelected.map((c) => (
          <li
            key={c}
            data-value={c}
            onClick={(evt) =>
              setCategoriesSelected(
                categoriesSelected.filter(
                  (c) => c !== evt.currentTarget.dataset.value
                )
              )
            }
            className="text-arsenic bg-gray px-2 py-1 rounded text-center mr-1 inline cursor-pointer hover:bg-red hover:text-white select-none"
          >
            #{c}
          </li>
        ))}
      </ul>
      <div className="relative">
        <div onClick={focus} className=" relative">
          <input
            id="categoriesInput"
            onChange={onInput}
            onKeyDown={keyDown}
            type="text"
            value={text}
            className="border-0 outline-0 inline mt-0.5 py-4 px-8 w-full rounded-full bg-arsenic text-white text-2xl cursor-text focus:outline focus:outline-white focus:outline-2"
          ></input>
        </div>
        {suggestions.length > 0 && (
          <ul className="list-none mt-2 ml-8 text-white bg-arsenic drop-shadow-md outline-white outline-2 outline rounded p-1 text-sm w-fit not:last:border-b-1 not:last:pb-0.8 not:first:mt-0.8 absolute">
            {suggestions.map((s) => (
              <li
                key={s}
                onClick={(evt) =>
                  pickSuggestion(evt.currentTarget.dataset.value)
                }
                className="cursor-pointer text-base p-2"
                data-value={s}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
