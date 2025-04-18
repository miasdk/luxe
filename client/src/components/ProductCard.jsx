import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
        
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100">
            <FaShoppingCart />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <span className="text-sm text-gray-500">{product.brand_name}</span>
        </div>
        <span className="text-sm text-gray-500">
          {product.conditions} | Sz. {product.sizes}
        </span>
        <p className="text-xl font-bold">${product.price}</p>
        <p className="text-gray-700 flex-grow">{product.description}</p>
      </div>
    </article>
  );
};

export default ProductCard;