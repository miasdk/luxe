// ActiveFilters.jsx - Enhanced with view toggle and filter count
import React from 'react';
import { useProductContext } from '../context/ProductContext';
import { X, RotateCcw, Grid3X3, List, Filter } from 'lucide-react';

const ActiveFilters = ({ viewMode, setViewMode }) => {
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

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedBrand) count++;
    count += Object.values(secondaryFilters).filter(val => val !== '').length;
    if (priceRange.min > 0 || priceRange.max < 1000) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <>
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-600" />
                <h3 className="text-sm font-medium text-gray-900">
                  Active Filters ({activeFilterCount})
                </h3>
              </div>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RotateCcw size={14} />
                Clear All
              </button>
            </>
          )}
        </div>

        <div className="flex bg-white rounded-lg border border-gray-200 p-1">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              viewMode === 'grid' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid3X3 size={16} />
            Grid
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
              viewMode === 'list' 
                ? 'bg-gray-900 text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List size={16} />
            List
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          {selectedCategory && (
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm group hover:bg-gray-200 transition-colors">
              <span className="text-gray-700">
                Category: <span className="font-medium">{selectedCategory}</span>
              </span>
              <button
                onClick={() => updateCategory('')}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Clear category filter"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {selectedBrand && (
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm group hover:bg-gray-200 transition-colors">
              <span className="text-gray-700">
                Brand: <span className="font-medium">{selectedBrand}</span>
              </span>
              <button
                onClick={() => updateBrand('')}
                className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Clear brand filter"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {Object.entries(secondaryFilters).map(([key, value]) => {
            if (value === '') return null;

            return (
              <div 
                key={key} 
                className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm group hover:bg-gray-200 transition-colors"
              >
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

          {(priceRange.min > 0 || priceRange.max < 1000) && (
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm group hover:bg-gray-200 transition-colors">
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
      )}
    </div>
  );
};

export default ActiveFilters;