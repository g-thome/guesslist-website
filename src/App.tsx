import { useEffect, useState } from 'react';
import { Login } from './Login';
import { MyLists } from './MyLists';
import { loadUserInfo, saveAuthorizationToLocalStorage } from './userInfo';

export function App() {
    const authorizationExpireDate = localStorage.getItem('expire_date');
    const isAuthorizationInURL = window.location.href.includes('access_token');

    if ((authorizationExpireDate && new Date(authorizationExpireDate) < new Date()) || !isAuthorizationInURL && !authorizationExpireDate) {
        localStorage.clear();
        return <Login />;
    }
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                await loadUserInfo();
                setIsLoading(false);
            } catch (error) {
                console.error(`couldn't fetch user info ${error}`);
                return;
            }
        }

        saveAuthorizationToLocalStorage();
        fetchUser();
    }, []);

    return (
        <>{
        isLoading ? (<span>loading...</span>) : (<MyLists />)
        }
        </>);
}