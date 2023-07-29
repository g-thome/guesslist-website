import { List, ListStatus } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createDraft } from "src/API";
import { Page } from "src/components/Page";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { Edit, BarChart } from "react-feather";
import { getPublishedFromUser } from "src/db/list";
import { useState } from "react";
import { Popup } from "src/components/Popup";
import { ListCard } from "src/components/ListCard";

type Props = {
  lists: List[];
};
export default function Published() {
  const { data: session } = useSession();
  const router = useRouter();
  const [warningVisible, setWarningVisible] = useState(false);

  async function editClick() {
    setWarningVisible(true);
    // const draft = await createDraft(session.user.id);
    // router.push(`/lists/${lists.id}/edit`);
  }

  let lists = [
    {
      id: 1,
      title: "countries",
      items: ["holanda", "argentina"],
      categories: ["geography"],
      language: ["english"]
    }
  ]

  return (
    <Page title="Published">
      {lists.length ? (
        <ul className="text-white text-xl">
          {lists.map(l => (
            // @ts-ignore
            <ListCard list={l} editable onEditClick={editClick} />
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-white">
            You don&apos;t have published lists yet.
          </p>
        </div>
      )}
      <Popup visible={warningVisible} onClose={() => setWarningVisible(false)}>
        <div className="bg-arsenic text-white">
          <p>Turn list into draft</p>
          <p>This list is live. If you want to edit it, you must first turn it into a draft. Drafts won’t be playable until they get published again.</p>
          <button>Cancel</button>
          <button>Turn to draft and edit</button>
        </div>
      </Popup>
    </Page>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerSession(req, res, authOptions);

  const lists = await getPublishedFromUser(session.user.id);

  return {
    props: {
      session,
      lists,
    },
  };
}
