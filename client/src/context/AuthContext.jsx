import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/client.js';
import { 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup,
    signOut as firebaseSignOut
} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser ? {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName || null,
                photoURL: firebaseUser.photoURL || null,
            } : null);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const googleProvider = new GoogleAuthProvider();

    // Sign in with Google
    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;
            
            // Register user in backend
            await registerUserInBackend(firebaseUser);
            
            return firebaseUser;
        } catch (error) {
            console.error('Google sign-in error:', error);
            throw new Error(error.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    // Register user in your backend
    const registerUserInBackend = async (firebaseUser) => {
        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            
            const response = await fetch(`${API_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName || firebaseUser.email,
                }),
            });
            
            if (!response.ok && response.status !== 409) { // 409 = user already exists
                throw new Error('Failed to register user in backend');
            }
        } catch (error) {
            console.error('Backend registration error:', error);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Sign out error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            signInWithGoogle,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);