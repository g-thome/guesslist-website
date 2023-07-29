import { MouseEventHandler } from "react";

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLInputElement>;
  className?: string;
  type: "button" | "submit";
  value: string;
  disabled?: boolean
};

export const Button = ({ onClick, className, type, value, disabled }: ButtonProps) => {
  return (
    <input
      className={
        "bg-veryLightBlue text-white border-0 text-xl py-1 px-3 cursor-pointer " +
        className
      }
      onClick={onClick}
      type={type}
      value={value}
      disabled={disabled}
    ></input>
  );
};
