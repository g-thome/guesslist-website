import "../index.css";
import { GlobalState } from "../context/GlobalState";

export default function MyApp({ Component, pageProps }) {
  return (
    <GlobalState>
      <Component {...pageProps} />
    </GlobalState>
  );
}
