import OrderModel from '../models/OrderModel.js'; 
import PaymentService from './PaymentService.js';

class OrderService {
    //Create a new order with Stripe payment processing 
    static async createOrder(userId, orderItems, paymentMethodId) {
        const client = await pool.connect(); 

        try {
            await client.query('BEGIN');

            // Step 1: Process payment using Stripe 
            const paymentIntent = await PaymentService.processPayment(totalPrice, paymentMethodId);
            const stripePaymentId = paymentIntent.id;

            // Step 2: Create a new order in the database
            const order = await OrderModel.createOrder(userId, totalPrice, "paid", stripePaymentId);
            const orderId = order.id;

            // Step 3: Add items to the order
            await OrderModel.addOrderItems(orderId, orderItems);

            await client.query('COMMIT'); // Commit the transaction
            return order;
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback the transaction
            console.error("OrderService.createOrder(): Error:", error.message);
            throw new Error("Order creation failed: " + error.message);
        } finally {
            client.release();
        }
    }

    //Retrieve a specific order by ID 
    static async getOrderById(orderId) {
        return await OrderModel.getOrderById(orderId);
    }

    //Retrieve all orders for a specific user
    static async getOrdersByUserId(userId) {
        return await OrderModel.getOrdersByUserId(userId);
    }

    //Update the status of an order
    static async updateOrderStatus(orderId, status) {
        return await OrderModel.updateOrderStatus(orderId, status);
    }

    //Delete an order (Only if not shipped or delivered)
    static async deleteOrder(orderId) {
        return await OrderModel.deleteOrder(orderId);
    }

    //Calculate the total price of an order
    static calculateTotalPrice(orderItems) {
        return orderItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
    }

    //Retrieve all orders (Admin only)
    static async getAllOrders() {
        return await OrderModel.getAllOrders();
    }
}

export default new OrderService();