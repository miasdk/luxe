/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (admin)
 *     description: Retrieve all users in the system (admin access only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve detailed information about a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User Firebase UID
 *         schema:
 *           type: string
 *           example: "firebase_user_123"
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Delete user
 *     description: Delete a user account (admin or account owner only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User Firebase UID
 *         schema:
 *           type: string
 *           example: "firebase_user_123"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register new user
 *     description: Register a new user account in the system
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [uid, email, display_name]
 *             properties:
 *               uid:
 *                 type: string
 *                 description: Firebase user UID
 *                 example: "firebase_user_123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address
 *                 example: "user@example.com"
 *               display_name:
 *                 type: string
 *                 description: User display name
 *                 example: "John Doe"
 *               photo_url:
 *                 type: string
 *                 format: url
 *                 description: User profile photo URL
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Handle Firebase user login and sync with local database
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [uid, email]
 *             properties:
 *               uid:
 *                 type: string
 *                 description: Firebase user UID
 *                 example: "firebase_user_123"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User email address
 *                 example: "user@example.com"
 *               display_name:
 *                 type: string
 *                 description: User display name
 *                 example: "John Doe"
 *               photo_url:
 *                 type: string
 *                 format: url
 *                 description: User profile photo URL
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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