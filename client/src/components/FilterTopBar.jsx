// components/FilterTopBar.js
import React from "react";
import { useProductContext } from "../context/ProductContext";

const FilterTopBar = () => {
    const { products, updateSorting } = useProductContext();

    const handleSortChange = (e) => {
        const value = e.target.value;
        
        // Parse the value to get sortBy and sortOrder
        // Example format: "price-asc"
        const [sortBy, sortOrder] = value.split('-');
        
        updateSorting(sortBy, sortOrder.toUpperCase());
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex-1 md:flex-none">
                <p className="text-sm text-gray-500">Showing {products.length} products</p>
            </div>
            
            <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm">Sort by:</label>
                <select
                    id="sort"
                    className="border rounded p-1 text-sm"
                    onChange={handleSortChange}
                    defaultValue="title-asc"
                >
                    <option value="title-asc">Name (A-Z)</option>
                    <option value="title-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                    <option value="created_at-desc">Newest</option>
                </select>
            </div>
        </div>
    );
};

export default FilterTopBar;