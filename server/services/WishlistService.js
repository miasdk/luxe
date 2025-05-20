import WishlistModel from '../models/WishlistModel.js';

class WishlistService {
    /**
     * Get all wishlist items for a user
     * 
     * @param {string} userId - The user's ID
     * @returns {Promise<Array>} - Array of wishlist items
     */
    async getWishlistByUserId(userId) {
        try {
            return await WishlistModel.getWishlistByUserId(userId);
        } catch (error) {
            console.error('WishlistService.getWishlistByUserId(): Error:', error.message);
            throw error;
        }
    }

    /**
     * Add a product to user's wishlist
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<Object>} - The created wishlist item
     */
    async addToWishlist(userId, productId) {
        try {
            return await WishlistModel.addToWishlist(userId, productId);
        } catch (error) {
            console.error('WishlistService.addToWishlist(): Error:', error.message);
            throw error;
        }
    }

    /**
     * Remove a product from user's wishlist
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<boolean>} - True if removed successfully
     */
    async removeFromWishlist(userId, productId) {
        try {
            return await WishlistModel.removeFromWishlist(userId, productId);
        } catch (error) {
            console.error('WishlistService.removeFromWishlist(): Error:', error.message);
            throw error;
        }
    }

    /**
     * Check if a product is in user's wishlist
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<boolean>} - True if product is in wishlist
     */
    async isInWishlist(userId, productId) {
        try {
            return await WishlistModel.isInWishlist(userId, productId);
        } catch (error) {
            console.error('WishlistService.isInWishlist(): Error:', error.message);
            throw error;
        }
    }

    /**
     * Clear all items from user's wishlist
     * 
     * @param {string} userId - The user's ID
     * @returns {Promise<boolean>} - True if cleared successfully
     */
    async clearWishlist(userId) {
        try {
            return await WishlistModel.clearWishlist(userId);
        } catch (error) {
            console.error('WishlistService.clearWishlist(): Error:', error.message);
            throw error;
        }
    }
}

// Export as a singleton
export default new WishlistService();