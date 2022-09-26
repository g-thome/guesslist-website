import "normalize.css";
import { useUserContext } from "../context/UserContext";
import Login from "./login";
import MyLists from "./my-lists";

function Index() {
  const { user } = useUserContext();
  return user.accessToken ? <MyLists /> : <Login />
}

export default Index;
