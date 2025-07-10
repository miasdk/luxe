import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import RegisterForm from "../components/features/auth/RegisterForm";
import { FaGoogle } from 'react-icons/fa';
import { useState } from 'react';

export default function RegisterPage() {
    const { user } = useAuth();
    const { signInWithGoogle } = useAuthContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (user) {
        navigate("/");
        return null;
    }

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError('');
            await signInWithGoogle();
            navigate('/');
        } catch (error) {
            setError('Google sign-in failed. Please try again.');
            console.error('Google sign-in error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create an account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        sign in to your account
                    </Link> 
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="py-8 px-4 sm:rounded-lg sm:px-10">
                    <RegisterForm />
    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 text-sm text-center">
                                {error}
                            </div>
                        )}
                        
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={loading}
                                className={`w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium transition-colors ${
                                    loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                                }`}
                            >
                                <FaGoogle className="w-5 h-5 mr-2" />
                                {loading ? 'Signing in...' : 'Google'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}