/**
 * @ Brief: This file contains the schema of the cart model
 */

import { pool } from "../config/database.js"; 

class CartModel {
    // Get a user's cart (create if not exists)
    static async getCartByUserId(userId) {
        const query = `
            SELECT * FROM carts WHERE user_id = $1
        `;
        const result = await pool.query(query, [userId]);
        
        // If cart does not exist, create a new cart
        if (result.rows.length === 0) {
            return await CartModel.createCart(userId);
        }
        return result.rows[0];
    }

    // Create a new cart for a user 
    static async createCart(userId) {
        const query = `
            INSERT INTO carts (user_id) VALUES ($1) RETURNING *
        `;
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    }

    // Add an item to the cart (insert or update quantity)
    static async addItemToCart(cartId, productId, quantity) {
        const query = `
            INSERT INTO cart_products (cart_id, product_id, quantity) { 
            VALUES ($1, $2, $3)
            ON CONFLICT (cart_id, product_id) 
            DO UPDATE SET quantity = cart_products.quantity + $3
            RETURNING *
        `;
        const result = await pool.query(query, [cartId, productId, quantity]);
        return result.rows[0];
    }

    //Update cart item quantity 
    static async updateCartItemQuantity(cartId, productId, quantity) {
        const query = `
            UPDATE cart_products SET quantity = $3
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *
        `;
        const result = await pool.query(query, [cartId, productId, quantity]);
        return result.rows[0];
    }

    // Remove an item from the cart  
    static async removeCartItem(cartId, productId) {
        const query = `
            DELETE FROM cart_products 
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *
        `;
        const result = await pool.query(query, [cartId, productId]);
        return result.rows[0];
    }

    // Clear the cart
    static async clearCart(cartId) {
        const query = `
            DELETE FROM cart_products WHERE cart_id = $1
        `;
        await pool.query(query, [cartId]);
    }

    


}