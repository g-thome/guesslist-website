import { Page } from "src/components/Page";
import { GetServerSidePropsContext } from "next";
import { getList } from "src/API";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { TextField } from "src/components/TextField";
import { MultiTextField } from "src/components/MultiTextField";
import { CategoryPicker } from "src/components/CategoryPicker";
import { LanguageSelector } from "src/components/LanguageSelector";
import { StyledLabel } from "src/components/StyledLabel";
import { useRouter } from "next/router";
import { saveDraft } from "src/API";
import { useEffect, useState } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import { Button } from "src/components/Button";

export default function EditList({ list }) {
  const [title, setTitle] = useState(list.title);
  const [items, setItems] = useState(list.items);
  const [categories, setCategories] = useState(list?.categories);
  const [language, setLanguage] = useState(list?.language);

  const debouncedTitle = useDebounce(title, 100);
  const debouncedItems = useDebounce(items, 100);
  const debouncedCategories = useDebounce(categories, 100);
  const debouncedLanguage = useDebounce(language, 100);

  const router = useRouter();

  useEffect(() => {
    saveDraft(list.id, { title: debouncedTitle });
  }, [list.id, debouncedTitle]);

  useEffect(() => {
    saveDraft(list.id, { items: debouncedItems });
  }, [debouncedItems, list.id]);

  useEffect(() => {
    saveDraft(list.id, { categories: debouncedCategories });
  }, [debouncedCategories, list.id]);

  useEffect(() => {
    saveDraft(list.id, { language: debouncedLanguage });
  }, [debouncedLanguage, list.id]);

  function clickNext(evt) {
    evt.preventDefault();
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
            className="flex flex-col w-full max-w-xl gap-y-4">
          <div className="flex flex-col">
            <StyledLabel>Title</StyledLabel>
            <TextField
              initialValue={title}
              onChange={(evt) => setTitle(evt.currentTarget.value)}
              placeholder="Enter list name" />
          </div>
          <MultiTextField
            onChange={setItems}
            label="Items"
            initialValue={items} />
          <CategoryPicker onChange={setCategories} initialValue={categories} />
          <LanguageSelector onSelect={setLanguage} initialValue={language} />
          <Button
            className="absolute right-4 bottom-4"
            value="NEXT"
            onClick={clickNext}
            type="submit"
            disabled={!title || !categories.length || !language || !items.length}
          />
        </form>
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

  const list = await getList(context.params.id as string);

  return {
    props: {
      session,
      list,
    },
  };
}
