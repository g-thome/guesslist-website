import { Avatar } from "src/components/Avatar";
import { BOT_AVATAR } from "src/constants";

export function BotAvatar({ ...props }) {
  return (
    <Avatar
      alt="Guess Lists's Discord user avatar"
      src={BOT_AVATAR}
      {...props}
    />
  );
}
