import styled from "styled-components";
import { white, arsenic } from "../colors";

export const StyledInput = styled.input`
  margin-top: 0.5em;
  padding: 0.5em 1em;
  width: 100%;
  border: none;
  border-radius: 10px;
  background-color: ${arsenic};
  outline: none;
  color: ${white};
  font-size: 25px;
`;
