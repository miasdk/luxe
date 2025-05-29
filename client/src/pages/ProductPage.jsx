// ProductPage.jsx - Simple pagination implementation
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import FilterSideBar from '../components/FilterSideBar';
import FilterTopBar from '../components/FilterTopBar';
import ActiveFilters from '../components/ActiveFilters';
import ProductGrid from '../components/ProductGrid';
import Breadcrumb from '../components/Breadcrumb';
import { useProductContext } from '../context/ProductContext';

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { 
    updateCategory, 
    selectedCategory, 
    products,
    currentPage,
    totalPages,
    totalItems,
    handlePageChange
  } = useProductContext();
  
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      console.log(`Setting category from URL: ${categoryFromUrl}`);
      updateCategory(categoryFromUrl);
    }
  }, [searchParams, selectedCategory, updateCategory]);

  const handlePageClick = (event) => {
    handlePageChange(event.selected + 1);
  };

  const breadcrumbItems = [
    { label: 'Products', href: '/products' }
  ];

  // Add category to breadcrumb if selected
  if (selectedCategory) {
    breadcrumbItems.push({
      label: selectedCategory,
      href: null // Current page, no link
    });
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Clean Header */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-4">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {selectedCategory ? selectedCategory : 'All Products'}
            </h1>
            <p className="text-sm text-gray-600">
              {totalItems || 0} products available
            </p>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <FilterSideBar />
          </div>
          
          <div className="flex-1 min-w-0">
            <FilterTopBar />
            
            <ActiveFilters 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
            />
            
            <ProductGrid viewMode={viewMode} />
            
            {totalPages > 1 && (
              <div className="mt-8">
                <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  pageCount={totalPages}
                  onPageChange={handlePageClick}
                  forcePage={currentPage - 1}
                  containerClassName="flex justify-center items-center space-x-2"
                  pageClassName="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                  activeClassName="bg-gray-900 text-white border-gray-900"
                  previousClassName="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                  nextClassName="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                  disabledClassName="opacity-50 cursor-not-allowed"
                  breakClassName="px-3 py-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;