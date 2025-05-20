// Updated FilterTopBar.jsx
import React from "react";
import { useProductContext } from "../context/ProductContext";

const FilterTopBar = () => {
    const { 
        products, 
        filterOptions, 
        secondaryFilters,
        updateSecondaryFilter,
        updateSorting 
    } = useProductContext();

    const handleSortChange = (e) => {
        const value = e.target.value;
        const [sortBy, sortOrder] = value.split('-');
        updateSorting(sortBy, sortOrder.toUpperCase());
    };

    // Only render filter dropdowns if they have options
    const hasColorOptions = filterOptions.colors.length > 0;
    const hasSizeOptions = filterOptions.sizes.length > 0;
    const hasConditionOptions = filterOptions.conditions.length > 0;

    return (
        <div className="w-full bg-gray-50 p-3 mb-4 shadow-sm sticky top-0 z-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex-none">
                    <p className="text-sm text-gray-500">Showing {products.length} products</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    {/* Size Filter */}
                    {hasSizeOptions && (
                        <div className="flex items-center">
                            <label htmlFor="size-filter" className="mr-2 text-sm">Size:</label>
                            <select
                                id="size-filter"
                                className="border rounded p-1 text-sm min-w-[100px]"
                                value={secondaryFilters.size}
                                onChange={(e) => updateSecondaryFilter('size', e.target.value)}
                            >
                                <option value="">All Sizes</option>
                                {filterOptions.sizes.map(size => (
                                    <option key={size.name} value={size.name}>
                                        {size.name} ({size.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {/* Color Filter */}
                    {hasColorOptions && (
                        <div className="flex items-center">
                            <label htmlFor="color-filter" className="mr-2 text-sm">Color:</label>
                            <select
                                id="color-filter"
                                className="border rounded p-1 text-sm min-w-[100px]"
                                value={secondaryFilters.color}
                                onChange={(e) => updateSecondaryFilter('color', e.target.value)}
                            >
                                <option value="">All Colors</option>
                                {filterOptions.colors.map(color => (
                                    <option key={color.name} value={color.name}>
                                        {color.name} ({color.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {/* Condition Filter */}
                    {hasConditionOptions && (
                        <div className="flex items-center">
                            <label htmlFor="condition-filter" className="mr-2 text-sm">Condition:</label>
                            <select
                                id="condition-filter"
                                className="border rounded p-1 text-sm min-w-[120px]"
                                value={secondaryFilters.condition}
                                onChange={(e) => updateSecondaryFilter('condition', e.target.value)}
                            >
                                <option value="">Any Condition</option>
                                {filterOptions.conditions.map(condition => (
                                    <option key={condition.name} value={condition.name}>
                                        {condition.name} ({condition.count})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {/* Sort By */}
                    <div className="flex items-center">
                        <label htmlFor="sort" className="mr-2 text-sm">Sort:</label>
                        <select
                            id="sort"
                            className="border rounded p-1 text-sm min-w-[140px]"
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
            </div>
        </div>
    );
};

export default FilterTopBar;