// FilterTopBar.jsx - Clean white eBay-style design
import React from "react";
import { useProductContext } from "../context/ProductContext";
import { SlidersHorizontal } from "lucide-react";

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
    <div className="bg-white border-b border-gray-200 p-4 mb-4">
      <div className="flex flex-wrap items-center gap-4">
        {/* Size Filter */}
        {hasSizeOptions && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Size
            </label>
            <select
              className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[120px]"
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
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Color
            </label>
            <select
              className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[120px]"
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
            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Condition
            </label>
            <select
              className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[140px]"
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
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Sort Control */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by
          </label>
          <select
            className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[160px]"
            onChange={handleSortChange}
            defaultValue="title-asc"
          >
            <option value="title-asc">Best Match</option>
            <option value="created_at-desc">Time: newest first</option>
            <option value="price-asc">Price + Shipping: lowest first</option>
            <option value="price-desc">Price + Shipping: highest first</option>
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterTopBar;