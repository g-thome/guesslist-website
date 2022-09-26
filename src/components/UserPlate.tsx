import { Avatar } from './Avatar';
import { silverFoil, white } from "../colors";
import { useUserContext } from '../context/UserContext';

export function UserPlate() {
  const { user } = useUserContext();

  return (
    <div style={{ display: "flex", flexDirection: "row", margin: "1rem 0 0 1rem" }}>
      <Avatar />
      <div style={{
        display: "flex",
        flexDirection: "column",
        fontWeight: "normal",
        fontSize: "20px"
      }}>
        <span style={{color: white}}>{user.username}</span>
        <span style={{color: silverFoil}}>
          #{user.discriminator}
        </span>
      </div>
    </div>
  );
}
