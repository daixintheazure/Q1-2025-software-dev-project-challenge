import { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', form);
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="text" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} required />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button type="submit">Login</button>
        </form>
    );
}
