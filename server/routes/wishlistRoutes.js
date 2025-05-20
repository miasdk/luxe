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