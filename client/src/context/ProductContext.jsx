import React, { createContext, useState, useContext, useEffect } from "react";
import productsService from "../services/productService";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    // State variables 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Flag to prevent URL update loops
    const [isUpdatingFromUrl, setIsUpdatingFromUrl] = useState(false);
    
    // Primary filters (sidebar)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [categoriesWithCount, setCategoriesWithCount] = useState([]);
    const [brandsWithCount, setBrandsWithCount] = useState([]);
    
    // Secondary filters (top bar)
    const [secondaryFilters, setSecondaryFilters] = useState({
        size: '',
        color: '',
        condition: '',
    });
    
    // Available filter options with counts
    const [filterOptions, setFilterOptions] = useState({
        sizes: [],
        colors: [],
        conditions: []
    });
    
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); 
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('ASC');

    // Fetch categories with counts
    const fetchCategoriesWithCount = async () => {
        try {
            const data = await productsService.fetchCategoriesWithCount();
            setCategoriesWithCount(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };

    // Fetch filter options based on selected category
    const fetchFilterOptions = async () => {
        try {
            const data = await productsService.fetchFilterOptions(selectedCategory);
            setFilterOptions(data);
        } catch (err) {
            console.error("Error fetching filter options:", err);
        }
    };

    // Fetch products with current filters 
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const filterParams = {
                category: selectedCategory,
                brand: selectedBrand,
                ...secondaryFilters,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
            };
            
            const data = await productsService.fetchFilteredProducts(
                filterParams,
                sortBy,
                sortOrder
            ); 
            setProducts(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    // Update category and reset secondary filters
    const updateCategory = (category) => {
        setSelectedCategory(category);
        setSecondaryFilters({
            size: '',
            color: '',
            condition: '',
        });
    };

    // Update brand and reset secondary filters
    const updateBrand = (brand) => {
        setSelectedBrand(brand);
        setSecondaryFilters({
            size: '',
            color: '',
            condition: '',
        });
    };

    // Update secondary filters
    const updateSecondaryFilter = (filterName, value) => {
        setSecondaryFilters(prev => ({
            ...prev,
            [filterName]: value,
        }));
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedCategory('');
        setSelectedBrand('');
        setSecondaryFilters({
            size: '',
            color: '',
            condition: '',
        });
        setPriceRange({ min: 0, max: 1000 });
    };

    // Update price range 
    const updatePriceRange = (min, max) => {
        setPriceRange({ min, max });
    };

    // Update sorting 
    const updateSorting = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    // Read URL parameters on initial component mount
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const brandParam = urlParams.get('brand');
        const sizeParam = urlParams.get('size');
        const colorParam = urlParams.get('color');
        const conditionParam = urlParams.get('condition');
        
        let shouldFetchProducts = false;
        
        if (categoryParam && categoryParam !== selectedCategory) {
            setIsUpdatingFromUrl(true);
            setSelectedCategory(categoryParam);
            shouldFetchProducts = true;
        }
        
        if (brandParam && brandParam !== selectedBrand) {
            setIsUpdatingFromUrl(true);
            setSelectedBrand(brandParam);
            shouldFetchProducts = true;
        }
        
        const newSecondaryFilters = { ...secondaryFilters };
        let secondaryFiltersChanged = false;
        
        if (sizeParam && sizeParam !== secondaryFilters.size) {
            newSecondaryFilters.size = sizeParam;
            secondaryFiltersChanged = true;
        }
        
        if (colorParam && colorParam !== secondaryFilters.color) {
            newSecondaryFilters.color = colorParam;
            secondaryFiltersChanged = true;
        }
        
        if (conditionParam && conditionParam !== secondaryFilters.condition) {
            newSecondaryFilters.condition = conditionParam;
            secondaryFiltersChanged = true;
        }
        
        if (secondaryFiltersChanged) {
            setIsUpdatingFromUrl(true);
            setSecondaryFilters(newSecondaryFilters);
            shouldFetchProducts = true;
        }
        
        // We'll fetch products and categories in the next useEffect
        // This is just to initialize state from URL
    }, []); // Empty dependency array means this runs once on mount

    // Initialize data when component mounts
    useEffect(() => {
        fetchCategoriesWithCount();
        fetchProducts();
    }, []);

    // Fetch filter options whenever category changes
    useEffect(() => {
        fetchFilterOptions();
    }, [selectedCategory]);

    // Fetch products whenever filters change
    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, selectedBrand, secondaryFilters, priceRange, sortBy, sortOrder]);

    // Update URL when filters change
    useEffect(() => {
        // Skip URL update if triggered by a URL change
        if (isUpdatingFromUrl) {
            setIsUpdatingFromUrl(false);
            return;
        }
        
        const params = new URLSearchParams();
        
        if (selectedCategory) {
            params.set('category', selectedCategory);
        }
        
        if (selectedBrand) {
            params.set('brand', selectedBrand);
        }
        
        // Add other filters as needed
        Object.entries(secondaryFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });
        
        // Get the current URL and update only the search params
        const url = window.location.pathname + (params.toString() ? `?${params.toString()}` : '');
        window.history.replaceState(null, '', url);
    }, [selectedCategory, selectedBrand, secondaryFilters, isUpdatingFromUrl]);

    return (
        <ProductContext.Provider
            value={{
                products,
                loading, 
                error,
                selectedCategory,
                selectedBrand,
                secondaryFilters,
                categoriesWithCount,
                filterOptions,
                priceRange,
                sortBy,
                sortOrder,
                updateCategory,
                updateBrand,
                updateSecondaryFilter,
                updatePriceRange,
                resetFilters,
                updateSorting,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;