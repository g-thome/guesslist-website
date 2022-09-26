import { useState } from "react";
import styled from "styled-components";
import { white } from "../colors";
import { UserPlate } from "../components/UserPlate";
import { Submit } from "../components/Button";
import { TextField } from "../components/TextField";
import { MultiTextField } from "../components/MultiTextField";
import { CategoryPicker } from "../components/CategoryPicker";
import { LanguageSelector } from "../components/LanguageSelector";

const CreateListForm = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 1em;
  }
`;

interface ICreateList {
  title: string;
  items: string[];
  categories: string[];
  language: string;
}

export default function CreateList() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [language, setLanguage] = useState("");

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
    <main style={{ padding: "1rem 2rem" }}>
      <UserPlate />
      <h1 style={{ color: white, fontWeight: "bold", fontSize: "48px" }}>
        Create your first list!
      </h1>
      <CreateListForm onSubmit={clickNext}>
        <TextField
          onChange={(evt) => setTitle(evt.currentTarget.value)}
          label="Title"
        />
        <MultiTextField onChange={setItems} label="Items" />
        <CategoryPicker onChange={setCategories} />
        <LanguageSelector
          onSelect={setLanguage}
          style={{ marginBottom: "1em" }}
        />
      </CreateListForm>
      <Submit
        style={{ position: "absolute", right: "1em", bottom: "1em" }}
        value="NEXT"
        onClick={clickNext}
      />
    </main>
  );
}
