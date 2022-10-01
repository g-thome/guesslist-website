import React, { useEffect, useState } from "react";
import { UserPlate } from "../components/UserPlate";
import Link from "next/link";

function CreateOne() {
  return (
    <div>
      <span className="text-white ml-2">
        You don&apos;t have any lists yet. Do you want to{" "}
        <Link href={"/create-list"}>
          <a className="text-veryLightBlue">create one</a>
        </Link>
        ?
      </span>
    </div>
  );
}

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
      <h1 className="ml-2 text-white font-normal">
        My Lists
      </h1>
      <CreateOne />
    </div>
  );
}