import { useState } from 'react';

export default function LoginForm({ onSubmit, loading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ email, password });
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-md mt-5 mx-auto p-6 bg-white rounded-lg'>
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
            <button
                type='submit'
                disabled={loading}
                className={`w-full py-2 px-4 bg-blue-600 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Loading...' : 'Login'}
            </button>
            <p className='mt-4 text-center'>
                Don't have an account? <a href='/register' className='text-blue-600'>Register</a>
            </p>
            <p className='mt-4 text-center'>
                <a href='/forgot-password' className='text-blue-600'>Forgot Password?</a>
            </p>
        </form>
    );
}