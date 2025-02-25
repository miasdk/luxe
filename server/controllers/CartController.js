import CartService from "../services/CartService";

class CartController {
    // get user's cart details
    static async getCartDetails(req, res) {
        const cartService = new CartService();
        const { cartId } = req.params;
        try {
            const cartDetails = await cartService.getCartDetails(cartId);
            res.status(200).json(cartDetails);
        } catch (error) {
            console.error("Error fetching cart details:", error);
            res.status(500).json({ message: "Failed to retrieve cart details" });
        }
    }

    // add item to cart
    static async addItemToCart(req, res) {
        const cartService = new CartService();
        const { cartId, productId, quantity } = req.body;
        try {
            const cartItem = await cartService.addItemToCart(cartId, productId, quantity);
            res.status(201).json(cartItem);
        } catch (error) {
            console.error("Error adding item to cart:", error);
            res.status(500).json({ message: "Failed to add item to cart" });
        }
    }

    // update cart item quantity
    static async updateCartItem(req, res) {
        const cartService = new CartService();
        const { cartId, productId, quantity } = req.body;
        try {
            const updatedItem = await cartService.updateCartItem(cartId, productId, quantity);
            res.status(200).json(updatedItem);
        } catch (error) {
            console.error("Error updating cart item:", error);
            res.status(500).json({ message: "Failed to update cart item" });
        }
    }

    // remove item from cart
    static async removeCartItem(req, res) {
        const cartService = new CartService();
        const { cartId, productId } = req.body;
        try {
            const removedItem = await cartService.removeCartItem(cartId, productId);
            res.status(200).json(removedItem);
        } catch (error) {
            console.error("Error removing item from cart:", error);
            res.status(500).json({ message: "Failed to remove item from cart" });
        }
    }

    // clear the entire cart
    static async clearCart(req, res) {
        const cartService = new CartService();
        const { cartId } = req.body;
        try {
            await cartService.clearCart(cartId);
            res.status(204).end();
        } catch (error) {
            console.error("Error clearing cart:", error);
            res.status(500).json({ message: "Failed to clear cart" });
        }
    }

    // create a cart for a user
    static async createCart(req, res) {
        const cartService = new CartService();
        const { userId } = req.body;
        try {
            const newCart = await cartService.createCart(userId);
            res.status(201).json(newCart);
        } catch (error) {
            console.error("Error creating cart:", error);
            res.status(500).json({ message: "Failed to create cart" });
        }
    }

    //get cart by user id
    static async getCartByUserId(req, res) {
        const cartService = new CartService();
        const { userId } = req.params;
        try {
            const cart = await cartService.getCartByUserId(userId);
            res.status(200).json(cart);
        } catch (error) {
            console.error("Error fetching cart by user id:", error);
            res.status(500).json({ message: "Failed to retrieve cart" });
        }
    }
}

export default CartController;