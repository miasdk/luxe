// context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuthContext } from './AuthContext';
import cartService from '../services/cartService';

const CartContext = createContext();

// Local storage key for cart backup
const CART_STORAGE_KEY = 'ecart_cart_backup';

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
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCart(parsedCart);
            } catch (e) {
                console.error('Error parsing saved cart:', e);
                localStorage.removeItem(CART_STORAGE_KEY);
            }
        }
    }, []);

    // Save cart to local storage when it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } else {
            localStorage.removeItem(CART_STORAGE_KEY);
        }
    }, [cart]);

    // Sync cart between tabs
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === CART_STORAGE_KEY) {
                try {
                    const newCart = JSON.parse(e.newValue || '[]');
                    setCart(newCart);
                } catch (e) {
                    console.error('Error parsing cart from storage:', e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Load cart when user changes
    useEffect(() => {
        if (user?.uid) {
            initializeCart();
        } else {
            // Clear cart when user logs out
            setCart([]);
            setCartId(null);
            localStorage.removeItem(CART_STORAGE_KEY);
        }
    }, [user]);

    // Initialize cart for new user or load existing cart
    const initializeCart = async () => {
        if (!user?.uid) return;
        
        setLoading(true);
        setError(null);
        try {
            // First try to get existing cart
            const cartData = await cartService.getCartByUserId(user.uid);
            
            if (!cartData || !cartData.id) {
                // If no cart exists, create a new one
                const newCart = await cartService.createCart(user.uid);
                setCartId(newCart.id);
                setCart([]);
            } else {
                setCartId(cartData.id);
                setCart(cartData.products || []);
            }
        } catch (error) {
            console.error('Error initializing cart:', error);
            setError('Failed to load cart. Please try again.');
            // If there's an error getting the cart, try to create a new one
            try {
                const newCart = await cartService.createCart(user.uid);
                setCartId(newCart.id);
                setCart([]);
            } catch (createError) {
                console.error('Error creating new cart:', createError);
                setError('Failed to create cart. Please try again later.');
                setCart([]);
                setCartId(null);
            }
        } finally {
            setLoading(false);
        }
    };

    // Add item to cart with optimistic update
    const addToCart = async (product, quantity = 1) => {
        if (!user?.uid) {
            setError('Please log in to add items to cart');
            return;
        }

        if (!cartId) {
            await initializeCart();
        }

        // Optimistic update
        const optimisticCart = [...cart];
        const existingItemIndex = optimisticCart.findIndex(
            item => item.product_id === (product.product_id || product.id)
        );

        if (existingItemIndex > -1) {
            optimisticCart[existingItemIndex].quantity += quantity;
        } else {
            optimisticCart.push({
                ...product,
                quantity,
                product_id: product.product_id || product.id
            });
        }

        setCart(optimisticCart);

        try {
            await cartService.addItemToCart({
                cartId,
                productId: product.product_id || product.id,
                quantity
            });
            
            // Reload cart without showing loading state
            await loadUserCart(false);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            setError('Failed to add item to cart. Please try again.');
            // Revert optimistic update
            setCart(cart);
        }
    };

    // Remove item from cart with optimistic update
    const removeFromCart = async (productId, quantity = 1) => {
        if (!cartId) {
            setError('Cart not initialized');
            return;
        }

        // Optimistic update
        const optimisticCart = cart.filter(item => item.product_id !== productId);
        setCart(optimisticCart);

        try {
            await cartService.removeCartItem({
                cartId,
                productId,
                quantity
            });
            
            // Reload cart without showing loading state
            await loadUserCart(false);
        } catch (error) {
            console.error('Error removing item from cart:', error);
            setError('Failed to remove item from cart. Please try again.');
            // Revert optimistic update
            setCart(cart);
        }
    };

    // Update item quantity with optimistic update
    const updateQuantity = async (productId, newQuantity) => {
        if (!cartId) {
            setError('Cart not initialized');
            return;
        }

        if (newQuantity <= 0) {
            await removeFromCart(productId);
            return;
        }

        // Optimistic update
        const optimisticCart = cart.map(item => 
            item.product_id === productId 
                ? { ...item, quantity: newQuantity }
                : item
        );
        setCart(optimisticCart);

        try {
            await cartService.updateCartItem({
                cartId,
                productId,
                quantity: newQuantity
            });
            
            // Reload cart without showing loading state
            await loadUserCart(false);
        } catch (error) {
            console.error('Error updating item quantity:', error);
            setError('Failed to update quantity. Please try again.');
            // Revert optimistic update
            setCart(cart);
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        if (!cartId) {
            setError('Cart not initialized');
            return;
        }

        // Optimistic update
        setCart([]);

        try {
            await cartService.clearCart(cartId);
        } catch (error) {
            console.error('Error clearing cart:', error);
            setError('Failed to clear cart. Please try again.');
            // Revert optimistic update
            await loadUserCart(false);
        }
    };

    // Load user's cart from backend
    const loadUserCart = async (showLoading = true) => {
        if (!user?.uid) return;
        
        if (showLoading) setLoading(true);
        setError(null);
        try {
            const cartData = await cartService.getCartByUserId(user.uid);
            if (cartData && cartData.id) {
                setCartId(cartData.id);
                setCart(cartData.products || []);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            setError('Failed to load cart. Please try again.');
            setCart([]);
        } finally {
            if (showLoading) setLoading(false);
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
    const subtotal = cart.reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0);

    const value = {
        cart,
        cartId,
        isOpen,
        loading,
        error,
        totalItems,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        openCart,
        loadUserCart,
        initializeCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};