
import React from 'react';
import { useProductContext } from '../../../context/ProductContext';
import { X, RotateCcw, Grid3X3, List, Filter } from 'lucide-react';
import FormInput from '../../common/forms/FormInput';

const ActiveFilters = ({ viewMode, setViewMode }) => {
  const {
    selectedCategory,
    selectedBrand,
    secondaryFilters,
    updateCategory,
    updateBrand,
    updateSecondaryFilter,
    resetFilters
  } = useProductContext();

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedBrand) count++;
    
    count += Object.values(secondaryFilters).filter(val => val !== '' && val !== null && val !== undefined).length;
    
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
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
              >
                <RotateCcw size={14} />
                Clear All
              </button>
            </>
          )}
          {!hasActiveFilters && (
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <h3 className="text-sm font-medium text-gray-500">
                No filters applied
              </h3>
            </div>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {/* Category Filter */}
          {selectedCategory && (
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm group hover:bg-gray-200 transition-colors">
              <span className="text-gray-800">
                Category: <span className="font-semibold">{selectedCategory}</span>
              </span>
              <button
                onClick={() => updateCategory('')}
                className="ml-2 text-gray-600 hover:text-gray-800 transition-colors p-0.5 rounded"
                aria-label="Clear category filter"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {selectedBrand && (
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm group hover:bg-gray-200 transition-colors">
              <span className="text-gray-800">
                Brand: <span className="font-semibold">{selectedBrand}</span>
              </span>
              <button
                onClick={() => updateBrand('')}
                className="ml-2 text-gray-600 hover:text-gray-800 transition-colors p-0.5 rounded"
                aria-label="Clear brand filter"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {Object.entries(secondaryFilters).map(([key, value]) => {
            if (value === '' || value === null || value === undefined) return null;

            // Format display names
            const getDisplayName = (filterKey) => {
              switch (filterKey) {
                case 'minPrice':
                  return 'Min Price';
                case 'maxPrice':
                  return 'Max Price';
                default:
                  return filterKey.charAt(0).toUpperCase() + filterKey.slice(1);
              }
            };

            // Format display value
            const getDisplayValue = (filterKey, value) => {
              if (filterKey === 'minPrice' || filterKey === 'maxPrice') {
                return `${value}`;
              }
              return value;
            };

            return (
              <div 
                key={key} 
                className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm group hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-800">
                  {getDisplayName(key)}: <span className="font-semibold">{getDisplayValue(key, value)}</span>
                </span>
                <button
                  onClick={() => updateSecondaryFilter(key, '')}
                  className="ml-2 text-gray-600 hover:text-gray-800 transition-colors p-0.5 rounded"
                  aria-label={`Clear ${key} filter`}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActiveFilters;