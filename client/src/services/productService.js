/**
 * Product Service - Frontend API Client
 * Handles all product-related API requests to the backend
 */

// Base API URL - adjust if your API is not served at /api
const API_BASE_URL = import.meta.env.VITE_API_URL + '/api/products';
/**
 * Fetch all products without any filters
 * @returns {Promise<Array>} Array of product objects
 */
const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);
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
        const response = await fetch(`${API_BASE_URL}/${productId}`);
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
        const response = await fetch(`${API_BASE_URL}/category/${encodeURIComponent(category)}`);
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
        if (filters.minPrice !== undefined) queryParams.append('minPrice', filters.minPrice);
        if (filters.maxPrice !== undefined) queryParams.append('maxPrice', filters.maxPrice);
        
        // Add sorting parameters
        queryParams.append('sortBy', sortBy);
        queryParams.append('sortOrder', sortOrder);
        
        const response = await fetch(`${API_BASE_URL}/filter?${queryParams.toString()}`);
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
        const response = await fetch(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}`);
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
        const response = await fetch(`${API_BASE_URL}/categories-with-count`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error('Error in fetchCategoriesWithCount:', error);
        throw error;
    }
};

/**
 * Fetch available filter options based on selected category
 * @param {string} [category] - Optional category to filter options by
 * @returns {Promise<Object>} Object containing filter options with counts
 */
const fetchFilterOptions = async (category) => {
    try {
        const url = category 
            ? `${API_BASE_URL}/filter-options?category=${encodeURIComponent(category)}`
            : `${API_BASE_URL}/filter-options`;
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
        const response = await fetch(`${API_BASE_URL}`, {
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
        const response = await fetch(`${API_BASE_URL}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update product');
        }
        
        return await response.json();
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
        const response = await fetch(`${API_BASE_URL}/${productId}`, {
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

export default {
    fetchAllProducts,
    fetchProductById,
    fetchProductsByCategory,
    fetchFilteredProducts,
    searchProducts,
    fetchCategoriesWithCount,
    fetchFilterOptions,
    addProduct,
    updateProduct,
    deleteProduct
};