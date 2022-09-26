export async function loadUserInfo() {
  if (sessionStorage.getItem("userId")) {
    return null;
  }

  let { access_token } = getAuthFromLocalStorage();

  console.log("token: ", access_token);

  const user = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userData = await user.json();

  sessionStorage.setItem(
    "userAvatar",
    `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
  );
  sessionStorage.setItem("userName", userData.username);
  sessionStorage.setItem("userId", userData.id);
  sessionStorage.setItem("userDiscriminator", userData.discriminator);
}

export function saveAuthorizationToLocalStorage() {
  localStorage.setItem("authorization", location.hash.substring(1));
}

interface IAuthorization {
  access_token: string;
  expires_in: number;
  expire_date: Date;
}

export function getAuthFromLocalStorage(): IAuthorization {
  const authorization = localStorage.getItem("authorization");

  if (!authorization) {
    console.error("No user info found in local storage");
    return;
  }

  let result = {};

  authorization.split("&").forEach((item) => {
    if (item.startsWith("expires_in")) {
      const expireDate = new Date();
      expireDate.setSeconds(Number(item.split("=")[1]));

      result["expire_date"] = expireDate;
      return;
    }
    result[item.split("=")[0]] = item.split("=")[1];
  });

  return result as IAuthorization;
}
