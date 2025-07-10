import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../../context/WishlistContext';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ 
    productId, 
    className = '', 
    size = 20, 
    showText = false,
    likeCount = null,
    showLikeCount = false 
}) => {
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
        <div className="flex flex-col items-center">
            <button
                onClick={handleToggleWishlist}
                className={`${className} ${
                    inWishlist
                        ? 'text-red-500 hover:text-red-700'
                        : 'text-gray-400 hover:text-red-500'
                } transition-colors focus:outline-none p-1 rounded-full hover:bg-white/80`}
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart 
                    size={size} 
                    className={inWishlist ? 'fill-red-500' : ''} 
                />
            </button>
            
            {/* Like Count Display - Vertically Stacked */}
            {showLikeCount && likeCount > 0 && (
                <span className="text-xs text-gray-600 font-medium mt-1 bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm">
                    {likeCount}
                </span>
            )}
            
            {/* Optional Text Display */}
            {showText && (
                <span className="text-xs mt-1 font-medium">
                    {inWishlist ? 'Saved' : 'Save'}
                </span>
            )}
        </div>
    );
};

export default WishlistButton;