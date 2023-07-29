import { List } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { Page } from "src/components/Page";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { CornerDownRight } from "react-feather";
import { getNeedsCorrectionsFromUser } from "src/db/list";
import { Flag } from "src/components/Flag";
import { ListCard } from "src/components/ListCard";

type Props = {
  lists: List[];
};
export default function NeedsCorrections({ lists }: Props) {
  return (
    <Page title="Needs Corrections">
      {lists.length ? (
        <ul className="text-white text-xl flex gap-8 items-baseline">
          {lists.map((l, idx) => (
            <li key={"list" + idx} className="flex">
              <ListCard list={l} editable onEditClick={() => console.log("clicked")}/>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="text-white">
            There are no lists that need corrections.
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

  const lists = await getNeedsCorrectionsFromUser(session.user.id);

  return {
    props: {
      session,
      lists: JSON.parse(JSON.stringify(lists)),
    },
  };
}
