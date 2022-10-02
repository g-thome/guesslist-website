import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { keygen } from "../keygen";
import { StyledLabel } from "./StyledLabel";
import { TextField } from "./TextField";

interface IItemListItem {
  text: string;
  itemId: string;
}

type MultiTextFieldProps = {
  label: string;
  onChange: Function;
};

export function MultiTextField({ label, onChange }: MultiTextFieldProps) {
  const [items, setItems] = useState<IItemListItem[]>([
    { text: "", itemId: "itemlist-0" },
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
      return;
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
    console.log("changed");
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
          <TextField
            onChange={onItemChange}
            autoFocus
            key={i.itemId}
            id={i.itemId}
            onKeyDown={keyDown}
          />
        );
      })}
      <AddCircleIcon
        fontSize="large"
        onClick={addField}
        className="mt-1 w-8 h-8 text-gray cursor-pointer"
      />
    </label>
  );
}
