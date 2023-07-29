import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { PlusCircle } from "react-feather";
import { keygen } from "../keygen";
import { StyledLabel } from "./StyledLabel";
import { TextField } from "./TextField";
import { useDidUpdateEffect } from "../hooks/useDidUpdate";

interface IItemListItem {
  text: string;
  itemId: string;
}

type MultiTextFieldProps = {
  label: string;
  onChange: Function;
  initialValue: string[];
};

export function MultiTextField({
  label,
  onChange,
  initialValue,
}: MultiTextFieldProps) {
  const [items, setItems] = useState<IItemListItem[]>([
    { text: "", itemId: "itemlist-0" },
  ]);
  const [focusItemId, setFocusItemId] = useState("");

  useDidUpdateEffect(() => {
    document.getElementById(focusItemId)?.focus();
  }, [focusItemId]);

  useEffect(() => {
    setItems(
      initialValue.map((v, i) => ({
        text: v,
        itemId: "itemlist-" + i,
      }))
    );
  }, [initialValue]);

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
      onChange(
        items
          .filter((i) => i.itemId !== evt.currentTarget.id)
          .map((i) => i.text)
      );
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
    onChange(items.map((i) => i.text));
    setItems([...items]);
  }

  return (
    <label>
      <StyledLabel>{label}</StyledLabel>
      <ol class="list-decimal text-white list-inside text-2xl">
        {items.map((i) => {
          return (
            <li>
              <TextField
                onChange={onItemChange}
                autoFocus
                key={i.itemId}
                id={i.itemId}
                onKeyDown={keyDown}
                value={i.text}
              />
            </li>
          );
        })}
      </ol>
      <PlusCircle
        fontSize="large"
        onClick={addField}
        className="mt-1 w-8 h-8 text-gray cursor-pointer"
      />
    </label>
  );
}
