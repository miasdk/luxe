import { useState } from 'react';
import { loginUser } from '../services/authService';
import { Link } from 'react-router-dom';

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
            onSuccess();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className='max-w-md mx-auto p-8 rounded-lg bg-white'>
            <h2 className='mb-10 text-center text-3xl font-extrabold text-gray-900'>Welcome</h2>
            
            <div className='mb-5'>
                <label htmlFor='email' className='block text-gray-700 text-sm font-medium mb-1'>Email Address</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                />
            </div>
            
            <div className='mb-6'>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor='password' className='block text-gray-700 text-sm font-medium'>Password</label>
                    <a href='/forgot-password' className='text-sm text-blue-600 hover:text-blue-800 transition-colors'>
                        Forgot Password?
                    </a>
                </div>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                />
            </div>
            
            {error && (
                <div className="text-center mb-6 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100">
                    {error}
                </div>
            )}
            
            <button
                type='submit'
                disabled={loading}
                className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                        Register here  
                    </Link>
                </p>
            </div>
        </form>
    );
}