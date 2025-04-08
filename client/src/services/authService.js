import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../firebase/client.js';

//Register User
export const registerUser = async (email, password, displayName) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uid: userCredential.user.uid,
                email: email,
                display_name: displayName,
                photo_url: null,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }
      
          return await response.json();  // Always parse the JSON response
        } catch (error) {
          throw new Error(error.message || 'Registration failed');
    }
};

//Login User 

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return userCredential.user;
    } catch (error) {
        throw transformAuthError(error);
    }
}

//Logout User
export const logoutUser = async () => {
    await signOut(auth);
}

//Transform Auth Error
const transformAuthError = (error) => {
    const defaultMessage = 'Authentication failed. Please try again.';

    const errorMap = {
        'auth/email-already-in-use': 'Email already in use',
        'auth/invalid-credential': 'Invalid email or password', 
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/user-not-found': 'No account found for this email',
    }; 

    return new Error(
        errorMap[error.code] ||
        error.message || 
        defaultMessage
    );
}

