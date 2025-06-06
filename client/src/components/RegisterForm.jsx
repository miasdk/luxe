import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassweord] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const  handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true); 
        setError('');
        
        try {
            await registerUser(email, password, displayName);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassweord(e.target.value)}
                required
                className="w-full p-2 border rounded-lg"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button 
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
                {loading ? 'Creating account...' : 'Register'}
            </button>
        </form>
    )


}