import styled from "styled-components";
import { white } from "../colors";

const PageName = styled.h1`
  color: ${white};
  font-weight: bold;
  font-size: 48px;
`;

export function Page({ children, title }) {
  return (
    <>
      <div style={{ padding: "1rem 2rem" }}>
        {title && <PageName>{title}</PageName>}
        {children}
      </div>
    </>
  );
}
