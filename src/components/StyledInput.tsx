import { InputHTMLAttributes } from "react";

export function StyledInput({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="mt-0.5 py-4 px-8 w-full border-0 rounded-full bg-arsenic outline-0 text-white text-2xl"
    >
      {children}
    </input>
  );
}
