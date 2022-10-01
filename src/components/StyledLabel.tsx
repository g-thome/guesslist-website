import { ReactNode } from "react";

type StyledLabelProps = {
  className?: string;
  children: ReactNode | ReactNode[];
};

export function StyledLabel({ children, className }: StyledLabelProps) {
  return (
    <label className={"text-white text-3xl " + className}>{children}</label>
  );
}
