// FilterSideBar.jsx - Updated with lower mobile breakpoint
import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

export default function FilterSideBar() {
  const {
    categoriesWithCount,
    selectedCategory,
    updateCategory,
    resetFilters
  } = useProductContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); 
      if (window.innerWidth >= 768) {
        setIsOpen(true); 
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
        
    if (categoryParam && categoryParam !== selectedCategory) {
      updateCategory(categoryParam);
    }
  }, []);

  const toggleAccordion = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`bg-white ${isMobile ? 'border-b border-gray-200' : ''}`}>
      <div 
        className={`flex items-center justify-between p-4 ${
          isMobile ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''
        }`}
        onClick={isMobile ? toggleAccordion : undefined}
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {selectedCategory && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetFilters();
              }}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              <X size={14} />
              Clear all
            </button>
          )}
          {isMobile && (
            <div className="text-gray-400">
              {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          )}
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${
        isMobile && !isOpen 
          ? 'max-h-0 opacity-0 overflow-hidden' 
          : 'max-h-none opacity-100'
      }`}>
        <div className="px-4 pb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Category</h3>
            
            <button
              className={`w-full text-left py-2 px-3 rounded text-sm transition-colors ${
                selectedCategory === ''
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => updateCategory('')}
            >
              All Categories
            </button>

            <div className="mt-1 space-y-1">
              {categoriesWithCount.map((category) => (
                <button
                  key={category.category_name}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded text-sm transition-colors ${
                    selectedCategory === category.category_name
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => updateCategory(category.category_name)}
                >
                  <span className="truncate pr-2">{category.category_name}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full flex-shrink-0">
                    {category.product_count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}