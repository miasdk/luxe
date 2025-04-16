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
}

const productsService = new ProductService();
export default productsService;