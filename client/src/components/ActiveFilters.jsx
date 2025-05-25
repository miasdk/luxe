// Enhanced ActiveFilters.jsx
import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { IoClose } from 'react-icons/io5';

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
    <div className="mb-4 bg-white border-t border-b border-gray-200 rounded-md p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">Active Filters</h3>
        <button 
          onClick={resetFilters}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedCategory && (
          <div className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs">
            <span className="text-blue-800">Category: {selectedCategory}</span>
            <button 
              onClick={() => updateCategory('')} 
              className="ml-2 text-blue-500 hover:text-blue-700"
              aria-label="Clear category filter"
            >
              <IoClose />
            </button>
          </div>
        )}
        
        {selectedBrand && (
          <div className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs">
            <span className="text-blue-800">Brand: {selectedBrand}</span>
            <button 
              onClick={() => updateBrand('')} 
              className="ml-2 text-blue-500 hover:text-blue-700"
              aria-label="Clear brand filter"
            >
              <IoClose />
            </button>
          </div>
        )}
        
        {Object.entries(secondaryFilters).map(([key, value]) => {
          if (value === '') return null;
          
          return (
            <div key={key} className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs">
              <span className="text-blue-800">{key.charAt(0).toUpperCase() + key.slice(1)}: {value}</span>
              <button 
                onClick={() => updateSecondaryFilter(key, '')} 
                className="ml-2 text-blue-500 hover:text-blue-700"
                aria-label={`Clear ${key} filter`}
              >
                <IoClose />
              </button>
            </div>
          );
        })}
        
        {(priceRange.min > 0 || priceRange.max < 1000) && (
          <div className="flex items-center bg-blue-50 border border-blue-100 rounded-full px-3 py-1 text-xs">
            <span className="text-blue-800">Price: ${priceRange.min} - ${priceRange.max}</span>
            <button 
              onClick={() => updatePriceRange(0, 1000)} 
              className="ml-2 text-blue-500 hover:text-blue-700"
              aria-label="Clear price filter"
            >
              <IoClose />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;