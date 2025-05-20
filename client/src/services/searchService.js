import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const searchService = {
    /**
     * Search for products
     * 
     * @param {string} query - Search query
     * @returns {Promise<Array>} - Array of matching products
     */
    async searchProducts(query) {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/search`, {
                params: { query },
            });
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },
};

export default searchService;