// ActiveFilters.jsx - Minimalist design matching FilterTopBar
import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { X, RotateCcw } from 'lucide-react';

const ActiveFilters = () => {
  const { 
    selectedCategory,
    selectedBrand,
    secondaryFilters,
    priceRange,
    updateCategory,
    updateBrand,
    updateSecondaryFilter,
    updatePriceRange,
    resetFilters
  } = useProductContext();

  // Check if there are any active filters
  const hasActiveFilters = selectedCategory ||
                          selectedBrand ||
                          Object.values(secondaryFilters).some(val => val !== '') ||
                          (priceRange.min > 0 || priceRange.max < 1000);

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className=" mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Active Filters</h3>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <RotateCcw size={14} />
          Clear All
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {/* Category Filter */}
        {selectedCategory && (
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
            <span className="text-gray-700">Category: <span className="font-medium">{selectedCategory}</span></span>
            <button
              onClick={() => updateCategory('')}
              className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Clear category filter"
            >
              <X size={14} />
            </button>
          </div>
        )}
        
        {/* Brand Filter */}
        {selectedBrand && (
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
            <span className="text-gray-700">Brand: <span className="font-medium">{selectedBrand}</span></span>
            <button
              onClick={() => updateBrand('')}
              className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Clear brand filter"
            >
              <X size={14} />
            </button>
          </div>
        )}
        
        {/* Secondary Filters (Size, Color, Condition) */}
        {Object.entries(secondaryFilters).map(([key, value]) => {
          if (value === '') return null;
          
          return (
            <div key={key} className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
              <span className="text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}: <span className="font-medium">{value}</span>
              </span>
              <button
                onClick={() => updateSecondaryFilter(key, '')}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={`Clear ${key} filter`}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
        
        {/* Price Range Filter */}
        {(priceRange.min > 0 || priceRange.max < 1000) && (
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm">
            <span className="text-gray-700">
              Price: <span className="font-medium">${priceRange.min} - ${priceRange.max}</span>
            </span>
            <button
              onClick={() => updatePriceRange(0, 1000)}
              className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Clear price filter"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;