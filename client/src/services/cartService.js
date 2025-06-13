const API_BASE_URL = import.meta.env.VITE_API_URL;

// Maximum number of retries for failed requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to handle retries
const withRetry = async (operation, retries = MAX_RETRIES) => {
    let lastError;
    
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;
            if (i < retries - 1) {
                await delay(RETRY_DELAY * Math.pow(2, i)); // Exponential backoff
            }
        }
    }
    
    throw lastError;
};

const cartService = {
    // Get cart by user ID
    getCartByUserId: async (userId) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/cart/user/${userId}`)
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error getting cart:', error);
            throw new Error('Failed to get cart');
        }
    },

    // Create new cart
    createCart: async (userId) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/cart/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId })
                })
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error creating cart:', error);
            throw new Error('Failed to create cart');
        }
    },

    // Add item to cart
    addItemToCart: async ({ cartId, productId, quantity }) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/cart/add-item`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartId, productId, quantity })
                })
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw new Error('Failed to add item to cart');
        }
    },

    // Remove item from cart
    removeCartItem: async ({ cartId, productId, quantity }) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/cart/remove-item`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartId, productId, quantity })
                })
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.status === 204 ? { success: true } : res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw new Error('Failed to remove item from cart');
        }
    },

    // Update cart item quantity
    updateCartItem: async ({ cartId, productId, quantity }) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/cart/update-item`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartId, productId, quantity })
                })
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error updating cart item:', error);
            throw new Error('Failed to update cart item');
        }
    },

    // Clear entire cart
    clearCart: async (cartId) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/cart/clear`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartId })
                })
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw new Error('Failed to clear cart');
        }
    },

    // Get cart totals
    getCartTotals: async (cartId) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/cart/${cartId}/totals`)
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error getting cart totals:', error);
            throw new Error('Failed to get cart totals');
        }
    },

    // Check product availability
    checkProductAvailability: async (productId, quantity) => {
        try {
            const response = await withRetry(() => 
                fetch(`${API_BASE_URL}/api/products/${productId}/availability`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity })
                })
                    .then(res => {
                        if (!res.ok) throw new Error("HTTP error: " + res.status);
                        return res.json();
                    })
            );
            return response;
        } catch (error) {
            console.error('Error checking product availability:', error);
            throw new Error('Failed to check product availability');
        }
    }
};

export default cartService;
