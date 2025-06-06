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
    static async getWishlistByUserId(userId) {
        const query = `
            SELECT w.id as wishlist_id, w.user_id, w.created_at, 
                p.product_id, p.title, p.price, p.image, p.description,
                p.brand_name, p.category_name, p.sizes, p.colors, p.conditions, p.num_likes
            FROM wishlists w
            JOIN product_details p ON w.product_id = p.product_id
            WHERE w.user_id = $1
            ORDER BY w.created_at DESC;
        `;

        try {
            const result = await pool.query(query, [userId]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching wishlist items:', error.message);
            throw new Error('Database error: Failed to retrieve wishlist items');
        }
    }

    /**
     * Add a product to user's wishlist and increment like count
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<Object>} - The created wishlist item
     */
    static async addToWishlist(userId, productId) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
            
            // Check if already in wishlist
            const existingQuery = `
                SELECT id FROM wishlists 
                WHERE user_id = $1 AND product_id = $2
            `;
            const existing = await client.query(existingQuery, [userId, productId]);
            
            if (existing.rows.length > 0) {
                await client.query('ROLLBACK');
                return null; // Already in wishlist
            }
            
            // Add to wishlist
            const insertQuery = `
                INSERT INTO wishlists (user_id, product_id)
                VALUES ($1, $2)
                RETURNING *;
            `;
            const result = await client.query(insertQuery, [userId, productId]);
            
            // Increment like count
            const updateLikesQuery = `
                UPDATE products 
                SET num_likes = num_likes + 1 
                WHERE id = $1
            `;
            await client.query(updateLikesQuery, [productId]);
            
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error adding to wishlist:', error.message);
            throw new Error('Database error: Failed to add item to wishlist');
        } finally {
            client.release();
        }
    }

    /**
     * Remove a product from user's wishlist and decrement like count
     * 
     * @param {string} userId - The user's ID
     * @param {number} productId - The product's ID
     * @returns {Promise<boolean>} - True if removed successfully
     */
    static async removeFromWishlist(userId, productId) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
            
            // Remove from wishlist
            const deleteQuery = `
                DELETE FROM wishlists
                WHERE user_id = $1 AND product_id = $2
                RETURNING *;
            `;
            const result = await client.query(deleteQuery, [userId, productId]);
            
            if (result.rows.length === 0) {
                await client.query('ROLLBACK');
                return false; // Not in wishlist
            }
            
            // Decrement like count (but don't go below 0)
            const updateLikesQuery = `
                UPDATE products 
                SET num_likes = GREATEST(num_likes - 1, 0)
                WHERE id = $1
            `;
            await client.query(updateLikesQuery, [productId]);
            
            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error removing from wishlist:', error.message);
            throw new Error('Database error: Failed to remove item from wishlist');
        } finally {
            client.release();
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
     * Clear all items from user's wishlist and decrement like counts
     * @param {string} userId - The user's ID
     * @returns {Promise<boolean>} - True if cleared successfully
     */
    static async clearWishlist(userId) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
            
            // Get all products in user's wishlist
            const getProductsQuery = `
                SELECT product_id FROM wishlists WHERE user_id = $1
            `;
            const products = await client.query(getProductsQuery, [userId]);
            
            if (products.rows.length === 0) {
                await client.query('ROLLBACK');
                return false; // Wishlist already empty
            }
            
            // Remove all from wishlist
            const deleteQuery = `
                DELETE FROM wishlists
                WHERE user_id = $1
                RETURNING *;
            `;
            const result = await client.query(deleteQuery, [userId]);
            
            // Decrement like counts for all products
            for (const product of products.rows) {
                const updateLikesQuery = `
                    UPDATE products 
                    SET num_likes = GREATEST(num_likes - 1, 0)
                    WHERE id = $1
                `;
                await client.query(updateLikesQuery, [product.product_id]);
            }
            
            await client.query('COMMIT');
            return result.rowCount > 0;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error clearing wishlist:', error.message);
            throw new Error('Database error: Failed to clear wishlist');
        } finally {
            client.release();
        }
    }
}

export default WishlistModel;