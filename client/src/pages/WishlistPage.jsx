import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Heart, Trash, ShoppingBag, AlertCircle } from 'lucide-react';

const WishlistPage = () => {
    const { user } = useAuthContext();
    const { wishlistItems, loading, error, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    
    // Handle moving item to cart
    const handleMoveToCart = (product) => {
        addToCart(product, 1);
        removeFromWishlist(product.product_id);
    };
    
    if (!user) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="max-w-md mx-auto p-8 bg-gray-50 rounded-xl">
                    <h1 className="text-2xl font-medium text-gray-900 mb-4">Please Sign In</h1>
                    <p className="text-gray-600 mb-6">You need to be logged in to view your wishlist.</p>
                    <Link
                        to="/login"
                        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-2xl font-medium text-gray-900 mb-8">My Wishlist</h1>
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-4 h-80"></div>
                    ))}
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="flex items-center gap-2 text-red-600 mb-4">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-gray-900 text-white rounded-md"
                >
                    Try Again
                </button>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-medium text-gray-900">My Wishlist</h1>
                {wishlistItems.length > 0 && (
                    <button
                        onClick={() => clearWishlist()}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    >
                        <Trash size={16} />
                        Clear All
                    </button>
                )}
            </div>
            
            {wishlistItems.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-600 mb-6">Add items to your wishlist to save them for later.</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item.product_id} className="bg-white rounded-lg overflow-hidden  hover:shadow-md transition-shadow">
                            <Link to={`/products/${item.product_id}`} className="block">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </Link>
                            
                            <div className="p-4">
                                <div className="flex justify-between items-start">
                                    <Link to={`/products/${item.product_id}`} className="block">
                                        <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600">{item.title}</h3>
                                    </Link>
                                    <button
                                        onClick={() => removeFromWishlist(item.product_id)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Remove from wishlist"
                                    >
                                        <Heart size={18} className="fill-red-500" />
                                    </button>
                                </div>
                                
                                <p className="text-xs text-gray-500 mt-1">{item.brand_name}</p>
                                <p className="text-sm font-medium text-gray-900 mt-2">${item.price}</p>
                                
                                <button
                                    onClick={() => handleMoveToCart(item)}
                                    className="w-full mt-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-md flex items-center justify-center hover:bg-gray-800 transition-colors"
                                >
                                    <ShoppingBag size={14} className="mr-1" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;