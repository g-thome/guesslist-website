import '../index.css';
import { UserContextProvider } from '../context/UserContext';

export default function MyApp({ Component, pageProps }) {
    return (
        <UserContextProvider>
            <Component {...pageProps} />
        </UserContextProvider>
    )
}