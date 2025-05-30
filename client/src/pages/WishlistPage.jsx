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
    MoreHorizontal
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
                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
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
                <div className="container mx-auto px-4 py-6 max-w-6xl">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
                        <div className="space-y-4">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="border border-gray-200 rounded p-4">
                                    <div className="flex gap-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded"></div>
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
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
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
                <div className="mb-6">
                    <h1 className="text-2xl font-medium text-gray-900 mb-1">
                        Saved items
                    </h1>
                    <p className="text-gray-600">
                        {wishlistItems.length === 0 
                            ? "Items you save will be stored here" 
                            : `${wishlistItems.length} item${wishlistItems.length === 1 ? '' : 's'}`
                        }
                    </p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-16">
                        <Heart size={64} className="text-gray-300 mx-auto mb-6" />
                        <h2 className="text-xl font-medium text-gray-900 mb-2">You haven't saved anything yet</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            When you find something you like, select the heart icon to save it here.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                            Start shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === wishlistItems.length}
                                        onChange={handleSelectAll}
                                        className="mr-2"
                                    />
                                    Select all ({wishlistItems.length})
                                </label>
                                
                                {selectedItems.length > 0 && (
                                    <span className="text-sm text-gray-600">
                                        {selectedItems.length} selected
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {selectedItems.length > 0 && (
                                    <>
                                        <button
                                            onClick={handleBulkAddToCart}
                                            className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                        >
                                            Add to cart ({selectedItems.length})
                                        </button>
                                        <button
                                            onClick={handleBulkRemove}
                                            className="px-4 py-1 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </>
                                )}
                                
                                <button
                                    onClick={() => clearWishlist()}
                                    className="px-4 py-1 text-gray-600 text-sm hover:text-gray-800 transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {wishlistItems.map((item) => (
                                <div key={item.product_id} className="rounded hover:shadow-sm transition-shadow">
                                    <div className="p-4 flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.includes(item.product_id)}
                                            onChange={() => handleSelectItem(item.product_id)}
                                            className="mt-1"
                                        />
                                        
                                        <div className="w-20 h-20 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                                            <Link to={`/products/${item.product_id}`}>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title} 
                                                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                                                />
                                            </Link>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <Link 
                                                to={`/products/${item.product_id}`}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm leading-tight block mb-1"
                                            >
                                                {item.title}
                                            </Link>
                                            
                                            {item.brand_name && (
                                                <p className="text-gray-600 text-sm mb-1">by {item.brand_name}</p>
                                            )}
                                            
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-lg text-gray-900">
                                                    ${item.price}
                                                </span>
                                                {item.original_price && item.original_price > item.price && (
                                                    <span className="text-gray-500 line-through text-sm">
                                                        ${item.original_price}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {item.conditions && (
                                                <p className="text-gray-600 text-sm mb-2">
                                                    Condition: {item.conditions}
                                                </p>
                                            )}
                                            
                                            {item.sizes && (
                                                <p className="text-gray-600 text-sm">
                                                    Size: {item.sizes}
                                                </p>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleMoveToCart(item)}
                                                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                                            >
                                                <ShoppingCart size={14} />
                                                Add to cart
                                            </button>
                                            
                                            <div className="relative">
                                                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                            
                                            <button
                                                onClick={() => removeFromWishlist(item.product_id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Remove from saved items"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 p-6 bg-gray-50 rounded text-center">
                            <h3 className="font-medium text-gray-900 mb-2">Keep exploring</h3>
                            <p className="text-gray-600 mb-4">Find more items you'll love</p>
                            <Link
                                to="/products"
                                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                            >
                                Continue shopping
                                <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;