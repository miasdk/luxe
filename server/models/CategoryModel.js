import { pool } from "../config/database.js";

class CategoryModel {
    // Get all categories
    static async getAllCategories() {
        const query = "SELECT * FROM categories ORDER BY name";
        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error fetching categories:", error.message);
            throw new Error("Database error: Unable to retrieve categories");
        }
    }

    // Get category by ID
    static async getCategoryById(categoryId) {
        const query = "SELECT * FROM categories WHERE id = $1";
        try {
            const result = await pool.query(query, [categoryId]);
            return result.rows[0];
        } catch (error) {
            console.error("Error fetching category by ID:", error.message);
            throw new Error("Database error: Unable to retrieve category");
        }
    }
}

export default CategoryModel;
