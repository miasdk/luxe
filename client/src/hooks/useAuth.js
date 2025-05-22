import { useEffect, useState } from 'react';
import { auth } from '../firebase/client.js';
import { onAuthStateChanged } from 'firebase/auth';
import { use } from 'react';

export function useAuth() { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null); 
            }
            setLoading(false); 
        });

        return () => unsubscribe();
    }
    , []);
    return { user, loading };
}