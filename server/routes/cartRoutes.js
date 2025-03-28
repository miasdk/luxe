import express from 'express';
import CartController from '../controllers/CartController.js';

const router = express.Router();

// Route to create a cart for a user (should come first since it's essential for other operations)
router.post('/create', CartController.createCart);

// Route to add an item to the cart
router.post('/add-item', CartController.addItemToCart);

// Route to update the quantity of an item in the cart
router.put('/update-item', CartController.updateCartItem);

// Route to remove an item from the cart
router.delete('/remove-item', CartController.removeCartItem);

// Route to clear the entire cart
router.post('/clear', CartController.clearCart);

// Route to get cart by user ID (placed before the dynamic `/:cartId` to prevent conflicts)
router.get('/user/:userId', CartController.getCartByUserId);

// Route to get all carts (should be before the dynamic `/:cartId` to avoid conflicts)
router.get('/', CartController.getAllCarts);

// Route to get cart details by cart ID (placed last to prevent it from capturing other GET requests)
router.get('/:cartId', CartController.getCartDetails);

export default router;
