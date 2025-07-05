/**
 * @swagger
 * /newsletter/subscribe:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to subscribe
 *             required:
 *               - email
 *     responses:
 *       201:
 *         description: Successfully subscribed to newsletter
 *       400:
 *         description: Invalid email address
 *       409:
 *         description: Email already subscribed
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /newsletter/unsubscribe:
 *   post:
 *     summary: Unsubscribe from newsletter
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to unsubscribe
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Successfully unsubscribed from newsletter
 *       400:
 *         description: Invalid email address
 *       404:
 *         description: Email not found in newsletter list
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /newsletter/subscribers:
 *   get:
 *     summary: Get all newsletter subscribers (admin only)
 *     tags: [Newsletter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of newsletter subscribers
 *       500:
 *         description: Internal server error
 */

import express from 'express';
import NewsletterController from '../controllers/NewsletterController.js';
import { authenticateFirebaseToken } from '../middleware/firebaseAuthMiddleware.js';

const router = express.Router();

router.post('/subscribe', NewsletterController.subscribe);
router.post('/unsubscribe', NewsletterController.unsubscribe);
router.get('/subscribers', authenticateFirebaseToken, NewsletterController.getAllSubscribers);

export default router; 