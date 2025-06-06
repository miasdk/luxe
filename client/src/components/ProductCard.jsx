import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import WishlistButton from "./WishlistButton";

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cart } = useCart(); 
  const isInCart = cart && cart.find(item => item.product_id === product.product_id); // Changed: cartItems -> cart
  const quantity = isInCart ? isInCart.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.product_id);
  };

  return (
    <article className="bg-white group h-full overflow-hidden relative rounded-lg">
      <div className="absolute top-2 right-2 z-10 p-2">
        <WishlistButton
          productId={product.product_id}
          size={18}
        />
      </div>

      <div className="relative">
        <Link to={`/products/${product.product_id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full bg-gray-100 h-48 object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link to={`/products/${product.product_id}`} className="text-gray-900 hover:text-gray-700">
            <h2 className="text-lg font-semibold hover:underline truncate">{product.title}</h2>
          </Link>
          <span className="text-sm text-gray-500 truncate">{product.brand_name}</span>
        </div>

        <span className="text-sm text-gray-500 truncate">
          {product.conditions} | Sz. {product.sizes}
        </span>
        <p className="text-xl font-bold">${product.price}</p>
        <p className="text-gray-700 flex-grow truncate">{product.description}</p>

        {quantity > 0 ? (
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <button
                className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
              <span className="text-sm font-semibold">{quantity} in cart</span>
              <button
                className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                onClick={handleAddToCart}
              >
                +
              </button>
            </div>
            <button
              className="border border-red-500 text-red-500 px-2 py-1 rounded-full mt-2 hover:bg-red-500 hover:text-white text-sm"
              onClick={handleRemoveFromCart}
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            className="w-full mt-5 px-4 py-2 border border-gray-500 hover:bg-gray-800 hover:text-white rounded transition-colors"
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