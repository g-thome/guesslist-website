import { useState } from "react";
import { UserPlate } from "../components/UserPlate";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { MultiTextField } from "../components/MultiTextField";
import { CategoryPicker } from "../components/CategoryPicker";
import { LanguageSelector } from "../components/LanguageSelector";
import { Page } from "../components/Page";
import { StyledLabel } from "../components/StyledLabel";

export default function CreateList() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [language, setLanguage] = useState("english");

  function clickNext() {
    const hasEmpty = [title, items, categories, language].some(
      (v) => !v || v.length === 0
    );

    if (hasEmpty) {
      alert("Please fill in all fields");
      return;
    }
  }

  return (
    <div className="p-8">
      <UserPlate />
      <Page title="Create your first list!">
        <main>
          <form
            onSubmit={clickNext}
            className="flex flex-col w-full max-w-xl gap-y-4"
          >
            <StyledLabel>Title</StyledLabel>
            <TextField onChange={(evt) => setTitle(evt.currentTarget.value)} />
            <MultiTextField onChange={setItems} label="Items" />
            <CategoryPicker onChange={setCategories} />
            <LanguageSelector onSelect={setLanguage} />
          </form>
          <Button
            className="absolute right-4 bottom-4"
            value="NEXT"
            onClick={clickNext}
            type="submit"
          />
        </main>
      </Page>
    </div>
  );
}
