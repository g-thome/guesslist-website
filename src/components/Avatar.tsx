import Image from "next/image";
import { useUserContext } from "../context/UserContext";

export function Avatar() {
  const { user } = useUserContext();

  return (
    <Image
      alt="Your discord user avatar"
          src={user.avatar}
          width={50}
          height={50}
      style={{
        borderRadius: "50%",
        margin: "0 .6rem",
      }}
    />
  );
}
