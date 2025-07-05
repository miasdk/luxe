import { pool } from '../config/database.js';

class BrandModel {
    // Get all brands
    static async getAllBrands() {
        const query = "SELECT * FROM brands ORDER BY name";
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error fetching brands:", error.message);
            throw new Error("Database error: Unable to retrieve brands");
        }
    }

    // Get brand by ID
    static async getBrandById(brandId) {
        const query = "SELECT * FROM brands WHERE id = $1";
        try {
            const result = await pool.query(query, [brandId]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching brand by ID:", error.message);
            throw new Error("Database error: Unable to retrieve brand");
        }
    }

    // Get brand by name (case-insensitive)
    static async getBrandByName(brandName) {
        const query = "SELECT * FROM brands WHERE LOWER(name) = LOWER($1)";
        try {
            const result = await pool.query(query, [brandName]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching brand by name:", error.message);
            throw new Error("Database error: Unable to retrieve brand");
        }
    }

    // Create new brand
    static async createBrand(brandData) {
        const { name, image = null } = brandData;
        
        // Default image if none provided
        const defaultImage = "https://via.placeholder.com/150x100/f3f4f6/6b7280?text=" + encodeURIComponent(name);
        
        const query = `
            INSERT INTO brands (name, image)
            VALUES ($1, $2)
            RETURNING *
        `;
        
        try {
            const result = await pool.query(query, [name, image || defaultImage]);
            return result.rows[0];
        } catch (error) {
            console.error("Error creating brand:", error.message);
            if (error.code === '23505') { // Unique constraint violation
                throw new Error("Brand already exists");
            }
            throw new Error("Database error: Unable to create brand");
        }
    }

    // Find or create brand by name
    static async findOrCreateBrand(brandName) {
        try {
            // First try to find existing brand
            let brand = await this.getBrandByName(brandName);
            
            if (!brand) {
                // Create new brand if it doesn't exist
                brand = await this.createBrand({ name: brandName });
                console.log(`Created new brand: ${brandName}`);
            }
            
            return brand;
        } catch (error) {
            console.error("Error in findOrCreateBrand:", error.message);
            throw error;
        }
    }

    static async getBrandsWithCount(categoryName = null) {
        let query = `
            SELECT 
                brand_name,
                COUNT(DISTINCT product_id) as product_count
            FROM product_details
        `;
        
        const queryParams = [];
        
        if (categoryName) {
            query += ` WHERE category_name = $1`;
            queryParams.push(categoryName);
        }
        
        query += `
            GROUP BY brand_name
            HAVING COUNT(DISTINCT product_id) > 0
            ORDER BY brand_name ASC
        `;
        
        try {
            const result = await pool.query(query, queryParams);
            return result.rows;
        } catch (error) {
            console.error("Error fetching brands with count:", error.message);
            throw new Error("Database error: Unable to retrieve brands with count");
        }
    }
}

export default BrandModel;