import { MouseEvent } from "react";
import { StyledLabel } from "./StyledLabel";

const languages = [
  "english",
  "mandarin",
  "hindi",
  "spanish",
  "french",
  "arabic",
  "bengali",
  "russian",
  "portuguese",
  "urdu",
  "indonesian",
  "japanese",
  "turkish",
  "cantonese",
  "vietnamese",
  "tagalog",
  "korean",
  "persian",
  "swahili",
  "italian",
  "punjabi",
  "thai",
  "polish",
  "dutch",
  "romanian",
  "greek",
  "czech",
  "hungarian",
  "ukrainian",
  "malay",
  "catalan",
  "esperanto",
  "hebrew",
  "danish",
  "norwegian",
  "sweedish",
];

function Selector({ children, ...props }) {
  return (
    <select
      {...props}
      className="mt-0.5 py-4 px-8 w-fit border-0 rounded-full bg-arsenic outline-0 text-white text-2xl cursor-pointer"
    >
      {children}
    </select>
  );
}

export function LanguageSelector({ onSelect, ...props }) {
  return (
    <div className="flex flex-col" {...props}>
      <StyledLabel className="block">Language</StyledLabel>
      <Selector
        onChange={(evt: MouseEvent<HTMLSelectElement>) =>
          onSelect(evt.currentTarget.value)
        }
      >
        {languages.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </Selector>
    </div>
  );
}
