import { getServerSession } from "next-auth";
import Link from "next/link";
import { GetServerSidePropsContext } from "next/types";
import { Page } from "../components/Page";
import { UserPlate } from "../components/UserPlate";
import { authOptions } from "src/pages/api/auth/[...nextauth]";


export default function AllDone() {
  return (
    <div className="p-8">
      <UserPlate />
      <Page title="">
        <main>
          <p className="text-white text-6xl">
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
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  
  return {
    props: { session },
  };
}