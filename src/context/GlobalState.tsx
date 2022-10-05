import { DraftContextProvider } from "./DraftContext";

export function GlobalState({ children }) {
  return <DraftContextProvider>{children}</DraftContextProvider>;
}
