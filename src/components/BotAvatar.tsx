import { Avatar } from "./Avatar";
import { BOT_AVATAR } from "../constants";

export function BotAvatar({ ...props }) {
  return (
    <Avatar
      alt="Guess Lists's Discord user avatar"
      src={BOT_AVATAR}
      {...props}
    />
  );
}
