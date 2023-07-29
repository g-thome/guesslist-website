import { List } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { Page } from "src/components/Page";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { CornerDownRight } from "react-feather";
import { getWaitingReviewFromUser } from "src/db/list";
import { Flag } from "src/components/Flag";

type Props = {
  lists: List[];
};
export default function Drafts({ lists }: Props) {
  return (
    <Page title="Waiting Review">
      {lists.length ? (
        <ul className="text-white text-xl flex gap-8 items-baseline flex-wrap">
          {lists.map((l, idx) => (
            <li key={"list" + idx} className="flex">
              <div className="outline outline-1 outline-veryLightBlue rounded p-4">
                <div className="flex gap-x-8 text-2xl">
                  <h2 className="font-bold">{l.title}</h2>
                  <Flag language={l.language} />
                </div>
                <ul>
                  {l.items.map((i) => (
                    <li key={`${l.title}-${i}`}>
                      <CornerDownRight className="inline mr-1" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <ul className="flex justify-end">
                  {l.categories.map((c) => (
                    <li className="text-base" key={`${l.title}-c-${c}`}>
                      #{c}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-white">
            There are not lists waiting review.
          </p>
        </div>
      )}
    </Page>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  const lists = await getWaitingReviewFromUser(session.user.id);

  return {
    props: {
      session,
      lists: JSON.parse(JSON.stringify(lists)),
    },
  };
}
