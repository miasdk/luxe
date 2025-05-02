import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useAuthContext } from "./AuthContext";
import cartService from "../services/cartService";
import Cart from "../components/Cart";

const CartContext = createContext();

export function useShoppingCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { user } = useAuthContext();
  const [cart, setCart] = useLocalStorage("cart", []);
  const [cartId, setCartId] = useLocalStorage("cartId", null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      
      try {
        const cartData = await cartService.getCartByUserId(user.uid);
        
        if (cartData && cartData.id) {
          setCartId(cartData.id);
          
          if (cartData.products && Array.isArray(cartData.products)) {
            setCart(cartData.products);
          } else {
            console.warn("No products array in cart data");
            setCart([]);
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    try {
      // If no cartId but user is logged in, create a new cart first
      if (!cartId && user) {
        const newCart = await cartService.createCart(user.uid);
        setCartId(newCart.id);
        
        // Now we have a cartId, so we can add the item
        await cartService.addItemToCart({
          cartId: newCart.id,
          productId: product.product_id,
          quantity: 1,
        });
      } else if (cartId) {
        // We have a cartId, so just add the item
        await cartService.addItemToCart({
          cartId,
          productId: product.product_id,
          quantity: 1,
        });
      }
      
      // Update local cart state
      const existingItem = cart.find(item => item.product_id === product.product_id);
      if (existingItem) {
        setCart(prev =>
          prev.map(item =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart(prev => [...prev, { ...product, quantity: 1 }]);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (productId, quantity = 1) => {
    if (!cartId) return;
    
    try {
      await cartService.removeCartItem({
        cartId,
        productId,
        quantity // Make sure this quantity is being passed to the service
      });
      
      // Update local state
      setCart(prev => {
        const existingItem = prev.find(item => item.product_id === productId);
        
        if (!existingItem) return prev;
        
        // If removing specific quantity
        if (quantity < existingItem.quantity) {
          return prev.map(item => 
            item.product_id === productId 
              ? { ...item, quantity: item.quantity - quantity }
              : item
          );
        } 
        // If removing entire item
        else {
          return prev.filter(item => item.product_id !== productId);
        }
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const clearCart = async () => {
    if (!cartId) return;

    try {
      await cartService.clearCart(cartId);
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };


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
      <Cart
        cart={cart}
        isOpen={isOpen}
        toggleCart={toggleCart}
      />
    </CartContext.Provider>
  );
}
