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