import { UserPlate } from "../components/UserPlate";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";
import { Page } from "../components/Page";
import { useDraftContext } from "../context/DraftContext";
import { useUserContext } from "../context/UserContext";
import { API } from "../API";
import { useRouter } from "next/router";

const asteriskify = (str: string) => "*".repeat(str.length);
const hashtagify = (list: string[]) => "#" + list.join(" #");

enum HideLevel {
  ALL,
  PARTIAL,
  NONE,
}

interface IDiscordPreviewProps {
  hideLevel: HideLevel;
  items: string[];
  categories: string[];
  author: string;
  title: string;
}

function DiscordPreview({
  hideLevel,
  items,
  categories,
  author,
  title,
}: IDiscordPreviewProps) {
  let listHidden: string[];
  switch (hideLevel) {
    case HideLevel.NONE:
      listHidden = items;
      break;
    case HideLevel.PARTIAL:
      listHidden = items.map((item, idx) =>
        idx % 2 === 0 ? asteriskify(item) : item
      );
      break;
    case HideLevel.ALL:
      listHidden = items.map(asteriskify);
      break;
  }

  return (
    <div className="flex">
      <Avatar className="mr-4" />
      <div className="flex flex-col">
        <div className="flex items-end">
          <span className="text-white text-xl font-medium leading-4">
            Guess List
          </span>
          <span className="text-white bg-veryLightBlue inline-block rounded py-0.5 px-1 ml-1 text-[9px]">
            BOT
          </span>
          <span className="text-silverFoil ml-0.5 text-xs">11/11/2011</span>
        </div>
        <div className="text-white bg-darkCharcoal rounded border-l-8 border-white py-1 px-2 mt-2">
          <p className="font-medium mb-2">{title}</p>
          <ol className="ml-4 pl-1 list-decimal mb-4">
            {listHidden.map((i) => (
              <li
                className="font-normal text-sm"
                key={i + Math.random().toString()}
              >
                {i}
              </li>
            ))}
          </ol>
          <p className="mb-0 text-sm">{hashtagify(categories)}</p>
          <p className="mt-0 text-0.8 text-xs">
            by <span>@{author}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  const { draft } = useDraftContext();
  const { user } = useUserContext();
  const router = useRouter();

  async function handleClickDone() {
    try {
      await API.publishList(user.id, draft);
      router.push("/all-done");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="p-8">
      <UserPlate className="mb-4" />
      <Page title="Preview">
        <main className="flex gap-x-8">
          {Object.keys(HideLevel)
            .filter((k) => !isNaN(Number(k)))
            .map((level) => (
              <DiscordPreview
                key={`preview-${Math.random()}`}
                hideLevel={Number(level)}
                title={draft.title}
                items={draft.items}
                categories={draft.categories}
                author={user.username}
              />
            ))}
        </main>
        <div className="absolute bottom-8 left-8">
          <Button type="button" value="Back to editing" />
        </div>
        <div className="absolute bottom-8 right-8">
          <Button type="button" value="Done" onClick={handleClickDone} />
        </div>
      </Page>
    </div>
  );
}
