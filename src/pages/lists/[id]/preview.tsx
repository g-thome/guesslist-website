import { Button } from "src/components/Button";
import { Page } from "src/components/Page";
import { getList, submitToReview } from "src/API";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { BotAvatar } from "src/components/BotAvatar";

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
      <BotAvatar className="mr-4" />
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

export default function PreviewPage({ draft }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleClickDone() {
    try {
      await submitToReview(draft.id);
      router.push("/all-done");
    } catch (e) {
      alert(e.message);
    }
  }

  return (
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
                author={session.user.username}
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
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const draft = await getList(context.query.id as string);
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        authOptions
      ),
      draft,
    },
  };
}
