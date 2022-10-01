import Image from "next/image";
import { useUserContext } from "../context/UserContext";

export function Avatar({ ...props }) {
  const { user } = useUserContext();

  return (
    <div {...props}>
      <Image
        alt="Your discord user avatar"
        src={user.avatar}
        width={50}
        height={50}
        layout="fixed"
        className="rounded-full mr-6"
      />
    </div>
  );
}
