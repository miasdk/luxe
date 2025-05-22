// Updated FilterSideBar.jsx
import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";

export default function FilterSideBar() {
    const { 
        categoriesWithCount,
        selectedCategory, 
        updateCategory,
        resetFilters
    } = useProductContext();

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam && categoryParam !== selectedCategory) {
        updateCategory(categoryParam);
    }
    }, []);
        

    return (
        <div className="w-full md:w-45 p-3">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold">CATEGORIES</h2>
                <button 
                    onClick={resetFilters}
                    className="text-blue-500 text-xs hover:underline"
                >
                    Reset All
                </button>
            </div>

            <ul className="mt-2">
                <li className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <input 
                            type="radio" 
                            id="category-all" 
                            name="category"
                            value=""
                            className="w-3 h-3"
                            checked={selectedCategory === ''}
                            onChange={() => updateCategory('')}
                        />
                        <label htmlFor="category-all" className="ml-2 text-sm">All Categories</label>
                    </div>
                </li>
                
                {categoriesWithCount.map((category) => (
                    <li key={category.category_name} className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                            <input 
                                type="radio" 
                                id={`category-${category.category_name}`} 
                                name="category"
                                value={category.category_name}
                                className="w-3 h-3"
                                checked={selectedCategory === category.category_name}
                                onChange={() => updateCategory(category.category_name)}
                            />
                            <label htmlFor={`category-${category.category_name}`} className="ml-2 text-sm">
                                {category.category_name}
                            </label>
                        </div>
                        <span className="text-xs text-gray-500">({category.product_count})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}