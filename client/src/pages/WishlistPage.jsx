import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
    Heart, 
    Trash, 
    ShoppingBag, 
    AlertCircle, 
    ArrowRight, 
    Grid3X3,
    List,
    Share2,
    Eye,
    Plus
} from 'lucide-react';

const WishlistPage = () => {
    const { user } = useAuthContext();
    const { wishlistItems, loading, error, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [viewMode, setViewMode] = useState('grid');
    const [selectedItems, setSelectedItems] = useState([]);
    
    // Handle moving item to cart
    const handleMoveToCart = (product) => {
        addToCart(product, 1);
        removeFromWishlist(product.product_id);
    };

    // Handle bulk actions
    const handleSelectItem = (productId) => {
        setSelectedItems(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleBulkAddToCart = () => {
        selectedItems.forEach(productId => {
            const item = wishlistItems.find(item => item.product_id === productId);
            if (item) handleMoveToCart(item);
        });
        setSelectedItems([]);
    };

    const handleBulkRemove = () => {
        selectedItems.forEach(productId => removeFromWishlist(productId));
        setSelectedItems([]);
    };
    
    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart size={28} className="text-gray-400" />
                    </div>
                    <h1 className="text-2xl font-light text-gray-900 mb-3">Sign in to view your wishlist</h1>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Save your favorite items and keep track of products you love.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
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
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-12">
                        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                                <div className="p-6 space-y-3">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
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
                    <h2 className="text-xl font-light text-gray-900 mb-3">Something went wrong</h2>
                    <p className="text-gray-600 mb-8">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-16 max-w-7xl">
                {/* Clean Header */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-3">
                                My Wishlist
                            </h1>
                            <p className="text-lg text-gray-600">
                                {wishlistItems.length === 0 
                                    ? "Your saved items will appear here" 
                                    : `${wishlistItems.length} item${wishlistItems.length === 1 ? '' : 's'} saved`
                                }
                            </p>
                        </div>
                        
                        {/* Minimal Action Bar */}
                        {wishlistItems.length > 0 && (
                            <div className="flex items-center gap-4">
                                {/* View Toggle */}
                                <div className="flex bg-white rounded-md border border-gray-200 p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <Grid3X3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        <List size={16} />
                                    </button>
                                </div>
                                
                                {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors">
                                    <Share2 size={16} />
                                    Share
                                </button> */}
                                
                                <button
                                    onClick={() => clearWishlist()}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 font-medium rounded-md hover:bg-red-50 transition-colors"
                                >
                                    <Trash size={16} />
                                    Clear All
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Clean Bulk Actions */}
                    {selectedItems.length > 0 && (
                        <div className="p-4 bg-white border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700 font-medium">
                                    {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleBulkAddToCart}
                                        className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBulkRemove}
                                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                                    >
                                        Remove
                                    </button>
                                    <button
                                        onClick={() => setSelectedItems([])}
                                        className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-md transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="max-w-lg mx-auto">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <Heart size={32} className="text-gray-400" />
                            </div>
                            
                            <h2 className="text-2xl font-light text-gray-900 mb-4">Your wishlist is empty</h2>
                            <p className="text-gray-600 mb-12 leading-relaxed">
                                Discover exceptional pieces and save your favorites for later.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Explore Collection
                                </Link>
                                
                                <Link
                                    to="/categories"
                                    className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Browse Categories
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Grid View */}
                        {viewMode === 'grid' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {wishlistItems.map((item) => (
                                    <div key={item.product_id} className="group">
                                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                            {/* Image Container */}
                                            <div className="relative">
                                                <Link to={`/products/${item.product_id}`} className="block">
                                                    <div className="aspect-square overflow-hidden bg-gray-50">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.title} 
                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                </Link>
                                                
                                                {/* Selection Checkbox */}
                                                <div className="absolute top-4 left-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(item.product_id)}
                                                        onChange={() => handleSelectItem(item.product_id)}
                                                        className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                                                    />
                                                </div>
                                                
                                                {/* Action Buttons */}
                                                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button
                                                        onClick={() => removeFromWishlist(item.product_id)}
                                                        className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                                                        aria-label="Remove from wishlist"
                                                    >
                                                        <Heart size={14} className="fill-red-500 text-red-500" />
                                                    </button>
                                                    
                                                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                                                        <Share2 size={14} className="text-gray-600" />
                                                    </button>
                                                </div>
                                                
                                                {/* Sale Badge */}
                                                {item.original_price && item.original_price > item.price && (
                                                    <div className="absolute bottom-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                                                        SALE
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="mb-4">
                                                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                        {item.brand_name}
                                                    </p>
                                                    <Link to={`/products/${item.product_id}`} className="block">
                                                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-gray-600 transition-colors leading-tight mb-3">
                                                            {item.title}
                                                        </h3>
                                                    </Link>
                                                    
                                                    <div className="flex items-baseline gap-2 mb-4">
                                                        <p className="text-lg font-medium text-gray-900">${item.price}</p>
                                                        {item.original_price && item.original_price > item.price && (
                                                            <p className="text-sm text-gray-400 line-through">${item.original_price}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <button
                                                    onClick={() => handleMoveToCart(item)}
                                                    className="w-full px-4 py-2 bg-gray-900 text-white font-medium rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                                                >
                                                    <ShoppingBag size={16} />
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* List View */}
                        {viewMode === 'list' && (
                            <div className="space-y-4">
                                {wishlistItems.map((item) => (
                                    <div key={item.product_id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center gap-6">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.product_id)}
                                                onChange={() => handleSelectItem(item.product_id)}
                                                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                                            />
                                            
                                            <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                                    {item.brand_name}
                                                </p>
                                                <h3 className="text-base font-medium text-gray-900 mb-2 truncate">{item.title}</h3>
                                                <div className="flex items-baseline gap-2">
                                                    <p className="text-lg font-medium text-gray-900">${item.price}</p>
                                                    {item.original_price && item.original_price > item.price && (
                                                        <p className="text-sm text-gray-400 line-through">${item.original_price}</p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => handleMoveToCart(item)}
                                                    className="px-4 py-2 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                                                >
                                                    Add to Cart
                                                </button>
                                                
                                                <button
                                                    onClick={() => removeFromWishlist(item.product_id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Simple Continue Shopping */}
                        <div className="mt-16 text-center">
                            <div className="max-w-lg mx-auto">
                                <h3 className="text-xl font-light text-gray-900 mb-4">Continue Exploring</h3>
                                <p className="text-gray-600 mb-8">
                                    Discover more exceptional pieces for your collection.
                                </p>
                                <Link
                                    to="/products"
                                    className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Browse Products
                                    <ArrowRight size={16} className="ml-2" />
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;