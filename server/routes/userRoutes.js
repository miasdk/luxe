import express from 'express'; 
import UserController from '../controllers/UserController.js';
import { authenticateFirebaseToken } from '../middleware/firebaseAuthMiddleware.js';

const router = express.Router();

router.post('/login', UserController.handleFirebaseLogin); // Typically login doesn't require auth
router.post('/register', UserController.handleRegistration); // Registration doesn't require auth
router.get('/:id', authenticateFirebaseToken, UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.delete('/:id', authenticateFirebaseToken, UserController.deleteUserById);

export default router;