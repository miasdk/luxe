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
    <div className=" p-5 mb-6 border-b border-gray-200">
      <div className="flex flex-wrap items-center gap-6">
        {hasSizeOptions && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-800 whitespace-nowrap">
              Size
            </label>
            <select
              className="bg-white/90 border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all min-w-[130px] hover:border-gray-300"
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
        
        {hasColorOptions && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-800 whitespace-nowrap">
              Color
            </label>
            <select
              className="bg-white/90 border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all min-w-[130px] hover:border-gray-300"
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
        
        {hasConditionOptions && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-800 whitespace-nowrap">
              Condition
            </label>
            <select
              className="bg-white/90 border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all min-w-[150px] hover:border-gray-300"
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
        
        <div className="flex-1"></div>
        
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-800 whitespace-nowrap">
            Sort by
          </label>
          <select
            className="bg-white/90 border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all min-w-[180px] hover:border-gray-300"
            onChange={handleSortChange}
            defaultValue="title-asc"
          >
            <option value="title-asc">Best Match</option>
            <option value="created_at-desc">Time: newest first</option>
            <option value="price-asc">Price: lowest first</option>
            <option value="price-desc">Price: highest first</option>
            <option value="title-asc">Name: A to Z</option>
            <option value="title-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterTopBar;