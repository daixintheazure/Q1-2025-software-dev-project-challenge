import { useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.pr4eventDefault();
        try {
            await api.post('/signup', form);

            const res = await api.post('/login', {
                username: form.username,
                password: form.password
            });
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data || 'Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input type="text" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} required />
            <input type="text" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
            <input type="text" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button type="submit">Register</button>

        </form>
    );

    
}