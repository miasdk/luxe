import { pool } from '../config/database.js';

class OrderModel {
    // Create a new order (initially 'pending')
    static async createOrder(userId, totalPrice, status = "pending", stripePaymentId = null) {
        const query = `
            INSERT INTO orders (user_id, total_price, status, stripe_payment_id, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING *;
        `;
        const values = [userId, totalPrice, status, stripePaymentId];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Update order with Stripe payment ID & set status to "paid"
    static async updateOrderPayment(orderId, stripePaymentId, status) {
        const query = `
            UPDATE orders
            SET stripe_payment_id = $1, status = $2, updated_at = NOW()
            WHERE id = $3
            RETURNING *;
        `;
        const result = await pool.query(query, [stripePaymentId, status, orderId]);
        return result.rows[0];
    }
    // Add items to an order
    static async addOrderItems(orderId, orderItems) {
        const query = `
            INSERT INTO order_items (order_id, product_id, quantity, unit_price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
    
        try {
            const insertedItems = [];
            for (const item of orderItems) {
                const values = [orderId, item.productId, item.quantity, item.unitPrice];
                const result = await pool.query(query, values);
                insertedItems.push(result.rows[0]);
            }
            return insertedItems;
        } catch (error) {
            console.error("❌ Failed to insert order items:", error.message);
            throw new Error("Failed to insert order items: " + error.message);
        }
    }    

    // Retrieve an order by ID
    static async getOrderById(orderId) {
        const query = `SELECT * FROM order_details WHERE order_id = $1;`;
        const result = await pool.query(query, [orderId]);
        return result.rows;
    }

    // Retrieve orders for a specific user
    static async getOrdersByUserId(userId) {
        const query = `SELECT * FROM order_details WHERE user_id = $1 ORDER BY created_at DESC;`;
        const result = await pool.query(query, [userId]);
        return result.rows;
    }

    // Update order status
    static async updateOrderStatus(orderId, status) {
        const query = `
            UPDATE orders SET status = $1, updated_at = NOW()
            WHERE id = $2 RETURNING *;
        `;
        const result = await pool.query(query, [status, orderId]);
        return result.rows[0];
    }

    // Delete an order (Only if not shipped or delivered)
    static async deleteOrder(orderId) {
        const query = `
            DELETE FROM orders WHERE id = $1 AND status NOT IN ('shipped', 'delivered')
            RETURNING *;
        `;
        const result = await pool.query(query, [orderId]);
        return result.rows[0];
    }

     // Retrieve all orders (admin access)
    static async getAllOrders() {
        const query = `SELECT * FROM orders ORDER BY created_at DESC;`;
        const result = await pool.query(query);
        return result.rows;
    }

}

export default OrderModel;
