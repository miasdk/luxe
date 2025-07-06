
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuthContext } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuthContext();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Get API base URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  
  // Debug log
  useEffect(() => {

  }, []);
  
  // Fetch wishlist when user changes
  useEffect(() => {
    if (user) {
                  fetchWishlist();
            } else {
            setWishlistItems([]);
        }
  }, [user]);
  
  // Fetch user's wishlist
  const fetchWishlist = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/user/${user.uid}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server response (${response.status}):`, errorText);
        throw new Error(`Failed to fetch wishlist: ${response.status}`);
      }
      
      const data = await response.json();
      setWishlistItems(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching wishlist:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Trigger product refresh across the app
  const triggerProductRefresh = () => {
    // Dispatch a custom event that product components can listen to
    window.dispatchEvent(new CustomEvent('productLikesUpdated'));
  };
  
  // Add item to wishlist
  const addToWishlist = async (productId) => {
    if (!user) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.uid, productId }),
      });
      
      if (!response.ok) throw new Error('Failed to add to wishlist');
      
      // Refresh wishlist and trigger product refresh
      await fetchWishlist();
      triggerProductRefresh();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };
  
  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    if (!user) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/user/${user.uid}/product/${productId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove from wishlist');
      
      // Update local state and trigger product refresh
      setWishlistItems(prev => prev.filter(item => item.product_id !== productId));
      triggerProductRefresh();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };
  
  // Other methods
  const isInWishlist = (productId) => wishlistItems.some(item => item.product_id === productId);
  
  const toggleWishlistItem = async (productId) => {
    return isInWishlist(productId) 
      ? await removeFromWishlist(productId)
      : await addToWishlist(productId);
  };
  
  const clearWishlist = async () => {
    if (!user) return false;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/wishlist/user/${user.uid}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to clear wishlist');
      
      setWishlistItems([]);
      triggerProductRefresh();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };
  
  // Context value
  const contextValue = {
    wishlistItems,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlistItem,
    clearWishlist,
    refreshWishlist: fetchWishlist
  };
  
  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};