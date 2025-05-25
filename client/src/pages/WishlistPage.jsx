import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Heart, Trash, ShoppingBag, AlertCircle, ArrowRight } from 'lucide-react';

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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart size={28} className="text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Sign in to view your wishlist</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Save your favorite items and keep track of products you love.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                    >
                        Sign In
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4 py-8 lg:py-12">
                    <div className="mb-8">
                        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle size={28} className="text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">Something went wrong</h2>
                    <p className="text-gray-600 mb-8">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8 lg:py-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">My Wishlist</h1>
                        <p className="text-gray-600">
                            {wishlistItems.length === 0 
                                ? "No saved items yet" 
                                : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} saved`
                            }
                        </p>
                    </div>
                    {wishlistItems.length > 0 && (
                        <button
                            onClick={() => clearWishlist()}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                        >
                            <Trash size={16} />
                            Clear All
                        </button>
                    )}
                </div>
                
                {wishlistItems.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm p-12 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={36} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                            Discover amazing products and save your favorites for later. Start exploring now!
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-8 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                        >
                            Browse Products
                            <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <div key={item.product_id} className="group backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                                {/* Image Container */}
                                <div className="relative">
                                    <Link to={`/products/${item.product_id}`} className="block">
                                        <div className="aspect-square overflow-hidden bg-white/50">
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </Link>
                                    
                                    {/* Remove from wishlist button */}
                                    <button
                                        onClick={() => removeFromWishlist(item.product_id)}
                                        className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200"
                                        aria-label="Remove from wishlist"
                                    >
                                        <Heart size={16} className="fill-red-500 text-red-500" />
                                    </button>
                                </div>
                                
                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex-1">
                                        <p className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                                            {item.brand_name}
                                        </p>
                                        <Link to={`/products/${item.product_id}`} className="block mb-3">
                                            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors leading-tight">
                                                {item.title}
                                            </h3>
                                        </Link>
                                        
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-lg font-bold text-gray-900">${item.price}</p>
                                            {item.original_price && item.original_price > item.price && (
                                                <p className="text-sm text-gray-500 line-through">${item.original_price}</p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Button stays at bottom */}
                                    <button
                                        onClick={() => handleMoveToCart(item)}
                                        className="w-full px-4 py-3 bg-black text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 mt-auto"
                                    >
                                        <ShoppingBag size={16} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Continue Shopping CTA */}
                {wishlistItems.length > 0 && (
                    <div className="mt-12 text-center">
                        <Link
                            to="/products"
                            className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                        >
                            Continue Shopping
                            <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;