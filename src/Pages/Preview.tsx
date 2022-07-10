import styled from 'styled-components';
import {useState, useEffect} from 'react';
import { UserPlate, Avatar } from '../components/UserPlate';
import { Button } from '../components/Button';
import { Page } from '../components/Page';
import { white, arsenic, veryLightBlue, silverFoil } from '../colors';

const asteriskify = (str: string) => '\*'.repeat(str.length);

enum HideLevel {
  ALL,
  PARTIAL,
  NONE
}

const Outer = styled.div`
  display: inline-block;
  margin-right: 3em;
`;

const Container = styled.div`
  width: 300px;
  color: ${white};
  background-color: ${arsenic};
  border-radius 5px;
  border-left: 10px solid ${white};
  padding: 0.2em 1em;
  margin-top: 1em;
`;

const BotUsername = styled.span`
  color: ${white};
  font-size: 1.4em;
  font-weight: 600;
`;

const BotTag = styled.div`
  color: ${white};
  background-color: ${veryLightBlue};
  display: inline-block;
  border-radius: 5px;
  padding: 3px;
  margin-left: 1em;
`;

const ListTitle = styled.p`
  font-size: 1.2em;
  font-weight: 600;
`;

const ButtonLine = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: space-between;
`;

interface IDiscordPreviewProps {
  hideLevel: HideLevel;
  items: string[];
  category: string;
  author: string;
  title: string;
}

function DiscordPreview({hideLevel, items, category, author, title}:IDiscordPreviewProps) {
  const [listHidden, setListHidden] = useState<string[]>([]);

  useEffect(() => {
    switch (hideLevel) {
      case HideLevel.NONE:
        setListHidden(items);
        break;
      case HideLevel.PARTIAL:
        setListHidden(items.map((item, idx) => idx % 2 === 0 ? asteriskify(item) : item));
        break;
      case HideLevel.ALL:
        setListHidden(items.map(asteriskify));
        break;
    }
  }, []);

  return (
    <Outer>
      <Avatar />
      <BotUsername>Guess List</BotUsername>
      <BotTag>BOT</BotTag>
      <span style={{color: silverFoil, marginLeft: '0.5em'}}>11/11/2011</span>
      <Container>
        <div>
          <ListTitle>{title}</ListTitle>
          <ol style={{paddingLeft: '1em'}}>
            {listHidden.map(i => <li key={i + Math.random().toString()}>{i}</li>)}
          </ol>
        </div>
        <p style={{marginBottom: 0}}>#{category}</p>
        <p style={{marginTop: 0, fontSize: '.8em'}}>by <span>@{author}</span></p>
      </Container>
    </Outer>);
}

export function PreviewPage() {
  return (<>
    <UserPlate />
    <Page title="Preview">
      <main>
      {Object.keys(HideLevel)
        .filter(k => !isNaN(Number(k)))
        .map(level => (
          <DiscordPreview
            hideLevel={Number(level)}
            title="Countries"
            items={["Spain", "Brazil", "Canada", "Chad", "Cyprus"]}
            category="geography"
            author="gabrieleiro"
          />)
        )
      }
      </main>
      <ButtonLine>
        <Button value="Back to editing"/>
        <Button value="Done"/>
      </ButtonLine>
    </Page>
  </>)
}
