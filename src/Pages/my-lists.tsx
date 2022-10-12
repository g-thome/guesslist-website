import React from "react";
import { UserPlate } from "../components/UserPlate";
import Link from "next/link";
import { Page } from "../components/Page";
import EditIcon from "@mui/icons-material/Edit";
import BarChartIcon from "@mui/icons-material/BarChart";
import { ListStatus } from "../types";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";
import { API } from "../API";

export default function MyLists({ lists, firstList, draft }) {
  return (
    <div className="p-8">
      <UserPlate />
      <Page title="My Lists">
        {firstList ? (
          <div>
            <p className="text-white">
              You don&apos;t have any lists yet. Do you want to{" "}
              <Link href={`/lists/${draft.id}/edit`}>
                <a className="text-veryLightBlue">create one</a>
              </Link>
              ?
            </p>
          </div>
        ) : (
          <ul className="text-white text-xl">
            {lists.map((l, i) => (
              <li key={"list" + i}>
                {l.title} - {l.status}{" "}
                <EditIcon className="text-veryLightBlue cursor-pointer" />{" "}
                {l.status === ListStatus.PUBLISHED && (
                  <BarChartIcon className="text-veryLightBlue cursor-pointer" />
                )}
              </li>
            ))}
          </ul>
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

  const lists = await API.getUserLists(session.user.id);

  if (lists.length === 0) {
    const draft = await API.createDraft(session.user.id);
    return {
      props: {
        session,
        draft,
        firstList: true,
      },
    };
  }

  if (lists.length === 1 && lists[0].title === "") {
    return {
      props: {
        session,
        draft: lists[0],
        firstList: true,
      },
    };
  }

  return {
    props: {
      session,
      lists,
    },
  };
}
