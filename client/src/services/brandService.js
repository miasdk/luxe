const API_BASE_URL = import.meta.env.VITE_API_URL;

class BrandService {    
    /**
     * Fetches all brands from the server.
     * @returns {Promise<Array>} A promise that resolves to an array of brands
     * or rejects with an error.
     */
    async fetchAllBrands() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/brands/`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching brands:", error);
            throw error;
        }
    }
    /**
     * Fetches a brand by its ID from the server.
     * @param {string} brandId - The ID of the brand to fetch.
     * @returns {Promise<Object>} A promise that resolves to the brand object
     * or rejects with an error.
     */
    async fetchBrandById(brandId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/brands/${brandId}`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching brand:", error);
            throw error;
        }
    }
}

const brandService = new BrandService();
export default brandService;