import { useSession } from "next-auth/react";
import { UserAvatar } from "./UserAvatar";

export function UserPlate({ ...props }) {
  const { data: session } = useSession();

  return (
    <div {...props}>
      <div className="flex mt-1 mr-0 mb-0 ml-1">
        <UserAvatar className="mr-2" />
        <div className="flex flex-col text-normal text-lg">
          <span className={`text-white`}>{session.user.username}</span>
          <span className={`text-silverFoil -mt-2`}>
            #{session.user.discriminator}
          </span>
        </div>
      </div>
    </div>
  );
}
