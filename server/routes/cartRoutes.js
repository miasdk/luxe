/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         cart_id:
 *           type: integer
 *           example: 1
 *         product_id:
 *           type: integer
 *           example: 1
 *         quantity:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /cart/user/{userId}:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User's cart items
 */

/**
 * @swagger
 * /cart/add-item:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: integer
 *               productId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart
 */
import express from 'express';
import CartController from '../controllers/CartController.js';

const router = express.Router();

router.post('/create', CartController.createCart);
router.post('/add-item', CartController.addItemToCart);
router.put('/update-item', CartController.updateCartItem);
router.delete('/remove-item', CartController.removeCartItem);
router.post('/clear', CartController.clearCart);
router.get('/user/:userId', CartController.getCartByUserId);
router.get('/', CartController.getAllCarts);
router.get('/:cartId', CartController.getCartDetails);

export default router;
