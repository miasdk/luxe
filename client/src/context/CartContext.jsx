import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext();

export function useShoppingCart() { 
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cart, setCart] = useLocalStorage("cart", []);
    const [isOpen, setIsOpen] = useState(false);

    const addToCart = (product) => {
        setCart((prev) => {
            const isItemInCart = prev.find((item) => item.id === product.id);
            if (isItemInCart) {
                return prev.map((item) => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        }) 
    }

    const removeFromCart = (id) => {
        setCart((prev) => {
            const product = prev.find((item) => item.id === id);

            if (product.quantity > 1) {
                return prev.map((item) => 
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            }

            return prev.filter((item) => item.id !== id);
        })
    }
    
    const clearCart = () => {
        setCart([]);
    }
    
    const toggleCart = () => {
        setIsOpen((prev) => !prev);
    }

    return ( 
        <CartContext.Provider 
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                toggleCart,
                isOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    )


}