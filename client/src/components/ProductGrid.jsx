// components/ProductGrid.js
import React from 'react';
import ProductCard from "./ProductCard";
import { useProductContext } from "../context/ProductContext";

const ProductGrid = () => {
    // Get products, loading, and error state from context
    const { products, loading, error } = useProductContext();

    if (loading) {
        return <div className="w-full text-center py-10">Loading products...</div>;
    }

    if (error) {
        return <div className="w-full text-center py-10 text-red-500">Error: {error}</div>;
    }

    if (products.length === 0) {
        return (
            <div className="w-full text-center py-10">
                No products found matching your criteria.
            </div>
        );
    }

    return (
        <div className="grid gap-6 w-full mt-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
            {products.map((product) => (
                <ProductCard
                    key={product.product_id}
                    product={product}
                    className="h-full"
                />
            ))}
        </div>
    );
};

export default ProductGrid;