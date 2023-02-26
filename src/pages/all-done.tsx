import { getServerSession } from "next-auth";
import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";
import { Page } from "../components/Page";
import { authOptions } from "src/pages/api/auth/[...nextauth]";


export default function AllDone() {
  return (
    <Page title="">
      <main>
        <p className="text-white text-4xl">
          All done!
          <br />
          Your list was submitted to review. Once it passes, the bot will send
          you a DM if your Discord settings allow so. Meanwhile, you can also{" "}
          <Link href="/my/drafts" className="text-veryLightBlue">
            check the status of your lists.
          </Link>
        </p>
      </main>
    </Page>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  
  return {
    props: { session },
  };
}