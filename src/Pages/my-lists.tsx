import React from "react";
import { UserPlate } from "../components/UserPlate";
import { Page } from "../components/Page";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { createDraft, getUserLists } from "../API";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ListStatus } from "@prisma/client";

export default function MyLists({ lists }) {
  const { data: session } = useSession();
  const router = useRouter();

  async function handleCreateOneClick() {
    const draft = await createDraft(session.user.id);
    router.push(`/lists/${draft.id}/edit`);
  }

  return (
    <div className="p-8">
      <UserPlate />
      <Page title="My Lists">
        {lists.length ? (
          <ul className="text-white text-xl">
            {lists.map((l, i) => (
              <li key={"list" + i}>
                {l.title || "Untitled"} - {l.status}{" "}
                <EditIcon
                  onClick={() => router.push(`/lists/${l.id}/edit`)}
                  className="text-veryLightBlue cursor-pointer"
                />{" "}
                {l.status === ListStatus.PUBLISHED && (
                  <BarChartIcon className="text-veryLightBlue cursor-pointer" />
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
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const lists = await getUserLists(session.user.id);

  return {
    props: {
      session,
      lists,
    },
  };
}
