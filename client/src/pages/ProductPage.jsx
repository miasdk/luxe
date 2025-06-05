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
      updateCategory(categoryFromUrl);
    }
  }, [searchParams, selectedCategory, updateCategory]);

  const handlePageClick = (event) => {
    handlePageChange(event.selected + 1);
  };

  const breadcrumbItems = [
    { label: 'Products', href: '/products' }
  ];

  if (selectedCategory) {
    breadcrumbItems.push({
      label: selectedCategory,
      href: null 
    });
  }

  return (
    <div className="bg-gradient-to-br from-gray-50/50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-6">
            <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">
              {selectedCategory ? selectedCategory : 'All Products'}
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              {totalItems || 0} products available
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 flex-shrink-0">
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
              <div className="mt-12 flex justify-center">
                <ReactPaginate
                  previousLabel="← Previous"
                  nextLabel="Next →"
                  pageCount={totalPages}
                  onPageChange={handlePageClick}
                  forcePage={currentPage - 1}
                  containerClassName="flex items-center space-x-1"
                  pageClassName="group"
                  pageLinkClassName="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all font-medium text-sm text-gray-700 hover:border-gray-300"
                  activeClassName="bg-gray-900 text-white border-gray-900 shadow-sm"
                  activeLinkClassName="text-white hover:bg-gray-900"
                  previousClassName="group"
                  previousLinkClassName="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all font-medium text-sm text-gray-700 hover:border-gray-300"
                  nextClassName="group"
                  nextLinkClassName="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all font-medium text-sm text-gray-700 hover:border-gray-300"
                  disabledClassName="opacity-50 cursor-not-allowed"
                  disabledLinkClassName="hover:bg-transparent hover:border-gray-200"
                  breakClassName="px-2 py-2 text-gray-400"
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