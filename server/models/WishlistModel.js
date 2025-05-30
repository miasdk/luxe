/**
 * @file This file contains the WishlistModel class which is responsible for handling 
 * all the database queries related to the wishlists table.
 */

import { pool } from '../config/database.js';

class WishlistModel {
    /**
     * Get all wishlist items for a specific user
     * 
     * @param {string} userId - The user's ID
     * @returns {Promise<Array>} - Array of wishlist items with product details
     */
    // Fix your query in WishlistModel.js
    static async getWishlistByUserId(userId) {
        const query = `
            SELECT w.id as wishlist_id, w.user_id, w.created_at, 
                p.product_id, p.title, p.price, p.image, p.description,
                p.brand_name, p.category_name, p.sizes, p.colors, p.conditions
            FROM wishlists w
            JOIN product_details p ON w.product_id = p.product_id
            WHERE w.user_id = $1
            ORDER BY w.created_at DESC;
        `;
    // Rest of the function remains the same

        try {
            const result = await pool.query(query, [userId]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching wishlist items:', error.message);
            throw new Error('Database error: Failed to retrieve wishlist items');
        }
    }

    /**
     * Add a product to user's wishlist
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<Object>} - The created wishlist item
     */
    static async addToWishlist(userId, productId) {
        const query = `
            INSERT INTO wishlists (user_id, product_id)
            VALUES ($1, $2)
            ON CONFLICT (user_id, product_id) DO NOTHING
            RETURNING *;
        `;
        
        try {
            const result = await pool.query(query, [userId, productId]);
            return result.rows[0];
        } catch (error) {
            console.error('Error adding to wishlist:', error.message);
            throw new Error('Database error: Failed to add item to wishlist');
        }
    }

    /**
     * Remove a product from user's wishlist
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<boolean>} - True if removed successfully
     */
    static async removeFromWishlist(userId, productId) {
        const query = `
            DELETE FROM wishlists
            WHERE user_id = $1 AND product_id = $2
            RETURNING *;
        `;
        
        try {
            const result = await pool.query(query, [userId, productId]);
            return result.rows.length > 0;
        } catch (error) {
            console.error('Error removing from wishlist:', error.message);
            throw new Error('Database error: Failed to remove item from wishlist');
        }
    }

    /**
     * Check if a product is in user's wishlist
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<boolean>} - True if product is in wishlist
     */
    static async isInWishlist(userId, productId) {
        const query = `
            SELECT EXISTS(
                SELECT 1 FROM wishlists
                WHERE user_id = $1 AND product_id = $2
            );
        `;
        
        try {
            const result = await pool.query(query, [userId, productId]);
            return result.rows[0].exists;
        } catch (error) {
            console.error('Error checking wishlist status:', error.message);
            throw new Error('Database error: Failed to check wishlist status');
        }
    }

    /**
     * Clear all items from user's wishlist
     * @param {string} userId - The user's ID
     * @returns {Promise<boolean>} - True if cleared successfully
     */
    static async clearWishlist(userId) {
        const query = `
            DELETE FROM wishlists
            WHERE user_id = $1
            RETURNING *;
        `;
        
        try {
            const result = await pool.query(query, [userId]);
            return result.rowCount > 0;
        } catch (error) {
            console.error('Error clearing wishlist:', error.message);
            throw new Error('Database error: Failed to clear wishlist');
        }
    }
}

export default WishlistModel;