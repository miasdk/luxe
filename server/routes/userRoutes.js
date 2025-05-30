/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uid:
 *                 type: string
 *               email:
 *                 type: string
 *               display_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 */
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