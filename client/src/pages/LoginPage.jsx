import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.jsx';

export default function LoginPage() {
    const navigate = useNavigate();
    
    return ( 
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-8 bg-white rounded-lg">
                <LoginForm onSuccess={() => navigate('/')} />
            </div>
        </div>
    );
}