export async function loadUserInfo() {
    let token = localStorage.getItem('access_token');

    const user = await fetch('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const userData = await user.json();

    sessionStorage.setItem('userAvatar', userData.avatar);
    sessionStorage.setItem('userName', userData.username);
    sessionStorage.setItem('userId', userData.id);
    sessionStorage.setItem('userDiscriminator', userData.discriminator);
}

export function saveAuthorizationToLocalStorage() {
    localStorage.setItem('authorization', location
        .hash
        .substring(1));
}

export function getUserInfoFromURLParams() {
    const URLParams = localStorage.getItem('userInfo');

    if (!URLParams) {
        console.error('No user info found in local storage');
        return;
    }

    URLParams
        .split('&')
        .forEach(item => {
            if (item.startsWith('expires_in')) {
                const expireDate = new Date();
                expireDate.setSeconds(Number(item.split('=')[1]));

                localStorage.setItem('expires_in', expireDate.toString());
                return;
            }
            localStorage.setItem(item.split('=')[0], item.split('=')[1])
        });
}