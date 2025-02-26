import CartModel from "../models/CartModel.js";

class CartService {
    //Get a user's cart details
    async getCartByUserId(userId) {
        try {
            return await CartModel.getCartByUserId(userId);
        } catch (error) {
            console.error("CartService.getCartByUserId(): Error:", error.message);
            throw new Error("Failed to retrieve cart");
        }
    }

    // Get full cart details ( with products ) 
    async getCartDetails(cartId) { 
        try { 
            return await CartModel.getCartDetails(cartId);
        } catch (error) {
            console.error("CartService.getCartDetails(): Error:", error.message);
            throw new Error("Failed to retrieve cart details");
        }
    }

    // Add item to cart
    async addItemToCart(cartId, productId, quantity) {
        try { 
            return await CartModel.addItemToCart(cartId, productId, quantity);
        } catch (error) {
            console.error("CartService.addItemToCart(): Error:", error.message);
            throw new Error("Failed to add item to cart");
        }
    }

    // Update cart item quantity 
    async updateCartItem(cartId, productId, quantity) {
        try {
            return await CartModel.updateCartItem(cartId, productId, quantity);
        } catch (error) {
            console.error("CartService.updateCartItem(): Error:", error.message);
            throw new Error("Failed to update cart item");
        }
    }

    // Remove item from cart
    async removeCartItem(cartId, productId) {
        try {
            return await CartModel.removeCartItem(cartId, productId);
        } catch (error) {
            console.error("CartService.removeCartItem(): Error:", error.message);
            throw new Error("Failed to remove item from cart");
        }
    }

    // Clear the entire cart
    async clearCart(cartId) {
        try {
            await CartModel.clearCart(cartId);
        } catch (error) {
            console.error("CartService.clearCart(): Error:", error.message);
            throw new Error("Failed to clear cart");
        }
    }

    // Create a cart for a user
    async createCart(userId) {
        try {
            return await CartModel.createCart(userId);
        } catch (error) {
            console.error("CartService.createCart(): Error:", error.message);
            throw new Error("Failed to create cart");
        }
    }

    // Get all carts (admin only)
    async getAllCarts() {
        try {
            return await CartModel.getAllCarts();
        } catch (error) {
            console.error("CartService.getAllCarts(): Error:", error.message);
            throw new Error("Failed to retrieve carts");
        }
    }
}

export default new CartService();