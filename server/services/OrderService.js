import OrderModel from '../models/OrderModel.js'; 
import PaymentService from './PaymentService.js';
import { pool } from '../config/database.js';

class OrderService {
    // Create a new order with Stripe payment processing 
    // Create a new order and generate a PaymentIntent
    async createOrder(userId, orderItems) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            // Step 1: Calculate total price
            const totalPrice = this.calculateTotalPrice(orderItems);

            // Step 2: Create a PaymentIntent with Stripe
            const { clientSecret, stripePaymentId } = await PaymentService.createPaymentIntent(totalPrice);

            // Step 3: Create a new order in the database (initially 'pending')
            const order = await OrderModel.createOrder(userId, totalPrice, "pending", stripePaymentId);
            const orderId = order.id;

            // Step 4: Add items to the order
            await OrderModel.addOrderItems(orderId, orderItems);

            await client.query("COMMIT");
            return { order, clientSecret }; // Send clientSecret to frontend
        } catch (error) {
            await client.query("ROLLBACK");
            console.error("❌ OrderService.createOrder(): Error:", error.message);
            throw new Error("Order creation failed: " + error.message);
        } finally {
            client.release();
        }
    }

    // Confirm payment and update the order status
    async confirmPayment(orderId, stripePaymentId) {
        try {
            const updatedOrder = await OrderModel.updateOrderPayment(orderId, stripePaymentId, "paid");
            return updatedOrder;
        } catch (error) {
            console.error("❌ OrderService.confirmPayment(): Error:", error.message);
            throw new Error("Failed to confirm payment: " + error.message);
        }
    }

    // Calculate total price of the order
    calculateTotalPrice(orderItems) {
        return orderItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
    }
    
    // Retrieve a specific order by ID 
    async getOrderById(orderId) {
        return await OrderModel.getOrderById(orderId);
    }

    // Retrieve all orders for a specific user
    async getOrdersByUserId(userId) {
        return await OrderModel.getOrdersByUserId(userId);
    }

    // Update the status of an order
    async updateOrderStatus(orderId, status) {
        return await OrderModel.updateOrderStatus(orderId, status);
    }

    // Delete an order (Only if not shipped or delivered)
    async deleteOrder(orderId) {
        return await OrderModel.deleteOrder(orderId);
    }

    // Calculate the total price of an order
    calculateTotalPrice(orderItems) {
        return orderItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
    }

    // Retrieve all orders (Admin only)
    async getAllOrders() {
        return await OrderModel.getAllOrders();
    }
}

// Export as a single instance
export default new OrderService();