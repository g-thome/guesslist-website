
import { Button } from "src/components/Button";
import { TextField } from "src/components/TextField";
import { MultiTextField } from "src/components/MultiTextField";
import { CategoryPicker } from "src/components/CategoryPicker";
import { LanguageSelector } from "src/components/LanguageSelector";
import { Page } from "src/components/Page";
import { StyledLabel } from "src/components/StyledLabel";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { getList, saveDraft } from "src/API";
import { getServerSession } from "next-auth";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";

export default function EditList({ draft }) {
  const [title, setTitle] = useState(draft.title);
  const [items, setItems] = useState(draft.items);
  const [categories, setCategories] = useState(draft.categories);
  const [language, setLanguage] = useState(draft.language);

  const debouncedTitle = useDebounce(title, 100);
  const debouncedItems = useDebounce(items, 100);
  const debouncedCategories = useDebounce(categories, 100);
  const debouncedLanguage = useDebounce(language, 100);

  const router = useRouter();

  useEffect(() => {
    saveDraft(draft.id, { title: debouncedTitle });
  }, [draft.id, debouncedTitle]);

  useEffect(() => {
    saveDraft(draft.id, { items: debouncedItems });
  }, [debouncedItems, draft.id]);

  useEffect(() => {
    saveDraft(draft.id, { categories: debouncedCategories });
  }, [debouncedCategories, draft.id]);

  useEffect(() => {
    saveDraft(draft.id, { language: debouncedLanguage });
  }, [debouncedLanguage, draft.id]);

  function clickNext() {
    if (!title || !categories || !items || !language) {
      alert("Please fill all the fields");
      return;
    }

    if (categories.length === 0) {
      alert("Select at least one category");
      return;
    }

    if (items.length < 5) {
      alert("Lists need to have at least five items");
      return;
    }

    router.push(`/lists/${router.query.id}/preview`);
  }

  return (
    <Page title="Edit your list">
      <main>
        <form
          onSubmit={clickNext}
          className="flex flex-col w-full max-w-xl gap-y-4"
        >
          <StyledLabel>Title</StyledLabel>
          <TextField
            initialValue={title}
            onChange={(evt) => setTitle(evt.currentTarget.value)}
          />
          <MultiTextField
            onChange={setItems}
            label="Items"
            initialValue={items}
          />
          <CategoryPicker onChange={setCategories} initialValue={categories} />
          <LanguageSelector onSelect={setLanguage} initialValue={language} />
        </form>
        <Button
          className="absolute right-4 bottom-4"
          value="NEXT"
          onClick={clickNext}
          type="submit"
        />
      </main>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const draft = await getList(context.params.id as string);

  return {
    props: {
      session,
      draft,
    },
  };
}
