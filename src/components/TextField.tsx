import { ChangeEventHandler, InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: ChangeEventHandler<HTMLInputElement>;
  fixHintText?: string;
};

export function TextField({ onChange, ...props }: TextFieldProps) {
  return (
    <input
      onChange={onChange}
      type="text"
      placeholder="Enter list name"
      className="mt-0.5 py-4 px-8 w-full border-0 rounded-full bg-arsenic outline-0 text-white text-2xl"
      {...props}
    />
  );
}
