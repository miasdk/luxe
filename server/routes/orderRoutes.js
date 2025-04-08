import express from 'express';
import OrderController from '../controllers/OrderController.js';

const router = express.Router();

// Route to create a new order
router.post('/', OrderController.createOrder);

// Confirm payment and update order status
router.put("/:orderId/update-payment", OrderController.updatePaymentId);

// Route to update the status of an order
router.put('/:orderId/status', OrderController.updateOrderStatus);

// Route to delete an order
router.delete('/:orderId', OrderController.deleteOrder);

// Route to get all orders (admin-only)
router.get('/', OrderController.getAllOrders);

// Route to get an order by ID
router.get('/:orderId', OrderController.getOrderById);

// Route to get orders by user ID
router.get('/user/:userId', OrderController.getOrdersByUserId);

export default router;