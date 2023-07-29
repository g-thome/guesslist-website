import { ChangeEventHandler, InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: ChangeEventHandler<HTMLInputElement>;
  fixHintText?: string;
  initialValue?: string;
};

export function TextField({
  onChange,
  initialValue,
  ...props
}: TextFieldProps) {
  return (
    <input
      onChange={onChange}
      type="text"
      value={initialValue}
      className="mt-0.5 py-4 px-8 border-0 rounded-full bg-arsenic outline-0 text-white text-2xl focus:outline focus:outline-white focus:outline-2"
      {...props}
    />
  );
}
