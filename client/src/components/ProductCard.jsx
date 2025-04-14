import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <article className="bg-white group h-full overflow-hidden relative rounded-sm">
        { isFavorite ? (
            <button onClick={toggleFavorite} className="absolute top-2 right-2 z-10 p-2">
                <FaHeart className="text-red-500" />
            </button>
        ) : (
            <button onClick={toggleFavorite} className="absolute top-2 right-2 z-10 p-2">
                <FaRegHeart className="text-gray-500" />
            </button>
        )}
            <img
                src={product.image}
                alt={product.name}
                className="w-full bg-gray-100 h-48 object-contain flex-shrink-0"
            />
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{product.title}</h2>
                    <span className="text-sm text-gray-500">{product.brand}</span>
                </div>
                <span className="text-sm text-gray-500">{product.conditions} | Sz. {product.sizes} </span> 
                <p className="text-xl font-bold">${product.price}</p>
                <p className="text-gray-700 flex-grow">{product.description}</p>
            </div>
        </article>
            
    );
};

export default ProductCard;