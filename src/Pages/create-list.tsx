import { UserPlate } from "../components/UserPlate";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { MultiTextField } from "../components/MultiTextField";
import { CategoryPicker } from "../components/CategoryPicker";
import { LanguageSelector } from "../components/LanguageSelector";
import { Page } from "../components/Page";
import { StyledLabel } from "../components/StyledLabel";
import { DraftActionType, useDraftContext } from "../context/DraftContext";
import { useRouter } from "next/router";

export default function CreateList() {
  const { draft, dispatch } = useDraftContext();
  const router = useRouter();

  function setTitle(title: string) {
    dispatch({ type: DraftActionType.UPDATE_TITLE, title });
  }

  function setItems(items: string[]) {
    dispatch({ type: DraftActionType.UPDATE_ITEMS, items });
  }

  function setCategories(categories: string[]) {
    dispatch({ type: DraftActionType.UPDATE_CATEGORIES, categories });
  }

  function setLanguage(language: string) {
    dispatch({ type: DraftActionType.UPDATE_LANGUAGE, language });
  }

  function clickNext() {
    if (!draft.title || !draft.categories || !draft.items || !draft.language) {
      alert("Please fill all the fields");
      return;
    }

    if (draft.categories.length === 0) {
      alert("Select at least one category");
      return;
    }

    if (draft.items.length < 5) {
      alert("Lists need to have at least five items");
      return;
    }

    router.push("/preview");
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
            <TextField
              initialValue={draft.title}
              onChange={(evt) => setTitle(evt.currentTarget.value)}
            />
            <MultiTextField
              onChange={setItems}
              label="Items"
              initialValue={draft.items}
            />
            <CategoryPicker
              onChange={setCategories}
              initialValue={draft.categories}
            />
            <LanguageSelector
              onSelect={setLanguage}
              initialValue={draft.language}
            />
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
