import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

// 🌟────────────────────────────────────────────────────────────────────────────────🌟
// 📌 Section: Routes for Managing Orders (POST, PUT, DELETE)
// 🌟────────────────────────────────────────────────────────────────────────────────🌟

// Route to create a new order
router.post('/', OrderController.createOrder);

// Route to update the status of an order
router.put('/:orderId/status', OrderController.updateOrderStatus);

// Route to delete an order
router.delete('/:orderId', OrderController.deleteOrder);

// 🌟────────────────────────────────────────────────────────────────────────────────🌟
// 📌 Section: Routes for Fetching Order Data (GET Requests)
// 🌟────────────────────────────────────────────────────────────────────────────────🌟

// Route to get all orders (admin-only)
router.get('/', OrderController.getAllOrders);

// Route to get an order by ID
router.get('/:orderId', OrderController.getOrderById);

// Route to get orders by user ID
router.get('/user/:userId', OrderController.getOrdersByUserId);

export default router;