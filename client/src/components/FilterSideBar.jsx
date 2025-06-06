// Enhanced FilterSideBar.jsx - With Brand Filtering
import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

const FilterSideBar = () => {
  const {
    categoriesWithCount,
    brandsWithCount, // Add this to your ProductContext
    selectedCategory,
    selectedBrand, // Add this to your ProductContext
    updateCategory,
    updateBrand, // Add this to your ProductContext
    resetFilters
  } = useProductContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true
  });

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

  const toggleAccordion = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = selectedCategory || selectedBrand;

  return (
    <div className={` rounded-xl  ${isMobile ? '' : 'sticky top-6'}`}>
      <div 
        className={`flex items-center justify-between p-5 ${
          isMobile ? 'cursor-pointer hover:bg-gray-50/80 transition-colors rounded-t-xl' : ''
        }`}
        onClick={isMobile ? toggleAccordion : undefined}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Filter size={16} className="text-gray-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetFilters();
              }}
              className="flex items-center gap-1.5 text-red-600 hover:text-red-700 text-sm font-medium transition-colors px-2 py-1 rounded-md hover:bg-red-50"
            >
              <X size={12} />
              Clear
            </button>
          )}
          {isMobile && (
            <div className="text-gray-400">
              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          )}
        </div>
      </div>

      <div className={`transition-all duration-300 ease-in-out ${
        isMobile && !isOpen 
          ? 'max-h-0 opacity-0 overflow-hidden' 
          : 'max-h-none opacity-100'
      }`}>
        <div className="px-5 pb-5 space-y-6">
          
          {/* Categories Section */}
          <div>
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full mb-4"
            >
              <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
                Category
              </h3>
              {expandedSections.categories ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </button>
            
            {expandedSections.categories && (
              <div className="space-y-2">
                <button
                  className={`w-full text-left py-3 px-4 rounded-lg text-sm transition-all font-medium ${
                    selectedCategory === ''
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                  onClick={() => updateCategory('')}
                >
                  All Categories
                </button>

                <div className="space-y-2">
                  {categoriesWithCount.map((category) => (
                    <button
                      key={category.category_name}
                      className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm transition-all ${
                        selectedCategory === category.category_name
                          ? 'bg-gray-900 text-white shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => updateCategory(category.category_name)}
                    >
                      <span className="truncate pr-3 font-medium">{category.category_name}</span>
                      <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium ${
                        selectedCategory === category.category_name
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.product_count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {brandsWithCount && brandsWithCount.length > 0 && (
            <div>
              <button
                onClick={() => toggleSection('brands')}
                className="flex items-center justify-between w-full mb-4"
              >
                <h3 className="text-sm font-semibold text-gray-800 tracking-wide uppercase">
                  Brand
                </h3>
                {expandedSections.brands ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>
              
              {expandedSections.brands && (
                <div className="space-y-2">
                  <button
                    className={`w-full text-left py-3 px-4 rounded-lg text-sm transition-all font-medium ${
                      selectedBrand === '' || !selectedBrand
                        ? 'bg-gray-900 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                    onClick={() => updateBrand('')}
                  >
                    All Brands
                  </button>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {brandsWithCount.map((brand) => (
                      <button
                        key={brand.brand_name}
                        className={`w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm transition-all ${
                          selectedBrand === brand.brand_name
                            ? 'bg-gray-900 text-white shadow-sm'
                            : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => updateBrand(brand.brand_name)}
                      >
                        <span className="truncate pr-3 font-medium">{brand.brand_name}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full flex-shrink-0 font-medium ${
                          selectedBrand === brand.brand_name
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {brand.product_count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;