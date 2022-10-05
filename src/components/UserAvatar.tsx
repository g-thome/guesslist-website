import { useSession } from "next-auth/react";
import { Avatar } from "./Avatar";

export function UserAvatar({ ...props }) {
  const { data: session } = useSession();

  return (
    <Avatar
      alt="Your Discord user avatar"
      src={session.user.image_url}
      {...props}
    />
  );
}
