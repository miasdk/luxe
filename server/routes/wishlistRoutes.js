/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add product to wishlist
 *     description: Add a product to the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [user_id, product_id]
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: User Firebase UID
 *                 example: "firebase_user_123"
 *               product_id:
 *                 type: integer
 *                 description: Product ID to add to wishlist
 *                 example: 1
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WishlistItem'
 *       400:
 *         description: Invalid input data or product already in wishlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Product not found
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
 * /wishlist/user/{userId}:
 *   get:
 *     summary: Get user's wishlist
 *     description: Retrieve all products in the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User Firebase UID
 *         schema:
 *           type: string
 *           example: "firebase_user_123"
 *     responses:
 *       200:
 *         description: User wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/WishlistItem'
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
 *   delete:
 *     summary: Clear user's wishlist
 *     description: Remove all products from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User Firebase UID
 *         schema:
 *           type: string
 *           example: "firebase_user_123"
 *     responses:
 *       200:
 *         description: Wishlist cleared successfully
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
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /wishlist/user/{userId}/product/{productId}:
 *   get:
 *     summary: Check if product is in wishlist
 *     description: Check whether a specific product is in the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User Firebase UID
 *         schema:
 *           type: string
 *           example: "firebase_user_123"
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Wishlist status check completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isInWishlist:
 *                   type: boolean
 *                   description: Whether the product is in the user's wishlist
 *                   example: true
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
 *   delete:
 *     summary: Remove product from wishlist
 *     description: Remove a specific product from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: User Firebase UID
 *         schema:
 *           type: string
 *           example: "firebase_user_123"
 *       - name: productId
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
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
 *         description: Product not found in wishlist
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
import WishlistController from '../controllers/WishlistController.js';

const router = express.Router();

// Get all wishlist items for a user
router.get('/user/:userId', WishlistController.getWishlistByUserId);

// Add a product to user's wishlist
router.post('/', WishlistController.addToWishlist);

// Remove a product from user's wishlist
router.delete('/user/:userId/product/:productId', WishlistController.removeFromWishlist);

// Check if a product is in user's wishlist
router.get('/user/:userId/product/:productId', WishlistController.isInWishlist);

// Clear all items from user's wishlist
router.delete('/user/:userId', WishlistController.clearWishlist);

export default router;