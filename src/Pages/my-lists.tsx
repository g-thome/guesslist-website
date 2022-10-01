import React, { useEffect, useState } from "react";
import { UserPlate } from "../components/UserPlate";
import Link from "next/link";
import { Page } from "../components/Page";

export default function MyLists() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <UserPlate />
      <Page title="My Lists">
        <div>
          <p className="text-white">
            You don&apos;t have any lists yet. Do you want to{" "}
            <Link href={"/create-list"}>
              <a className="text-veryLightBlue">create one</a>
            </Link>
            ?
          </p>
        </div>
      </Page>
    </div>
  );
}
