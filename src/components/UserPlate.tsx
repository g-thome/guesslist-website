import { Avatar } from "./Avatar";
import { useUserContext } from "../context/UserContext";

export function UserPlate({ ...props }) {
  const { user } = useUserContext();

  return (
    <div {...props}>
      <div className="flex mt-1 mr-0 mb-0 ml-1">
        <Avatar className="mr-2" />
        <div className="flex flex-col text-normal text-lg">
          <span className={`text-white`}>{user.username}</span>
          <span className={`text-silverFoil -mt-2`}>#{user.discriminator}</span>
        </div>
      </div>
    </div>
  );
}
