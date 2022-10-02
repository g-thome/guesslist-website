import { UserContextProvider } from "./UserContext";
import { DraftContextProvider } from "./DraftContext";

export function GlobalState({ children }) {
  return (
    <UserContextProvider>
      <DraftContextProvider>{children}</DraftContextProvider>
    </UserContextProvider>
  );
}
