import React, { useEffect, useState } from "react";
import { UserPlate } from "../components/UserPlate";
import { white, veryLightBlue } from "../colors";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";

function CreateOne() {
  return (
    <div>
      <span style={{color: white, marginLeft: '2rem'}}>
        You don&apos;t have any lists. Do you want{" "}
        <Link href={"/create-list"}>
          <a style={{color: veryLightBlue}}>to create one</a>
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
    <>
      <UserPlate />
      <h1
        style={{
          marginLeft: "2rem",
          color: white,
          fontWeight: "normal",
        }}
      >
        My Lists
      </h1>
      <CreateOne />
    </>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
    return { props: {}}
}