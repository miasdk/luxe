import React, {createContext, useState, useContext, useEffect } from "react";
import productsService from "../services/productService";
import { use } from "react";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    // State variables 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '', 
        size: '',
        color: '',
        condition: '',
        brand: '',
    });
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 }); 
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('ASC');

    // Fetch products with current filters 
    const fetchProducts = async () => {
        setLoading(true);
        try {
            //If no filters active, fetch all products
            if (Object.values(filters).every(v => !v) &&
                priceRange.min === 0 && priceRange.max === 1000) {
                const data = await productsService.fetchAllProducts();
                setProducts(data);
            } else {
                const filterParams = {
                    ...filters, 
                    minPrice: priceRange.min,
                    maxPrice: priceRange.max,
                }; 
            
                const data = await productsService.fetchFilteredProducts(
                    filterParams,
                    sortBy,
                    sortOrder
                ); 
                setProducts(data);
            }
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    }; 

    // Update single filter 
    const updateFilter = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value,
        }));
    };

    // Reset all filters
    const resetFilters = () => {
        setFilters({
            category: '', 
            size: '',
            color: '',
            condition: '',
            brand: '',
        });
        setPriceRange({ min: 0, max: 1000 });
    }; 

    // Update price range 
    const updatePriceRange = (min, max) => {
        setPriceRange({ min, max });
    }

    // Update sorting 
    const updateSorting = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    }; 

    // Apply filters
    const applyFilters = () => {
        fetchProducts();
    };

    // Initialize products when component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [sortBy, sortOrder]); // This will trigger a re-fetch whenever sorting changes

    return (
        <ProductContext.Provider
            value={{
                products,
                loading, 
                error, 
                filters,
                priceRange,
                updateFilter,
                updatePriceRange,
                resetFilters,
                sortBy,
                sortOrder,
                updateSorting,
                applyFilters,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};