import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function LogoutButton() {
    const { logout } = useContext(AuthContext);
    return <button onClick={logout}>Logout</button>;
}
