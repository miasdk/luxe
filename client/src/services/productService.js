/**
 * Product Service - Frontend API Client
 * Handles all product-related API requests to the backend
 */

// Base API URL - adjust if your API is not served at /api
import { API_BASE_URL } from '../config/api.js';

/**
 * Fetch all products without any filters
 * @returns {Promise<Array>} Array of product objects
 */
const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in fetchAllProducts:', error);
        throw error;
    }
};

/**
 * Fetch a specific product by ID
 * @param {string|number} productId - The ID of the product to fetch
 * @returns {Promise<Object>} Product object
 */
const fetchProductById = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error in fetchProductById(${productId}):`, error);
        throw error;
    }
};

/**
 * Fetch products by category
 * @param {string} category - Category name to filter by
 * @returns {Promise<Array>} Array of product objects
 */
const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/category/${encodeURIComponent(category)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products by category');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error in fetchProductsByCategory(${category}):`, error);
        throw error;
    }
};

/**
 * Fetch products with applied filters
 * @param {Object} filters - Object containing filter criteria
 * @param {string} [filters.category] - Category filter
 * @param {string} [filters.brand] - Brand filter
 * @param {string} [filters.size] - Size filter
 * @param {string} [filters.color] - Color filter
 * @param {string} [filters.condition] - Condition filter
 * @param {number} [filters.minPrice] - Minimum price
 * @param {number} [filters.maxPrice] - Maximum price
 * @param {string} [sortBy='title'] - Field to sort by
 * @param {string} [sortOrder='ASC'] - Sort direction ('ASC' or 'DESC')
 * @returns {Promise<Array>} Array of filtered product objects
 */
const fetchFilteredProducts = async (filters, sortBy = 'title', sortOrder = 'ASC') => {
    try {
        // Build query string from filters
        const queryParams = new URLSearchParams();
        
        // Add each filter if it has a value
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.brand) queryParams.append('brand', filters.brand);
        if (filters.size) queryParams.append('size', filters.size);
        if (filters.color) queryParams.append('color', filters.color);
        if (filters.condition) queryParams.append('condition', filters.condition);
        
        // Add price range if specified
        if (filters.minPrice !== undefined && filters.minPrice !== '') {
            queryParams.append('minPrice', filters.minPrice);
        }
        if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
            queryParams.append('maxPrice', filters.maxPrice);
        }
        
        // Add sorting parameters
        queryParams.append('sortBy', sortBy);
        queryParams.append('sortOrder', sortOrder);
        
        const response = await fetch(`${API_BASE_URL}/api/products/filter?${queryParams.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to fetch filtered products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in fetchFilteredProducts:', error);
        throw error;
    }
};

/**
 * Search products by keyword in title and description
 * @param {string} keyword - Search term
 * @returns {Promise<Array>} Array of matching product objects
 */
const searchProducts = async (keyword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/search?keyword=${encodeURIComponent(keyword)}`);
        if (!response.ok) {
            throw new Error('Failed to search products');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error in searchProducts(${keyword}):`, error);
        throw error;
    }
};

/**
 * Fetch categories with product counts
 * @returns {Promise<Array>} Array of category objects with counts
 */
const fetchCategoriesWithCount = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/categories-with-count`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchCategoriesWithCount:', error);
        throw error;
    }
};

/**
 * Fetch available filter options based on selected category and brand
 * @param {string} [category] - Optional category to filter options by
 * @param {string} [brand] - Optional brand to filter options by
 * @returns {Promise<Object>} Object containing filter options with counts
 */
const fetchFilterOptions = async (category, brand) => {
    try {
        const queryParams = new URLSearchParams();
        
        if (category) queryParams.append('category', category);
        if (brand) queryParams.append('brand', brand);
        
        const queryString = queryParams.toString();
        const url = `${API_BASE_URL}/api/products/filter-options${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch filter options');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchFilterOptions:', error);
        throw error;
    }
};

/**
 * Add a new product
 * @param {Object} productData - New product data
 * @returns {Promise<Object>} Created product object
 */
const addProduct = async (productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add product');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error in addProduct:', error);
        throw error;
    }
};

/**
 * Update an existing product
 * @param {string|number} productId - ID of the product to update
 * @param {Object} productData - Updated product data
 * @returns {Promise<Object>} Updated product object
 */
const updateProduct = async (productId, productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (parseError) {
                console.error('Failed to parse error response:', parseError);
                throw new Error(`Update failed with status ${response.status}: ${response.statusText}`);
            }
            console.error('Update error:', errorData);
            throw new Error(errorData.message || errorData.error || `Update failed with status ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`Error in updateProduct(${productId}):`, error);
        throw error;
    }
};

/**
 * Delete a product
 * @param {string|number} productId - ID of the product to delete
 * @returns {Promise<Object>} Response message
 */
const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete product');
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Error in deleteProduct(${productId}):`, error);
        throw error;
    }
};

/**
 * Fetch price range for products (useful for price filter sliders)
 * @param {string} [category] - Optional category to get price range for
 * @param {string} [brand] - Optional brand to get price range for
 * @returns {Promise<Object>} Object with min and max prices
 */
const fetchPriceRange = async (category, brand) => {
    try {
        const queryParams = new URLSearchParams();
        
        if (category) queryParams.append('category', category);
        if (brand) queryParams.append('brand', brand);
        
        const queryString = queryParams.toString();
        const url = `${API_BASE_URL}/api/products/price-range${queryString ? `?${queryString}` : ''}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch price range');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchPriceRange:', error);
        // Return default range if API fails
        return { minPrice: 0, maxPrice: 1000 };
    }
};

/**
 * Fetch product recommendations based on a product ID
 * @param {string|number} productId - ID of the product to get recommendations for
 * @param {number} [limit=4] - Number of recommendations to return
 * @returns {Promise<Array>} Array of recommended products
 */
const fetchRecommendations = async (productId, limit = 4) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}/recommendations?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchRecommendations:', error);
        return []; // Return empty array if recommendations fail
    }
};



export default {
    fetchAllProducts,
    fetchProductById,
    fetchProductsByCategory,
    fetchFilteredProducts,
    searchProducts,
    fetchCategoriesWithCount,
    fetchFilterOptions,
    fetchPriceRange,
    fetchRecommendations,
    addProduct,
    updateProduct,
    deleteProduct
};