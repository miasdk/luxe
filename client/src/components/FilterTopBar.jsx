// eBay-Style FilterTopBar.jsx
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

    const hasColorOptions = filterOptions.colors.length > 0;
    const hasSizeOptions = filterOptions.sizes.length > 0;
    const hasConditionOptions = filterOptions.conditions.length > 0;

    return (
        <div className="w-full bg-white border-gray-200 sticky top-0 z-20">
            {/* Main filter bar */}
            <div className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* Results count */}
                    <div className="flex-shrink-0">
                        <p className="text-sm font-medium text-gray-900">
                            {products.length.toLocaleString()} results
                        </p>
                    </div>
                    
                    {/* Filter controls */}
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Size Filter */}
                        {hasSizeOptions && (
                            <div className="flex items-center gap-2">
                                <label htmlFor="size-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                    Size
                                </label>
                                <select
                                    id="size-filter"
                                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[120px]"
                                    value={secondaryFilters.size}
                                    onChange={(e) => updateSecondaryFilter('size', e.target.value)}
                                >
                                    <option value="">All sizes</option>
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
                            <div className="flex items-center gap-2">
                                <label htmlFor="color-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                    Color
                                </label>
                                <select
                                    id="color-filter"
                                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[120px]"
                                    value={secondaryFilters.color}
                                    onChange={(e) => updateSecondaryFilter('color', e.target.value)}
                                >
                                    <option value="">All colors</option>
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
                            <div className="flex items-center gap-2">
                                <label htmlFor="condition-filter" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                    Condition
                                </label>
                                <select
                                    id="condition-filter"
                                    className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[140px]"
                                    value={secondaryFilters.condition}
                                    onChange={(e) => updateSecondaryFilter('condition', e.target.value)}
                                >
                                    <option value="">All conditions</option>
                                    {filterOptions.conditions.map(condition => (
                                        <option key={condition.name} value={condition.name}>
                                            {condition.name} ({condition.count})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        
                        {/* Sort Divider */}
                        {(hasSizeOptions || hasColorOptions || hasConditionOptions) && (
                            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
                        )}
                        
                        {/* Sort Control */}
                        <div className="flex items-center gap-2">
                            <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                Sort by
                            </label>
                            <select
                                id="sort"
                                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-colors min-w-[160px]"
                                onChange={handleSortChange}
                                defaultValue="title-asc"
                            >
                                <option value="title-asc">Best Match</option>
                                <option value="created_at-desc">Time: newly listed</option>
                                <option value="price-asc">Price + Shipping: lowest first</option>
                                <option value="price-desc">Price + Shipping: highest first</option>
                                <option value="title-asc">Name: A to Z</option>
                                <option value="title-desc">Name: Z to A</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    );
};

export default FilterTopBar;