// context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import cartService from '../services/cartService';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Load cart when user changes
    useEffect(() => {
        if (user?.uid) {
            loadUserCart();
        } else {
            // Clear cart when user logs out
            setCart([]);
            setCartId(null);
        }
    }, [user]);

    // Load user's cart from backend
    const loadUserCart = async () => {
        if (!user?.uid) return;
        
        setLoading(true);
        try {
            const cartData = await cartService.getCartByUserId(user.uid);
            setCartId(cartData.id);
            setCart(cartData.products || []);
        } catch (error) {
            console.error('Error loading cart:', error);
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart
    const addToCart = async (product, quantity = 1) => {
        if (!user?.uid || !cartId) {
            console.error('User not logged in or cart not initialized');
            return;
        }

        try {
            await cartService.addItemToCart({
                cartId,
                productId: product.product_id || product.id,
                quantity
            });
            
            // Reload cart to get updated data
            await loadUserCart();
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId, quantity = 1) => {
        if (!cartId) {
            console.error('Cart not initialized');
            return;
        }

        try {
            await cartService.removeCartItem({
                cartId,
                productId,
                quantity
            });
            
            // Reload cart to get updated data
            await loadUserCart();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    // Update item quantity (if you need this function)
    const updateQuantity = async (productId, newQuantity) => {
        if (!cartId) {
            console.error('Cart not initialized');
            return;
        }

        if (newQuantity <= 0) {
            // Find the item and remove all of it
            const item = cart.find(item => item.product_id === productId);
            if (item) {
                await removeFromCart(productId, item.quantity);
            }
            return;
        }

        try {
            await cartService.updateCartItem({
                cartId,
                productId,
                quantity: newQuantity
            });
            
            // Reload cart to get updated data
            await loadUserCart();
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        if (!cartId) {
            console.error('Cart not initialized');
            return;
        }

        try {
            await cartService.clearCart(cartId);
            setCart([]);
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    // Toggle cart visibility
    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    // Close cart
    const closeCart = () => {
        setIsOpen(false);
    };

    // Open cart
    const openCart = () => {
        setIsOpen(true);
    };

    // Calculate totals
    const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
    const subtotal = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

    const value = {
        cart,
        cartId,
        isOpen,
        loading,
        totalItems,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        loadUserCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};