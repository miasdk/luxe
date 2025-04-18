import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useShoppingCart } from "../context/CartContext";
import { Link } from "react-router-dom";
const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const { addToCart, removeFromCart, cart } = useShoppingCart();
  const handleAddToCart = () => {
    addToCart(product);
  };
  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };
  const isInCart = cart.find(product=>product.id === product.id);
  const quantity = isInCart ? isInCart.quantity : 0;

  return (
    <article className="bg-white group h-full overflow-hidden relative rounded-sm">
      {isFavorite ? (
        <button onClick={toggleFavorite} className="absolute top-2 right-2 z-10 p-2">
          <FaHeart className="text-red-500" />
        </button>
      ) : (
        <button onClick={toggleFavorite} className="absolute top-2 right-2 z-10 p-2">
          <FaRegHeart className="text-gray-500" />
        </button>
      )}

      <div className="relative">
        <img
          src={product.image} 
          alt={product.name}
          className="w-full bg-gray-100 h-48 object-contain flex-shrink-0"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <Link to={`/products/${product.id}`} className="text-gray-900 hover:text-gray-700">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          </Link>
          <span className="text-sm text-gray-500">{product.brand_name}</span>
        </div>
        <span className="text-sm text-gray-500">
          {product.conditions} | Sz. {product.sizes}
        </span>
        <p className="text-xl font-bold">${product.price}</p>
        <p className="text-gray-700 flex-grow truncate">{product.description}</p>
        { quantity > 0 ? (
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <button
                className="btn btn-sm btn-outline-secondary border border-gray-300 px-2 py-1 rounded text-gray-700 hover:bg-gray-100"
                onClick={handleRemoveFromCart}
              >
                -
              </button>
              <div>
                <span className="text-sm font-semibold">{quantity} in cart</span>
              </div>
              <button
                className="btn btn-sm btn-outline-secondary border border-gray-300 px-2 py-1 rounded text-gray-700 hover:bg-gray-100"
                onClick={handleAddToCart}
              >
                +
              </button>
            </div>
          <button
            className="border border-red-500 text-red-500 px-2 py-1 rounded-full mt-2 hover:bg-red-500 hover:text-white"
            onClick={handleRemoveFromCart}
          >
            Remove 
          </button>
        </div>
        ) : (
          <button
            className="px-4 py-2 border border-gray-500 mt-4 hover:bg-gray-800 hover:text-white w-full"
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