import WishlistService from '../services/WishlistService.js';

class WishlistController {
    /**
     * Get all wishlist items for a user
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async getWishlistByUserId(req, res) {
        const { userId } = req.params;
        
        try {
            const wishlistItems = await WishlistService.getWishlistByUserId(userId);
            res.status(200).json(wishlistItems);
        } catch (error) {
            console.error('Error fetching wishlist:', error.message);
            res.status(500).json({ message: 'Failed to retrieve wishlist items' });
        }
    }

    /**
     * Add a product to user's wishlist
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async addToWishlist(req, res) {
        const { userId, productId } = req.body;
        
        if (!userId || !productId) {
            return res.status(400).json({ 
                message: 'User ID and Product ID are required',
                received: { userId: userId, productId: productId }
            });
        }
        
        // Validate that productId is a valid number
        const productIdNum = parseInt(productId);
        if (isNaN(productIdNum)) {
            return res.status(400).json({ 
                message: 'Product ID must be a valid number',
                received: productId
            });
        }
        
        try {
            const wishlistItem = await WishlistService.addToWishlist(userId, productIdNum);
            
            if (!wishlistItem) {
                return res.status(200).json({ message: 'Item already in wishlist' });
            }
            
            res.status(201).json(wishlistItem);
        } catch (error) {
            console.error('Error adding to wishlist:', error.message);
            res.status(500).json({ message: 'Failed to add item to wishlist', error: error.message });
        }
    }

    /**
     * Remove a product from user's wishlist
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async removeFromWishlist(req, res) {
        const { userId, productId } = req.params;
        
        try {
            const removed = await WishlistService.removeFromWishlist(userId, productId);
            
            if (!removed) {
                return res.status(404).json({ message: 'Item not found in wishlist' });
            }
            
            res.status(200).json({ message: 'Item removed from wishlist' });
        } catch (error) {
            console.error('Error removing from wishlist:', error.message);
            res.status(500).json({ message: 'Failed to remove item from wishlist' });
        }
    }

    /**
     * Check if a product is in user's wishlist
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async isInWishlist(req, res) {
        const { userId, productId } = req.params;
        
        try {
            const isInWishlist = await WishlistService.isInWishlist(userId, productId);
            res.status(200).json({ isInWishlist });
        } catch (error) {
            console.error('Error checking wishlist status:', error.message);
            res.status(500).json({ message: 'Failed to check wishlist status' });
        }
    }

    /**
     * Clear all items from user's wishlist
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async clearWishlist(req, res) {
        const { userId } = req.params;
        
        try {
            const cleared = await WishlistService.clearWishlist(userId);
            
            if (!cleared) {
                return res.status(200).json({ message: 'Wishlist is already empty' });
            }
            
            res.status(200).json({ message: 'Wishlist cleared successfully' });
        } catch (error) {
            console.error('Error clearing wishlist:', error.message);
            res.status(500).json({ message: 'Failed to clear wishlist' });
        }
    }
}

export default WishlistController;