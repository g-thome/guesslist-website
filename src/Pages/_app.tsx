import { SessionProvider } from "next-auth/react";
import "../index.css";
import { GlobalState } from "../context/GlobalState";
import Head from "next/head";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <Head>
        <title>Guess List</title>
      </Head>
      <SessionProvider session={session}>
        <GlobalState>
          <Component {...pageProps} />
        </GlobalState>
      </SessionProvider>
    </>
  );
}
