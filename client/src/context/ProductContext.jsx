// ProductContext.jsx - Complete with Brand Filtering Support
import React, { createContext, useContext, useState, useEffect } from 'react';
import productService from '../services/productService';
import brandService from '../services/brandService';
import categoryService from '../services/categoryService';

const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  // State
  const [products, setProducts] = useState([]);
  const [categoriesWithCount, setCategoriesWithCount] = useState([]);
  const [brandsWithCount, setBrandsWithCount] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    colors: [],
    sizes: [],
    conditions: []
  });
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [secondaryFilters, setSecondaryFilters] = useState({
    size: '',
    color: '',
    condition: '',
    minPrice: '',
    maxPrice: ''
  });
  
  // Sorting
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('ASC');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch brands with count
  const fetchBrandsWithCount = async (category = null) => {
    try {
      const brands = await brandService.fetchBrandsWithCount(category);
      setBrandsWithCount(brands);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrandsWithCount([]);
    }
  };

  // Fetch categories with count
  const fetchCategoriesWithCount = async () => {
    try {
      const categories = await productService.fetchCategoriesWithCount();
      setCategoriesWithCount(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategoriesWithCount([]);
    }
  };

  // Fetch filter options
  const fetchFilterOptions = async (category = null, brand = null) => {
    try {
      const options = await productService.fetchFilterOptions(category);
      setFilterOptions(options);
    } catch (error) {
      console.error('Error fetching filter options:', error);
      setFilterOptions({
        colors: [],
        sizes: [],
        conditions: []
      });
    }
  };

  // Fetch products with filters
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const filters = {
        category: selectedCategory,
        brand: selectedBrand,
        ...secondaryFilters
      };
      
      // Remove empty filters
      Object.keys(filters).forEach(key => {
        if (filters[key] === '' || filters[key] === null || filters[key] === undefined) {
          delete filters[key];
        }
      });

      const result = await productService.fetchFilteredProducts(
        filters,
        sortBy,
        sortOrder
      );
      
      setProducts(result);
      setTotalItems(result.length);
      setTotalPages(Math.ceil(result.length / 20)); // Assuming 20 items per page
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      setProducts([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Update category
  const updateCategory = (category) => {
    setSelectedCategory(category);
    setSelectedBrand(''); // Clear brand when category changes
    setCurrentPage(1);
    
    // Update URL without causing page reload
    const url = new URL(window.location);
    if (category) {
      url.searchParams.set('category', category);
    } else {
      url.searchParams.delete('category');
    }
    window.history.pushState({}, '', url);
  };

  // Update brand
  const updateBrand = (brand) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
  };

  // Update secondary filters
  const updateSecondaryFilter = (filterType, value) => {
    setSecondaryFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  // Update sorting
  const updateSorting = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrand('');
    setSecondaryFilters({
      size: '',
      color: '',
      condition: '',
      minPrice: '',
      maxPrice: ''
    });
    setCurrentPage(1);
    
    // Clear URL params
    const url = new URL(window.location);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initial data fetch
  useEffect(() => {
    fetchCategoriesWithCount();
    fetchBrandsWithCount();
  }, []);

  // Update filter options when category or brand changes
  useEffect(() => {
    fetchFilterOptions(selectedCategory, selectedBrand);
    if (selectedCategory) {
      fetchBrandsWithCount(selectedCategory);
    } else {
      fetchBrandsWithCount();
    }
  }, [selectedCategory]);

  // Fetch products when any filter changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, selectedBrand, secondaryFilters, sortBy, sortOrder, currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');
      
      if (categoryParam !== selectedCategory) {
        setSelectedCategory(categoryParam || '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [selectedCategory]);

  const value = {
    // Data
    products,
    categoriesWithCount,
    brandsWithCount,
    filterOptions,
    
    // Filters
    selectedCategory,
    selectedBrand,
    secondaryFilters,
    
    // Sorting
    sortBy,
    sortOrder,
    
    // Pagination
    currentPage,
    totalPages,
    totalItems,
    
    // Loading states
    loading,
    error,
    
    // Actions
    updateCategory,
    updateBrand,
    updateSecondaryFilter,
    updateSorting,
    resetFilters,
    handlePageChange,
    
    // Refresh functions
    fetchProducts,
    fetchCategoriesWithCount,
    fetchBrandsWithCount,
    fetchFilterOptions
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};