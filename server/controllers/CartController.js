import cartService from "../services/CartService.js";

class CartController {
    // Get user's cart details
    static async getCartDetails(req, res) {
        const { cartId } = req.params;
        try {
            const cartDetails = await cartService.getCartDetails(cartId);
            res.status(200).json(cartDetails);
        } catch (error) {
            console.error("Error fetching cart details:", error);
            res.status(500).json({ message: "Failed to retrieve cart details" });
        }
    }

    // Add item to cart
    static async addItemToCart(req, res) {
        const { cartId, productId, quantity } = req.body;
        try {
            const cartItem = await cartService.addItemToCart(cartId, productId, quantity);
            res.status(201).json(cartItem);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            res.status(500).json({ message: "Failed to add item to cart" });
        }
    }

    // Update cart item quantity
    static async updateCartItem(req, res) {
        const { cartId, productId, quantity } = req.body;
        try {
            const updatedItem = await cartService.updateCartItem(cartId, productId, quantity);
            res.status(200).json(updatedItem);
        } catch (error) {
            console.error("Error updating cart item:", error);
            res.status(500).json({ message: "Failed to update cart item" });
        }
    }

    // Remove item from cart
    static async removeCartItem(req, res) {
        // Ensure this extracts quantity from the request body
        const { cartId, productId, quantity = 1 } = req.body;
        try {
            await cartService.removeCartItem(cartId, productId, quantity);
            res.status(204).end();
        } catch (error) {
            console.error("Error removing cart item:", error);
            res.status(500).json({ message: "Failed to remove item from cart" });
        }
    }

    // Clear the entire cart
    static async clearCart(req, res) {
        const { cartId } = req.body;
        try {
            await cartService.clearCart(cartId);
            res.status(204).end();
        } catch (error) {
            console.error("Error clearing cart:", error);
            res.status(500).json({ message: "Failed to clear cart" });
        }
    }

    // Create a cart for a user
    static async createCart(req, res) {
        const { userId } = req.body;
        try {
            const newCart = await cartService.createCart(userId);
            res.status(201).json(newCart);
        } catch (error) {
            console.error("Error creating cart:", error);
            res.status(500).json({ message: "Failed to create cart" });
        }
    }

    // Get cart by user ID
    static async getCartByUserId(req, res) {
        const { userId } = req.params;
        try {
            // Get the cart record
            const cart = await cartService.getCartByUserId(userId);
            
            // Now also get the cart products with their details
            const cartProducts = await cartService.getCartDetails(cart.id);
            
            // Return a combined response
            res.status(200).json({
                id: cart.id,
                user_id: cart.user_id,
                created_at: cart.created_at,
                products: cartProducts // Include the products array
            });
        } catch (error) {
            console.error("Error fetching cart by user ID:", error);
            res.status(500).json({ message: "Failed to retrieve cart" });
        }
    }

    // Get all carts (admin only)
    static async getAllCarts(req, res) {
        try {
            const carts = await cartService.getAllCarts();
            res.status(200).json(carts);
        } catch (error) {
            console.error("Error fetching all carts:", error);
            res.status(500).json({ message: "Failed to retrieve carts" });
        }
    }
}

export default CartController;