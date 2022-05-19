import { Login } from './Login';
import { MyLists } from './MyLists';

export function App() {
    const authorizationExpireDate = localStorage.getItem('expire_date');
    if (!authorizationExpireDate || new Date(authorizationExpireDate) < new Date()) {
        return <Login />;
    }

    return <MyLists />;
}