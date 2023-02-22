import { useSession } from "next-auth/react";

export default function User() {
  const { data } = useSession();
  console.log("data: ", data);
  return <div>user</div>;
}
