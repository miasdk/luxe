import productsService from "../services/productService";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useShoppingCart } from "../context/CartContext";
import React from 'react'

export default function ProductDetailPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, removeFromCart, cart } = useShoppingCart();
    
    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const data = await productsService.fetchProductById(productId);
            setProduct(data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
        };
    
        fetchProduct();
    }, [productId]);


    console.log("Product Detail Page", product);
    
    if (!product) return <div>Loading...</div>;
    
    // Use `product.product_id` consistently
    const isInCart = cart.find(item => item.product_id === product.product_id);
    const quantity = isInCart ? isInCart.quantity : 0;
    
    const handleAddToCart = () => {
        addToCart(product);
    };
    
    const handleRemoveFromCart = () => {
        removeFromCart(product.product_id); 
    };
    
    return (
        <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
            <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-auto object-contain"
            />
            <div className="md:ml-4 mt-4 md:mt-0">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <span className="text-sm text-gray-500">{product.brand_name}</span>
            <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500">
                    {product.conditions} | Sz. {product.sizes}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
            </div>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-xl font-bold">${product.price}</p>
            <p className="text-sm text-gray-500">
                {product.conditions} | Sz. {product.sizes}
            </p>
            <div className="flex items-center mt-4">
                {product.category_name}
            </div>
            <button
                onClick={handleAddToCart}
                className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded ${
                quantity > 0 ? "hidden" : ""
                }`}
            >
                Add to Cart
            </button>
            {quantity > 0 && (
                <div className="flex items-center mt-4">
                <button
                    onClick={handleRemoveFromCart}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                >
                    Remove from Cart
                </button>
                <span className="ml-2 text-sm font-semibold">
                    {quantity} in cart
                </span>
                </div>
            )}
            </div>
        </div>
        <div className="mt-8">
            <h2 className="text-xl font-semibold">Related Products</h2>
            {/* Add related products here */}
            {/* You can use the ProductCarousel component here */}
            {/* <ProductCarousel /> */}
        </div>
        </div>
    );
}


