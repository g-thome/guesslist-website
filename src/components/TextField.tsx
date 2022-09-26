import { StyledLabel } from "./StyledLabel";
import { StyledInput } from "./StyledInput";
import { ChangeEventHandler } from "react";

type TextFieldProps = {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  fixHintText?: string;
};

export function TextField({ label, onChange }: TextFieldProps) {
  return (
    <label>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        onChange={onChange}
        type="text"
        placeholder="Enter list name"
      />
    </label>
  );
}
