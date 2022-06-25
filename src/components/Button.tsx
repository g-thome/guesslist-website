import styled from 'styled-components';
import {veryLightBlue, white} from '../colors';

const StyledButton = styled.input`
  background-color: ${veryLightBlue};
  color: ${white};
  border: none;
  font-size: 24px;
  padding: 0.5em 1em;

  &:hover {
    cursor: pointer;
  }
`;

export const Button = ({...props}) => <StyledButton type="button" {...props}/>

export const Submit = ({...props}) => <StyledButton type="submit" {...props}/>
