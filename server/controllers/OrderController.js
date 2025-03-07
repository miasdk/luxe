import OrderService from "../services/OrderService.js";
class OrderController {
    // Create a new order
    static async createOrder(req, res) {
        try { 
            const { userId, orderItems, totalPrice, paymentMethodId } = req.body;
            const order = await OrderService.createOrder(userId, orderItems, totalPrice, paymentMethodId);
            res.status(201).json(order);
        } catch (error) {
            console.log("OrderController.createOrder(): Error:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // Retrieve an order by ID
    static async getOrderById(req, res) {
        try { 
            const { orderId } = req.params; 
            const order = await OrderService.getOrderById(orderId);
            if (!order) return res.status(404).json({ error: 'Order not found' });
            res.status(200).json(order);
        } catch (error) {
            console.error("Error fetching order:", error.message); 
            res.status(500).json({ message: "Failed to retrieve order"}); 
        }
    } 

    // Retrieve orders for a specific user
    static async getOrdersByUserId(req, res) {
        try { 
            const { userId } = req.params;
            const orders = await OrderService.getOrdersByUserId(userId);
            res.status(200).json(orders); 
        } catch (error) { 
            console.error("Error fetching user orders:", error.message); 
            res.status(500).json({ message: "Failed to retrieve user orders"});
        }
    }

    // Update the status of an order
    static async updateOrderStatus(req, res) {
        try { 
            const { orderId } = req.params;
            const { status } = req.body;
            const updateOrder = await OrderService.updateOrderStatus(orderId, status);
            res.status(200).json(updateOrder);
        } catch (error) {
            console.error("Error updating order status:", error.message);
            res.status(500).json({ message: "Failed to update order status"});
        }
    } 

    // Delete an order (Only if not shipped or delivered)
    static async deleteOrder(req, res) { 
        try { 
            const { orderId } = req.params;
            const deletedOrder = await OrderService.deleteOrder(orderId);
            if (!deletedOrder) return res.status(400).json({ message: "Cannot delete order"}); 
            res.status(200).json({ message: "Order deleted successfully"});
        } catch (error) {
            console.error("Error deleting order:", error.message);
            res.status(500).json({ message: "Failed to delete order"});
        }
    }

    // Retrieve all orders (Admin only)
    static async getAllOrders(req, res) {
        try { 
            const orders = await OrderService.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error("Error fetching all orders:", error.message);
            res.status(500).json({ message: "Failed to retrieve all orders"});
        }
    }
}

export default OrderController;