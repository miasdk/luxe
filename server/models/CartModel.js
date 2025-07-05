import { pool } from '../config/database.js';

class CartModel {
    // Get a user's cart (create if not exists)
    static async getCartByUserId(userId) {
        const query = `
            SELECT * FROM carts WHERE user_id = $1;
        `;
        const result = await pool.query(query, [userId]);
        
        if (result.rows.length === 0) {
            return await CartModel.createCart(userId);
        }
        return result.rows[0];
    }

    // Create a cart for a user
    static async createCart(userId) {
        const query = `
            INSERT INTO carts (user_id) VALUES ($1) RETURNING *;
        `;
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    }

    // Add item to cart (insert or update quantity)
    static async addItemToCart(cartId, productId, quantity) {
        const query = `
            INSERT INTO cart_products (cart_id, product_id, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (cart_id, product_id)
            DO UPDATE SET quantity = cart_products.quantity + $3
            RETURNING *;
        `;
        const result = await pool.query(query, [cartId, productId, quantity]);
        return result.rows[0];
    }

    // Update cart item quantity
    static async updateCartItem(cartId, productId, quantity) {
                const query = `
            UPDATE cart_products
            SET quantity = $3
            WHERE cart_id = $1 AND product_id = $2
            RETURNING *;
        `;
    
        const result = await pool.query(query, [cartId, productId, quantity]);
        
        return result.rows[0];
    }

    // Remove an item from the cart
    static async removeCartItem(cartId, productId, quantity = 1) {
        // First check current quantity
        const checkQuery = `
            SELECT quantity FROM cart_products
            WHERE cart_id = $1 AND product_id = $2;
        `;
        const checkResult = await pool.query(checkQuery, [cartId, productId]);
        
        if (checkResult.rows.length === 0) {
            // Item doesn't exist in cart
            return null;
        }
        
        const currentQuantity = checkResult.rows[0].quantity;
        
        // If removing all or more than what's in cart, delete the item
        if (quantity >= currentQuantity) {
            const deleteQuery = `
                DELETE FROM cart_products 
                WHERE cart_id = $1 AND product_id = $2
                RETURNING *;
            `;
            await pool.query(deleteQuery, [cartId, productId]);
            return null; // Item completely removed
        } 
        // Otherwise, just decrement the quantity
        else {
            const updateQuery = `
                UPDATE cart_products
                SET quantity = quantity - $3
                WHERE cart_id = $1 AND product_id = $2
                RETURNING *;
            `;
            const result = await pool.query(updateQuery, [cartId, productId, quantity]);
            return result.rows[0]; // Return updated item
        }
    }
    // Clear the entire cart
    static async clearCart(cartId) {
        const query = `
            DELETE FROM cart_products WHERE cart_id = $1;
        `;
        await pool.query(query, [cartId]);
    }

    // Get cart details including products
    static async getCartDetails(cartId) {
        // Use a direct join query instead of relying on a view
        const query = `
            SELECT 
                cp.cart_id,
                cp.product_id,
                cp.quantity,
                p.id,
                p.title,
                p.price,
                p.description,
                p.image
            FROM cart_products cp
            JOIN products p ON cp.product_id = p.id
            WHERE cp.cart_id = $1;
        `;
        const result = await pool.query(query, [cartId]);
        return result.rows;
    }

    // Get all carts - admin only
    static async getAllCarts() {
        const query = `
            SELECT * FROM carts;
        `;
        const result = await
        pool.query(query);
        return result.rows;
    }
}

export default CartModel;
