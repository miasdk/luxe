const API_BASE_URL = import.meta.env.VITE_API_URL;

class CategoryService {
    /**
     * Fetches all categories from the server.
     * @returns {Promise<Array>} A promise that resolves to an array of categories
     * or rejects with an error.
     */
    async fetchAllCategories() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categories/`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }

    /**
     * Fetches a category by its ID from the server.
     * @param {string} categoryId - The ID of the category to fetch.
     * @returns {Promise<Object>} A promise that resolves to the category object
     * or rejects with an error.
     */
    async fetchCategoryById(categoryId) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/categories/${categoryId}`);
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching category:", error);
            throw error;
        }
    }
}
const categoryService = new CategoryService();
export default categoryService;