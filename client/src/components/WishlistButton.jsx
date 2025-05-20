import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ productId, className = '', size = 20, showText = false }) => {
    const { isInWishlist, toggleWishlistItem } = useWishlist();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    
    const inWishlist = isInWishlist(productId);
    
    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!user) {
            // Redirect to login if not authenticated
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }
        
        toggleWishlistItem(productId);
    };
    
    return (
        <button
            onClick={handleToggleWishlist}
            className={`${className} ${
                inWishlist
                    ? 'text-red-500 hover:text-red-700'
                    : 'text-gray-400 hover:text-red-500'
            } transition-colors focus:outline-none`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
            <Heart 
                size={size} 
                className={inWishlist ? 'fill-red-500' : ''} 
            />
            {showText && (
                <span className="ml-1 text-sm">
                    {inWishlist ? 'Saved' : 'Save'}
                </span>
            )}
        </button>
    );
};

export default WishlistButton;