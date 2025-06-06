import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useAuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
    Heart, 
    Trash2, 
    ShoppingCart, 
    AlertCircle, 
    ArrowRight,
    Eye,
    MoreHorizontal,
    Check
} from 'lucide-react';

const WishlistPage = () => {
    const { user } = useAuthContext();
    const { wishlistItems, loading, error, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [selectedItems, setSelectedItems] = useState([]);
    
    const handleMoveToCart = (product) => {
        addToCart(product, 1);
        removeFromWishlist(product.product_id);
    };

    const handleSelectItem = (productId) => {
        setSelectedItems(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSelectAll = () => {
        if (selectedItems.length === wishlistItems.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(wishlistItems.map(item => item.product_id));
        }
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
            <div className="bg-white min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                    <h1 className="text-xl font-medium text-gray-900 mb-2">Sign in to see your saved items</h1>
                    <p className="text-gray-600 mb-6">
                        Save items you're interested in to buy later.
                    </p>
                    <Link
                        to="/login"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 py-6 max-w-4xl">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex gap-4">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="bg-white min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-6 max-w-6xl">
                <div className="mb-6 pb-4 border-b border-gray-200">
                    <h1 className="text-2xl font-normal text-gray-900 mb-1">
                        Saved items
                    </h1>
                    <p className="text-sm text-gray-600">
                        {wishlistItems.length === 0 
                            ? "Items you save will be stored here" 
                            : `${wishlistItems.length} item${wishlistItems.length === 1 ? '' : 's'}`
                        }
                    </p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16">
                        <Heart size={48} className="text-gray-300 mx-auto mb-4" />
                        <h2 className="text-lg font-normal text-gray-900 mb-2">You haven't saved anything yet</h2>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            When you find something you like, select the heart to save it here.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                            Start shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Bulk Actions */}
                        {selectedItems.length > 0 && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-blue-800">
                                        {selectedItems.length} item{selectedItems.length === 1 ? '' : 's'} selected
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={handleBulkAddToCart}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Add to cart
                                        </button>
                                        <button
                                            onClick={handleBulkRemove}
                                            className="text-sm text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                            <label className="flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.length === wishlistItems.length}
                                    onChange={handleSelectAll}
                                    className="mr-2"
                                />
                                Select all
                            </label>
                            <button
                                onClick={() => clearWishlist()}
                                className="text-sm text-gray-600 hover:text-gray-800"
                            >
                                Clear all
                            </button>
                        </div>

                        <div className="space-y-0">
                            {wishlistItems.map((item, index) => (
                                <div key={item.product_id} className={`flex items-start gap-4 py-4 ${index !== wishlistItems.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.product_id)}
                                        onChange={() => handleSelectItem(item.product_id)}
                                        className="mt-1"
                                    />
                                    
                                    <div className="w-20 h-20 bg-gray-50 border border-gray-200 flex-shrink-0">
                                        <Link to={`/products/${item.product_id}`}>
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="w-full h-full object-contain"
                                            />
                                        </Link>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <Link 
                                            to={`/products/${item.product_id}`}
                                            className="text-blue-600 hover:underline font-normal text-sm block mb-1"
                                        >
                                            {item.title}
                                        </Link>
                                        
                                        {item.brand_name && (
                                            <p className="text-gray-600 text-sm mb-1">{item.brand_name}</p>
                                        )}
                                        
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-lg text-gray-900">
                                                ${item.price}
                                            </span>
                                            {item.original_price && item.original_price > item.price && (
                                                <span className="text-gray-500 line-through text-sm">
                                                    ${item.original_price}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            {item.conditions && (
                                                <span>Condition: {item.conditions}</span>
                                            )}
                                            {item.sizes && (
                                                <span>Size: {item.sizes}</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleMoveToCart(item)}
                                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                        >
                                            Add to cart
                                        </button>
                                        
                                        <button
                                            onClick={() => removeFromWishlist(item.product_id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            title="Remove"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;