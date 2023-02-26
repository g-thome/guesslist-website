import { ChangeEvent } from "react";
import { StyledLabel } from "./StyledLabel";

const languages = [
  "arabic",
  "bengali",
  "cantonese",
  "catalan",
  "czech",
  "danish",
  "dutch",
  "english",
  "esperanto",
  "finnish",
  "french",
  "greek",
  "hindi",
  "hungarian",
  "italian",
  "japanese",
  "korean",
  "mandarin",
  "malay",
  "norwegian",
  "polish",
  "punjabi",
  "romanian",
  "russian",
  "spanish",
  "swahili",
  "tagalog",
  "thai",
  "turkish",
  "ukranian",
  "urdu",
  "vietnamese"
];

type LanguageSelectorProps = {
  onSelect: Function;
  initialValue: string;
};

export function LanguageSelector({
  onSelect,
  initialValue,
  ...props
}: LanguageSelectorProps) {
  return (
    <div className="flex flex-col" {...props}>
      <StyledLabel className="block">Language</StyledLabel>
      <select
        onChange={(evt: ChangeEvent<HTMLSelectElement>) =>
          onSelect(evt.currentTarget.value)
        }
        value={initialValue}
        className="mt-0.5 py-4 px-8 w-fit border-0 rounded-full bg-arsenic outline-0 text-white text-2xl cursor-pointer"
      >
        {languages.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
