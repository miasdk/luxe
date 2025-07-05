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

    /**
     * Creates a new brand.
     * @param {Object} brandData - The brand data to create.
     * @returns {Promise<Object>} A promise that resolves to the created brand object.
     */
    async createBrand(brandData) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/brands/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(brandData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error creating brand:", error);
            throw error;
        }
    }

    /**
     * Finds or creates a brand by name.
     * @param {string} brandName - The name of the brand to find or create.
     * @returns {Promise<Object>} A promise that resolves to the brand object.
     */
    async findOrCreateBrand(brandName) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/brands/find-or-create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: brandName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "HTTP error: " + response.status);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error finding or creating brand:", error);
            throw error;
        }
    }

    async fetchBrandsWithCount(category = null) {
    try {
        const url = category 
            ? `${API_BASE_URL}/api/brands/brands-with-count?category=${encodeURIComponent(category)}`
            : `${API_BASE_URL}/api/brands/brands-with-count`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("HTTP error: " + response.status);
        return await response.json();
    } catch (error) {
        console.error("Error fetching brands with count:", error);
        throw error;
    }
}
}

const brandService = new BrandService();
export default brandService;