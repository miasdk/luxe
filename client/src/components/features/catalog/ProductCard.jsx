import React from "react";
import { useCart } from '../../../context/CartContext';
import { Link } from "react-router-dom";
import WishlistButton from '../wishlist/WishlistButton';
import PriceDisplay from '../../common/ui/PriceDisplay';

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart(); 
  const isInCart = cart && cart.find(item => item.product_id === product.product_id);
  const quantity = isInCart ? isInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.product_id);
  };

  return (
    <article className="group h-full flex flex-col overflow-hidden relative hover:border-gray-200 transition-all">
      
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton
          productId={product.product_id}
          size={18}
          likeCount={product.num_likes}
          showLikeCount={true}
        />
      </div>

      <div className="relative flex-shrink-0">
        <Link to={`/products/${product.product_id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full bg-gray-100 h-48 object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <Link to={`/products/${product.product_id}`} className="text-gray-900 hover:text-gray-700 flex-1 min-w-0">
            <h2 className="text-lg font-semibold hover:underline truncate">{product.title}</h2>
          </Link>
          <span className="text-sm text-gray-500 truncate ml-2">{product.brand_name}</span>
        </div>

        <span className="text-sm text-gray-500 truncate block mb-2">
          {product.conditions && product.conditions.length > 0 
            ? product.conditions.join(', ') 
            : 'Good condition'} | Sz. {product.sizes && product.sizes.length > 0 
            ? product.sizes.join(', ') 
            : 'Various'}
        </span>
        
        <div className="mb-2">
          <PriceDisplay 
            price={product.price}
            originalPrice={product.original_price}
            size="medium"
          />
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2 mb-4 flex-grow">{product.description}</p>

        {quantity > 0 ? (
          <div className="flex flex-col items-center gap-2 mt-auto">
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border border-gray-300 hover:bg-gray-100 text-sm"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
              <span className="text-sm font-semibold">{quantity} in cart</span>
              <button
                className="px-3 py-1 border border-gray-300 hover:bg-gray-100 text-sm"
                onClick={handleAddToCart}
              >
                +
              </button>
            </div>
            <button
              className="border border-red-500 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-white text-sm transition-colors"
              onClick={handleRemoveFromCart}
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            className="w-full px-4 py-2 border border-gray-500 hover:bg-gray-800 hover:text-white transition-colors font-medium mt-auto"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;