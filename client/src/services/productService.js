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
    
    
}

const productsService = new ProductService();
export default productsService;