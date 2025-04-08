import admin from '../config/firebase/firebaseAdmin.js';

export const authenticateFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            displayName: decodedToken.name || decodedToken.email || null,
            photoURL: decodedToken.picture || null,
        }; 
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ message: 'Unauthorized: Invalid token' });        
    }
}



