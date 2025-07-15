import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardPage() {
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({ amount: '', description: '', date: '', type: 'income' });
    const [error, setError] = useState('');

    // Fetch transactions
    useEffect(() => {
        api.get('/transactions')
            .then(res => setTransactions(res.data))
            .catch(err => {
                console.error(err);
                setError('Failed to load transactions. Are you logged in?');
            });
    }, []);

    // Calculate totals
    const income = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
    const net = income + expenses;

    // Handle new transaction
    const handleSubmit = async (e) => {
        e.preventDefault();
        const amt = form.type === 'income' ? Math.abs(+form.amount) : -Math.abs(+form.amount);
        try {
            const res = await api.post('/transactions', {
                ...form,
                amount: amt
            });
            setTransactions([...transactions, res.data]);
            setForm({ amount: '', description: '', date: '', type: 'income' });
        } catch (err) {
            setError('Failed to add transaction');
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <p><strong>Total Income:</strong> ${income.toFixed(2)}</p>
                <p><strong>Total Expenses:</strong> ${Math.abs(expenses).toFixed(2)}</p>
                <p><strong>Net Balance:</strong> ${net.toFixed(2)}</p>
            </div>

            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Amount" value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })} required />
                <input type="text" placeholder="Description" value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })} required />
                <input type="date" value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })} required />
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit">Add</button>
            </form>

            <h2>Transactions</h2>
            <ul>
                {transactions.map(tx => (
                    <li key={tx.id}>
                        {tx.date} — {tx.description} — ${tx.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}
