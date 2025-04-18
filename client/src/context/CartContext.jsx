import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import cartService from "../services/cartService";
import { useAuthContext } from "./AuthContext";


const CartContext = createContext();

export function useShoppingCart() { 
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const { user } = useAuthContext();
    const [cart, setCart] = useLocalStorage("cart", []);
    const [cartId, setCartId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    //Fetch cart from server if user is logged in
    useEffect(() => {
        const fetchCart = async () => {
            if (!user) return;
            try { 
                const cartData = await cartService.getCartByUserId(user.uid);
                setCart(cartData.products || []);
                setCartId(cartData.id);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();
    }, [user]);

    const addToCart = async (product) => {  
        if (!cartId) return; 

        const existingItem = cart.find(item => item.id === product.id);
        const quantity = existingItem ? existingItem.quantity + 1 : 1
        
        try {
            await cartService.addItemToCart({
                cartId,
                productId: product.id,
                quantity: 1,
            });

            if (existingItem) {
                setCart(prev =>
                    prev.map(item => 
                        item.product_id === product.id 
                        ? {...item, quantity: item.quantity + 1}
                        : item
                    )
                );
            } else {
                setCart(prev => [...prev, {...product, product_id: product.id, quantity}]); 
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    }

    const removeFromCart = async (productId) => {
        if (!cartId) return;

        try {
            await cartService.removeCartItem({
                cartId,
                productId,
            });

            setCart(prev => prev.filter(item => item.product_id !== productId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    }

    const clearCart = async () => {
        if (!cartId) return;

        try {
            await cartService.clearCart(cartId);
            setCart([]);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }

    const toggleCart = () => {
        setIsOpen(prev => !prev);
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
                cartId,
            }}
        >
            {children}
        </CartContext.Provider>
    )


}