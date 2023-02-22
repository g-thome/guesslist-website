import { List, ListStatus } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createDraft, getUserLists } from "../../API";
import { Page } from "../../components/Page";
import { authOptions } from "../api/auth/[...nextauth]";
import { Edit, BarChart } from "react-feather";

type Props = {
  drafts: List[];
};
export default function Drafts({ drafts }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCreateOneClick() {
    const draft = await createDraft(session.user.id);
    router.push(`/lists/${draft.id}/edit`);
  }

  return (
    <Page title="Drafts">
      {drafts.length ? (
        <ul className="text-white text-xl">
          {drafts.map((l, i) => (
            <li key={"list" + i} className="flex items-center">
              {l.title || "Untitled"}{" "}
              <Edit
                onClick={() => router.push(`/lists/${l.id}/edit`)}
                className="text-veryLightBlue cursor-pointer inline ml-2"
              />{" "}
              {l.status === ListStatus.PUBLISHED && (
                <BarChart className="text-veryLightBlue cursor-pointer" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-white">
            You don&apos;t have any lists yet. Do you want to{" "}
            <span
              role="link"
              onClick={handleCreateOneClick}
              className="text-veryLightBlue cursor-pointer underline"
            >
              create one
            </span>
            ?
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
  const session = await unstable_getServerSession(req, res, authOptions);

  const drafts = await getUserLists(session.user.id);

  return {
    props: {
      session,
      drafts,
    },
  };
}
