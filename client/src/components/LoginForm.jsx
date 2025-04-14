import { useState } from 'react';
import { loginUser } from '../services/authService';

export default function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await loginUser(email, password);
            onSuccess(); // Call the success callback
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto p-6 rounded-lg'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>

            <div className='mb-4'>
                <label htmlFor='email' className='block text-gray-700'>Email</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='w-full p-2 border rounded-lg'
                />
            </div>

            <div className='mb-4'>
                <label htmlFor='password' className='block text-gray-700'>Password</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='w-full p-2 border rounded-lg'
                />
            </div>

            {error && (
                <div className="text-center mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <button
                type='submit'
                disabled={loading}
                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="mt-4 text-center space-y-2">
                <p>
                    Don't have an account? <a href='/register' className='text-blue-600 hover:underline'>Register</a>
                </p>
                <p>
                    <a href='/forgot-password' className='text-blue-600 hover:underline'>Forgot Password?</a>
                </p>
            </div>
        </form>
    );
}