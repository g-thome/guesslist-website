import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import styled from "styled-components";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { gray } from "../colors";
import { keygen } from "../keygen";
import { StyledLabel } from "./StyledLabel";
import { StyledInput } from "./StyledInput";

export const AddFieldButton = styled(AddCircleIcon)`
  margin-top: 0.3em;
  width: 2rem;
  height: 2rem;
  color: ${gray};

  &:hover {
    cursor: pointer;
  }
`;

export function MultiTextField({ label, onChange }) {
  interface IItemListItem {
    text: string;
    itemId: string;
  }

  const [items, setItems] = useState<IItemListItem[]>([
    { text: "", itemId: "itemslist-0" },
  ]);
  const [focusItemId, setFocusItemId] = useState("");

  useEffect(() => {
    document.getElementById(focusItemId)?.focus();
  }, [focusItemId]);

  useEffect(() => {
    onChange(items.map((item) => item.text));
  }, [items, onChange]);

  function addField() {
    const id = keygen("itemslist");
    setItems([...items, { text: "", itemId: id }]);
    setFocusItemId(id);
  }

  function keyDown(evt: KeyboardEvent<HTMLInputElement>) {
    if (evt.key === "Enter") {
      setItems([...items, { text: "", itemId: keygen("itemslist") }]);
    }

    if (
      evt.key === "Backspace" &&
      items.length > 1 &&
      evt.currentTarget.value === ""
    ) {
      setItems(items.filter((i) => i.itemId !== evt.currentTarget.id));
      const previous =
        items.findIndex((i) => i.itemId === evt.currentTarget.id) - 1;
      setFocusItemId(items[previous].itemId);
    }
  }

  function onItemChange(evt: ChangeEvent<HTMLInputElement>) {
    const itemChanged = items.indexOf(
      items.find((i) => i.itemId === evt.target.id)
    );
    items[itemChanged].text = evt.target.value;
    setItems([...items]);
  }

  return (
    <label>
      <StyledLabel>{label}</StyledLabel>
      {items.map((i) => {
        return (
          <StyledInput
            onChange={onItemChange}
            autoFocus
            key={i.itemId}
            id={i.itemId}
            type="text"
            onKeyDown={keyDown}
          />
        );
      })}
      <AddFieldButton fontSize="large" onClick={addField} />
    </label>
  );
}
