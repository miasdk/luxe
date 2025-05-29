// ProductPage.jsx - Clean white background like eBay
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSideBar from '../components/FilterSideBar';
import FilterTopBar from '../components/FilterTopBar';
import ActiveFilters from '../components/ActiveFilters';
import ProductGrid from '../components/ProductGrid';
import Breadcrumb from '../components/Breadcrumb';
import { useProductContext } from '../context/ProductContext';

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { updateCategory, selectedCategory } = useProductContext();

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      console.log(`Setting category from URL: ${categoryFromUrl}`);
      updateCategory(categoryFromUrl);
    }
  }, []);

  // Build breadcrumb items based on current state
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
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSideBar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <FilterTopBar />
            <ActiveFilters />
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;