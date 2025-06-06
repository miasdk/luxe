import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useAuthContext } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';

export default function LoginForm({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false); 
    const { signInWithGoogle } = useAuthContext(); 
    
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

    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true);
            setError('');
            await signInWithGoogle();
            onSuccess(); 
        } catch (error) {
            setError('Google sign-in failed. Please try again.');
            console.error('Google sign-in error:', error);
        } finally {
            setGoogleLoading(false);
        }
    };
    
    return (
        <div className='max-w-md mx-auto p-8 rounded-lg bg-white'>
            <h2 className='mb-10 text-center text-3xl font-extrabold text-gray-900'>Welcome</h2>
            
            <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading || loading}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg transition-colors mb-6 ${
                    googleLoading || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {googleLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
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
                    disabled={loading || googleLoading}
                    className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium transition-colors ${loading || googleLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
            
            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                        Register here  
                    </Link>
                </p>
            </div>
        </div>
    );
}