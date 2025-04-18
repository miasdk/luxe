const API_BASE_URL = import.meta.env.VITE_API_URL;

class CartService {
    async getCartByUserId(userId) {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/user/${userId}`);
            if (!res.ok) throw new Error("HTTP error: " + res.status);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("CartService - getCartByUserId error:", error.message);
            throw error;
        }
    }

    async addItemToCart({ cartId, productId, quantity }) {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartId, productId, quantity }),
            });
            if (!res.ok) throw new Error("HTTP error: " + res.status);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("CartService - addItemToCart error:", error.message);
            throw error;
        }
    }

    async updateCartItem({ cartId, productId, quantity }) {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartId, productId, quantity }),
            });
            if (!res.ok) throw new Error("HTTP error: " + res.status);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("CartService - updateCartItem error:", error.message);
            throw error;
        }
    }

    async removeCartItem({ cartId, productId }) {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/remove`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartId, productId }),
            });
            if (!res.ok) throw new Error("HTTP error: " + res.status);
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("CartService - removeCartItem error:", error.message);
            throw error;
        }
    }

    async clearCart(cartId) {
        try {
            const res = await fetch(`${API_BASE_URL}/api/cart/clear`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartId }),
            });
            if (!res.ok) throw new Error("HTTP error: " + res.status);
            return res;
        } catch (error) {
            console.error("CartService - clearCart error:", error.message);
            throw error;
        }
    }
}

const cartService = new CartService();
export default cartService;
