import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from "./ProductCard";
import { useProductContext } from "../context/ProductContext";
import { useWishlist } from "../context/WishlistContext";
import { FaThList, FaThLarge, FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductGrid = () => {
    const { products, loading, error } = useProductContext();
    const { 
        wishlistItems,   
        addToWishlist, 
        removeFromWishlist,
        isInWishlist,
        toggleWishlistItem  
    } = useWishlist();
    const [viewMode, setViewMode] = useState('grid');

    // Log for debugging
    console.log("Current wishlist items:", wishlistItems);

    if (loading) {
        return (
            <div className="w-full flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full text-center py-10">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p className="font-bold">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="w-full text-center py-10">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-8 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">No products found</h3>
                    <p className="text-sm">Try adjusting your filters to see more results.</p>
                </div>
            </div>
        );
    }

    const getProperty = (obj, path, defaultValue = '') => {
        return path.split('.').reduce((o, p) => (o && o[p] !== undefined ? o[p] : defaultValue), obj);
    };

    const handleWishlistToggle = (productId) => {
        if (productId) {
            toggleWishlistItem(productId);
        }
    };

    return (
        <div>
            {/* View Toggle */}
            <div className="flex justify-end mb-4">
                <div className="bg-white border border-gray-200 rounded-md flex overflow-hidden">
                    <button 
                        onClick={() => setViewMode('grid')} 
                        className={`px-3 py-2 flex items-center text-sm ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        aria-label="Grid view"
                    >
                        <FaThLarge className="mr-1" /> Grid
                    </button>
                    <button 
                        onClick={() => setViewMode('list')} 
                        className={`px-3 py-2 flex items-center text-sm ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        aria-label="List view"
                    >
                        <FaThList className="mr-1" /> List
                    </button>
                </div>
            </div>

            {viewMode === 'grid' ? (
                // Grid View
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.product_id}
                            product={product}
                            className="h-full"
                        />
                    ))}
                </div>
            ) : (
                // List View
                <div className="bg-white rounded-md">
                    {products.map((product, index) => {
                        // Safely extract properties
                        const productId = getProperty(product, 'product_id');
                        const title = getProperty(product, 'title');
                        const imageUrl = getProperty(product, 'image');
                        const price = parseFloat(getProperty(product, 'price', 0));
                        const category = getProperty(product, 'category_name');
                        const brand = getProperty(product, 'brand_name');
                        const description = getProperty(product, 'description');
                        
                        // Handle conditions array (if it exists)
                        const conditions = getProperty(product, 'conditions', []);
                        const firstCondition = Array.isArray(conditions) ? conditions[0] : conditions;
                        
                        // Check if product is in wishlist
                        const inWishlist = isInWishlist(productId);
                        
                        return (
                            <div 
                                key={productId} 
                                className={`flex p-4 ${index !== products.length - 1 ? 'border-b border-gray-200' : ''}`}
                            >
                                <div className="w-32 h-32 flex-shrink-0">
                                    <Link to={`/products/${productId}`}>
                                        <img 
                                            src={imageUrl} 
                                            alt={title} 
                                            className="w-full h-full object-contain"
                                        />
                                    </Link>
                                </div>
                                
                                <div className="ml-4 flex-grow">
                                    <div className="flex justify-between">
                                        <Link 
                                            to={`/products/${productId}`}
                                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                        >
                                            {title}
                                        </Link>
                                        
                                        <button 
                                            onClick={() => handleWishlistToggle(productId)} 
                                            className={`transition-colors ${inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                                        >
                                            {inWishlist ? <FaHeart /> : <FaRegHeart />}
                                        </button>
                                    </div>
                                    
                                    {(category || brand) && (
                                        <div className="flex items-center mt-1">
                                            {category && (
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                                                    {category}
                                                </span>
                                            )}
                                            {brand && (
                                                <span className="text-gray-600 text-xs">
                                                    {brand}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    
                                    {description && (
                                        <div className="mt-2 text-sm text-gray-600 overflow-hidden line-clamp-2 max-h-10">
                                            {description}
                                        </div>
                                    )}
                                    
                                    <div className="mt-2 flex items-center justify-between">
                                        <div>
                                            <span className="text-lg font-bold">${price.toFixed(2)}</span>
                                            {firstCondition && (
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {firstCondition}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <Link 
                                            to={`/products/${productId}`}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;