import { useLocation } from 'react-router-dom';

export function MyLists() {
    let location = useLocation();
    
    location
        .hash
        .substring(1)
        .split('&')
        .forEach(item => {
            localStorage.setItem(item.split('=')[0], item.split('=')[1])
        });
    
    return <span>my lists</span>
}