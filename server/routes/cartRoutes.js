import express from 'express';
import CartController from '../controllers/CartController.js';

const router = express.Router();

// Route to get cart details by cart ID
router.get('/:cartId', CartController.getCartDetails);

// Route to add an item to the cart
router.post('/add-item', CartController.addItemToCart);

// Route to update the quantity of an item in the cart
router.put('/update-item', CartController.updateCartItem);

// Route to remove an item from the cart
router.delete('/remove-item', CartController.removeCartItem);

// Route to clear the entire cart
router.post('/clear', CartController.clearCart);

// Route to create a cart for a user
router.post('/create', CartController.createCart);

// Route to get cart by user ID
router.get('/user/:userId', CartController.getCartByUserId);

export default router;