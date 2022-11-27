import Link from "next/link";
import { Page } from "../components/Page";
import { UserPlate } from "../components/UserPlate";

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
            <Link href="/my/drafts">
              <a className="text-veryLightBlue">
                check the status of your lists.
              </a>
            </Link>
          </p>
        </main>
      </Page>
    </div>
  );
}
