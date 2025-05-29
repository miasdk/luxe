// FilterSideBar.jsx - eBay-style accordion sidebar
import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function FilterSideBar() {
  const {
    categoriesWithCount,
    selectedCategory,
    updateCategory,
    resetFilters
  } = useProductContext();

  // Mobile-first: accordion closed by default
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
      if (window.innerWidth >= 1024) {
        setIsOpen(true); // Always open on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle URL parameters
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
    <div className="rounded">
      {/* Header - Always visible, clickable on mobile */}
      <div 
        className={`flex items-center justify-between p-4 ${isMobile ? 'cursor-pointer' : ''}`}
        onClick={isMobile ? toggleAccordion : undefined}
      >
        <h2 className="text-base font-semibold text-gray-900">Category</h2>
        <div className="flex items-center gap-2">
          {selectedCategory && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetFilters();
              }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Clear
            </button>
          )}
          {isMobile && (
            <button className="text-gray-500">
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Content - Collapsible on mobile, always visible on desktop */}
      <div className={`${isMobile && !isOpen ? 'hidden' : 'block'}`}>
        <div className="p-4">
          {/* All Categories Option */}
          <button
            className={`w-full text-left py-2 px-3 rounded text-sm transition-colors ${
              selectedCategory === '' 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => updateCategory('')}
          >
            All Categories
          </button>

          {/* Category List */}
          <div className="mt-2 space-y-1">
            {categoriesWithCount.map((category) => (
              <button
                key={category.category_name}
                className={`w-full flex items-center justify-between py-2 px-3 rounded text-sm transition-colors ${
                  selectedCategory === category.category_name
                    ? 'bg-blue-50 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => updateCategory(category.category_name)}
              >
                <span>{category.category_name}</span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {category.product_count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}