import { useEffect, useState } from 'react';
import { Login } from './Login';
import { MyLists } from './MyLists';
import { loadUserInfo, saveAuthorizationToLocalStorage } from './userInfo';

export function App() {
    const authorizationExpireDate = localStorage.getItem('expire_date');
    
    if (authorizationExpireDate && new Date(authorizationExpireDate) < new Date()) {
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