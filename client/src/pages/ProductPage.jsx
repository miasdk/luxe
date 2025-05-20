// ProductPage.jsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterSideBar from '../components/FilterSideBar';
import FilterTopBar from '../components/FilterTopBar';
import ActiveFilters from '../components/ActiveFilters';
import ProductGrid from '../components/ProductGrid';
import { useProductContext } from '../context/ProductContext';

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const { updateCategory, selectedCategory } = useProductContext();
  
  // Read URL parameters only once on initial render
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      console.log(`Setting category from URL: ${categoryFromUrl}`);
      updateCategory(categoryFromUrl);
    }
  }, []);  // Empty dependency array - only run on mount

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSideBar />
        
        <div className="flex-1">
          <FilterTopBar />
          <ActiveFilters />
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;