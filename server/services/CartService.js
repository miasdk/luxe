import CartModel from "../models/CartModel.js";

class CartService {
    async getCartByUserId(userId) {
        try {
            return await CartModel.getCartByUserId(userId);
        } catch (error) {
            console.error("CartService.getCartByUserId(): Error:", error.message);
            throw new Error("Failed to retrieve cart");
        }
    }

    async getCartDetails(cartId) {
        try {
            return await CartModel.getCartDetails(cartId);
        } catch (error) {
            console.error("CartService.getCartDetails(): Error:", error.message);
            throw new Error("Failed to retrieve cart details");
        }
    }

    async addItemToCart(cartId, productId, quantity) {
        try {
            return await CartModel.addItemToCart(cartId, productId, quantity);
        } catch (error) {
            console.error("CartService.addItemToCart(): Error:", error.message);
            throw new Error("Failed to add item to cart");
        }
    }

    async removeCartItem(cartId, productId, quantity = 1) {
        try {
            // Make sure quantity is passed to the model
            return await CartModel.removeCartItem(cartId, productId, quantity);
        } catch (error) {
            console.error("CartService.removeCartItem(): Error:", error.message);
            throw new Error("Failed to remove item from cart");
        }
    }

    async clearCart(cartId) {
        try {
            await CartModel.clearCart(cartId);
        } catch (error) {
            console.error("CartService.clearCart(): Error:", error.message);
            throw new Error("Failed to clear cart");
        }
    }

    async createCart(userId) {
        try {
            return await CartModel.createCart(userId);
        } catch (error) {
            console.error("CartService.createCart(): Error:", error.message);
            throw new Error("Failed to create cart");
        }
    }

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
