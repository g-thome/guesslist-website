import { Page } from "../../../components/Page";
import { GetServerSidePropsContext } from "next";
import { getList } from "../../../API";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]";
import ListEditForm from "src/components/ListEditForm";

export default function EditList({ list }) {
  return (
    <Page title="Edit your list">
      <main>
        <ListEditForm list={list} />
      </main>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const list = await getList(context.params.id as string);

  return {
    props: {
      session,
      list,
    },
  };
}
