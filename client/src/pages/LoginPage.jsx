import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/client.js';
import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage() {
    const [error, setError ] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }  finally {
            setLoading(false);
        }
    }

    return ( 
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg">
                {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
                <LoginForm onSubmit={handleLogin} loading={loading} />
            </div>
        </div>
    );
}
