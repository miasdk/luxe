// ProductGrid.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useProductContext } from '../../../context/ProductContext';
import { useWishlist } from '../../../context/WishlistContext';
import { Heart, ShoppingBag, AlertCircle, Package } from 'lucide-react';

const ProductGrid = ({ viewMode }) => {
  const { products, loading, error } = useProductContext();
  const { 
    wishlistItems,   
    addToWishlist, 
    removeFromWishlist,
    isInWishlist,
    toggleWishlistItem  
  } = useWishlist();

  if (loading) {
    return (
      <div className="rounded-2xl p-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package size={28} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Reset Filters
        </button>
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
      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden">
          {products.map((product, index) => {
            const productId = getProperty(product, 'product_id');
            const title = getProperty(product, 'title');
            const imageUrl = getProperty(product, 'image');
            const price = parseFloat(getProperty(product, 'price', 0));
            const category = getProperty(product, 'category_name');
            const brand = getProperty(product, 'brand_name');
            const description = getProperty(product, 'description');
            const sizes = getProperty(product, 'sizes');
            
            const conditions = getProperty(product, 'conditions', []);
            const firstCondition = Array.isArray(conditions) ? conditions[0] : conditions;
            
            const inWishlist = isInWishlist(productId);
            
            return (
              <div 
                key={productId} 
                className={`flex items-center p-6 hover:bg-gray-50 transition-colors ${
                  index !== products.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                  <Link to={`/products/${productId}`}>
                    <img 
                      src={imageUrl} 
                      alt={title} 
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                </div>
                
                <div className="ml-6 flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/products/${productId}`}
                        className="text-lg font-semibold text-gray-900 hover:text-gray-700 hover:underline transition-colors block"
                      >
                        <h3 className="truncate">{title}</h3>
                      </Link>
                      
                      <div className="flex items-center gap-3 mt-2 mb-2">
                        {brand && (
                          <span className="text-sm text-gray-600 font-medium">{brand}</span>
                        )}
                        {category && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {category}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        {firstCondition && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {firstCondition}
                          </span>
                        )}
                        {sizes && (
                          <span className="text-xs text-gray-500">Size: {sizes}</span>
                        )}
                      </div>
                      
                      {description && (
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 ml-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleWishlistToggle(productId)} 
                          className={`p-2 rounded-lg transition-colors ${
                            inWishlist 
                              ? 'text-red-500 hover:bg-red-50' 
                              : 'text-gray-400 hover:text-red-500 hover:bg-gray-50'
                          }`}
                          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
                        </button>
                        
                        <Link 
                          to={`/products/${productId}`}
                          className="flex items-center gap-2 border border-gray-500 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition-colors text-sm font-medium"
                        >
                          <ShoppingBag size={14} />
                          View Details
                        </Link>
                      </div>
                    </div>
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