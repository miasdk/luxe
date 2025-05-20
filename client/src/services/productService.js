const API_BASE_URL = import.meta.env.VITE_API_URL;

class ProductService {
    /**
     * Fetches all products from the server.
     * @returns {Promise<Array>} A promise that resolves to an array of products
     * or rejects with an error.
     */
    async fetchAllProducts() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        } 
    }

    /**
     * Fetches products based on filter criteria
    */

    async fetchFilteredProducts(filters = {}, sortBy = 'title', sortOrder = 'ASC') {
        try { 
            // Build query parameters 
            const params = new URLSearchParams(); 

            //If filter has values, add them to the params
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    params.append(key, value); 
                }
            })

            //Implement sorting parameters 
            params.append('sort_by', sortBy);
            params.append('sortOrder', sortOrder);

            //API request 
            const response = await fetch(`${API_BASE_URL}/api/products/filter?${params.toString()}`);

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching filtered products:", error);
            throw error;
        }
    }
    
     /**
     * Creates a new product on the server.
     */
    async createProduct(product) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating product:", error);
            throw error;
        }
    }

    /**
     * Updates an existing product on the server.
     * @param {string} productId - The ID of the product to update
     * @param {Object} updatedProduct - The updated product data
     * @returns {Promise<Object>} A promise that resolves to the updated product
     */
   async updateProduct(productId, updatedProduct) {
    console.log(`Starting update for product ID: ${productId}`);
    console.log("Data to send:", JSON.stringify(updatedProduct));
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
        });
        
        if (!response.ok) {
        // Try to get more details about the error
        const errorText = await response.text();
        console.error("Server returned error:", response.status, errorText);
        throw new Error(`HTTP error: ${response.status}. Details: ${errorText}`);
        }
        
        const data = await response.json();
        console.log("Update successful, received:", data);
        return data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
    }

    /**
     * Deletes a product from the server.
     * @param {string} productId - The ID of the product to delete
     * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful
     */
    async deleteProduct(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            return true;
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

    /**
     * Fetches a product by its ID from the server.
     * @param {string} productId - The ID of the product to fetch.
     * @returns {Promise<Object>} A promise that resolves to the product object
     * or rejects with an error.
     */
    async fetchProductById(productId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    }

    /**
     * Fetches products by category from the server.
     * @param {string} category - The category to filter by
     * @returns {Promise<Array>} A promise that resolves to an array of products
     */
    async fetchProductsByCategory(category) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/products/category/${encodeURIComponent(category)}`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching products by category:", error);
            throw error;
        }
    }

    async fetchBrands() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/brands`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching brands:", error);
            throw error;
        }
    }

    async fetchCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categories`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            return await response.json();
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }
}

const productsService = new ProductService();
export default productsService;