import { arsenic, white } from '../../colors';
import styled from 'styled-components';
import { StyledLabel } from './StyledLabel';

const Selector = styled.select`
  background-color: ${arsenic};
  width: fit-content;
  color: ${white};
  border: none;
  outline: none;
  font-size: 25px;
  padding: 0.5em;
  border-radius: 10px;
`;

const languages = [
    'english',
    'mandarin', 
    'hindi',
    'spanish',
    'french',
    'arabic',
    'bengali',
    'russian',
    'portuguese',
    'urdu',
    'indonesian',
    'japanese',
    'turkish',
    'cantonese',
    'vietnamese',
    'tagalog',
    'korean',
    'persian',
    'swahili',
    'italian',
    'punjabi',
    'thai',
    'polish',
    'dutch',
    'romanian',
    'greek',
    'czech',
    'hungarian',
    'ukrainian',
    'malay',
    'catalan',
    'esperanto',
    'hebrew',
    'danish',
    'norwegian',
    'sweedish',
];

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export function LanguageSelector({onSelect}) {
  return (
    <Container>
      <StyledLabel style={{marginBottom: '0.5em'}}>Language</StyledLabel>
      <Selector onChange={(evt) => onSelect(evt.currentTarget.value)}>
          {languages.map(l => <option key={l} value={l}>{l}</option>)}
      </Selector>
    </Container>)
}
