// components/ActiveFilters.jsx
import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { IoClose } from 'react-icons/io5'; // Make sure to install react-icons if not already installed

const ActiveFilters = () => {
  const { filters, priceRange, updateFilter, updatePriceRange, resetFilters } = useProductContext();

  // Check if there are any active filters
  const hasActiveFilters = Object.values(filters).some(val => val !== '') || 
                          (priceRange.min > 0 || priceRange.max < 1000);

  if (!hasActiveFilters) {
    return null; // Don't render anything if no filters are active
  }

  // Function to get readable filter names
  const getReadableFilter = (key, value) => {
    switch (key) {
      case 'category':
        return `Category: ${value}`;
      case 'brand':
        return `Brand: ${value}`;
      case 'size':
        return `Size: ${value}`;
      case 'color':
        return `Color: ${value}`;
      case 'condition':
        return `Condition: ${value}`;
      default:
        return `${key}: ${value}`;
    }
  };

  // Function to clear a single filter
  const clearFilter = (key) => {
    updateFilter(key, '');
  };

  // Function to render price range if active
  const renderPriceRange = () => {
    if (priceRange.min > 0 || priceRange.max < 1000) {
      return (
        <div className="flex items-center bg-blue-100 rounded-full px-3 py-1 text-xs mr-2 mb-2">
          <span>Price: ${priceRange.min} - ${priceRange.max}</span>
          <button 
            onClick={() => updatePriceRange(0, 1000)} 
            className="ml-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear price filter"
          >
            <IoClose />
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Active Filters:</h3>
        <button 
          onClick={resetFilters}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap">
        {Object.entries(filters).map(([key, value]) => {
          if (value === '') return null;
          
          return (
            <div key={key} className="flex items-center bg-blue-100 rounded-full px-3 py-1 text-xs mr-2 mb-2">
              <span>{getReadableFilter(key, value)}</span>
              <button 
                onClick={() => clearFilter(key)} 
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label={`Clear ${key} filter`}
              >
                <IoClose />
              </button>
            </div>
          );
        })}
        {renderPriceRange()}
      </div>
    </div>
  );
};

export default ActiveFilters;