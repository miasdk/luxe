// context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const navigate = useNavigate();
    
    // Calculate total whenever cart changes
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
    }, [cartItems]);
    
    // Load cart from localStorage on initial load
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);
    
    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    
    // Add item to cart
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.product_id === product.product_id);
            
            if (existingItemIndex >= 0) {
                // Item exists, update quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + quantity
                };
                return updatedItems;
            } else {
                // Item doesn't exist, add new
                return [...prevItems, { ...product, quantity }];
            }
        });
    };
    
    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
    };
    
    // Update item quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.product_id === productId ? { ...item, quantity } : item
            )
        );
    };
    
    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };
    
    // Proceed to checkout
    const proceedToCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        navigate('/checkout');
    };
    
    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            proceedToCheckout
        }}>
            {children}
        </CartContext.Provider>
    );
};