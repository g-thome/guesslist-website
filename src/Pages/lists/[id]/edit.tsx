import { UserPlate } from "../../../components/UserPlate";
import { Button } from "../../../components/Button";
import { TextField } from "../../../components/TextField";
import { MultiTextField } from "../../../components/MultiTextField";
import { CategoryPicker } from "../../../components/CategoryPicker";
import { LanguageSelector } from "../../../components/LanguageSelector";
import { Page } from "../../../components/Page";
import { StyledLabel } from "../../../components/StyledLabel";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { API } from "../../../API";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useState } from "react";

export default function EditList({ draft }) {
  const [title, setTitle] = useState(draft.title);
  const [items, setItems] = useState(draft.items);
  const [categories, setCategories] = useState(draft.categories);
  const [language, setLanguage] = useState(draft.language);

  const router = useRouter();

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
    <div className="p-8">
      <UserPlate />
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
            <CategoryPicker
              onChange={setCategories}
              initialValue={categories}
            />
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
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const draft = await API.getList(context.params.id as string);

  return {
    props: {
      session,
      draft,
    },
  };
}
