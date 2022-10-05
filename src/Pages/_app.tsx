import { SessionProvider } from "next-auth/react";
import "../index.css";
import { GlobalState } from "../context/GlobalState";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <GlobalState>
        <Component {...pageProps} />
      </GlobalState>
    </SessionProvider>
  );
}
