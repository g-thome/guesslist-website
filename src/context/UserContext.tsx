import { useState, createContext, useContext, useEffect } from "react";

interface IUser {
  id: string;
  avatar: string;
  username: string;
  discriminator: number;
  accessToken: string;
}

const UserContext = createContext<{ user: IUser; setUser: Function }>({
  user: {
    id: "",
    avatar: "",
    username: "",
    discriminator: 0,
    accessToken: "",
  },
  setUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState<IUser>({
    id: "",
    avatar: "",
    username: "",
    discriminator: 0,
    accessToken: "",
  });

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
