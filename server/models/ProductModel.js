/**
 * @file This file contains the ProductModel class which is responsible for handling all the database queries related to the products table.
 */

import { pool } from '../config/database.js';

class ProductModel {
    static async getAllProducts() {
        const selectQuery = ` 
            SELECT * 
            FROM product_details
            ORDER BY title, price;
        `;

        const results = await pool.query(selectQuery);
        return results.rows;
    }

    static async getProductById(productId) {
        const selectQuery = `
            SELECT * 
            FROM product_details
            WHERE product_id = $1;
        `;

        const results = await pool.query(selectQuery, [productId]);
        return results.rows[0];
    }

    static async getProductsByCategory(category) {
        const selectQuery = `
            SELECT * 
            FROM product_details
            WHERE category_name ILIKE $1
            ORDER BY title, price;
        `;
    
        const results = await pool.query(selectQuery, [category.trim()]);
        return results.rows;
    }
    /**
     * Retrieves products that match the provided filters (category, size, color, condition)
     * and sorts them based on the specified criteria.
     * 
     * This method dynamically constructs an SQL query using conditional filtering 
     * and `ANY` for multi-value comparisons to optimize performance.
     * 
     * @param {Object} filters - An object containing filter criteria.
     * @param {string} [filters.category_name] - The category to filter by (optional).
     * @param {string} [filters.size] - The size to filter by (optional).
     * @param {string} [filters.color] - The color to filter by (optional).
     * @param {string} [filters.condition] - The condition to filter by (optional).
     * @param {string} [sortBy='name'] - The column to sort results by (default: 'name').
     * @param {string} [sortOrder='ASC'] - The sorting order (default: 'ASC').
     * @returns {Promise<Array>} - A list of products that match the filters.
     * @throws {Error} - Throws an error if the database query fails.
     */
    static async getProductsByFilters(filters, sortBy = 'title', sortOrder = 'ASC') {
        const { category, size, color, condition } = filters;
        
        let selectQuery = `
            SELECT * 
            FROM product_details
            WHERE 1=1
        `;
        
        const queryParams = []; // Array to store query parameters
        let paramIndex = 1;
        
        if (category) {
            // Change 'category' to 'category_name'
            selectQuery += ` AND category_name = $${paramIndex}`;
            queryParams.push(category);
            paramIndex++;
        }
        if (size) { 
            selectQuery += ` AND $${paramIndex} = ANY (sizes)`;
            queryParams.push(size);
            paramIndex++;
        }
        if (color) {
            selectQuery += ` AND $${paramIndex} = ANY (colors)`;
            queryParams.push(color);
            paramIndex++;
        }
        if (condition) {
            selectQuery += ` AND $${paramIndex} = ANY (conditions)`;
            queryParams.push(condition);
            paramIndex++;
        }
        
        selectQuery += ` ORDER BY ${sortBy} ${sortOrder}`;
        
        try {
            const results = await pool.query(selectQuery, queryParams);
            return results.rows;
        } catch (error) {
            console.error("Error fetching products with filters:", error.message);
            throw new Error("Database query failed.");
        }
    }
    
    //Revised method to fetch products by title using full-text search
    static async searchProductsByTitle(keyword) {
        const searchQuery = `
            SELECT * 
            FROM product_details
            WHERE to_tsvector('english', title) @@ plainto_tsquery($1)
            ORDER BY ts_rank(to_tsvector('english', title), plainto_tsquery($1)) DESC;
        `;
    
        try {
            const results = await pool.query(searchQuery, [keyword]);
            return results.rows;
        } catch (error) {
            console.error("Error searching products by title:", error);
            throw new Error("Database query failed.");
        }
    }
    

    static async addProduct({ brand_id, title, price, description, category_id, image, color_ids = [], size_ids = [], condition_ids = [] }) { 
        const client = await pool.connect(); // Get a connection from the pool
    
        try {
            await client.query('BEGIN'); // Begin transaction
    
            // Step 1: Insert product into the products table
            const insertProductQuery = `
                INSERT INTO products (brand_id, title, price, description, category_id, image, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, NOW())
                RETURNING *;
            `;
            const productValues = [brand_id, title, price, description, category_id, image];
            const { rows } = await client.query(insertProductQuery, productValues);
            const product = rows[0]; // Extract the inserted product
            const product_id = product.id;
    
            // Ensure IDs are arrays (prevent errors)
            color_ids = Array.isArray(color_ids) ? color_ids : [];
            size_ids = Array.isArray(size_ids) ? size_ids : [];
            condition_ids = Array.isArray(condition_ids) ? condition_ids : [];
    
            // Step 2: Insert into product_colors
            if (color_ids.length > 0) {
                const colorQuery = `
                    INSERT INTO product_colors (product_id, color_id)
                    SELECT $1, UNNEST($2::int[]);
                `;
                await client.query(colorQuery, [product_id, color_ids]);
            }
    
            // Step 3: Insert into product_sizes
            if (size_ids.length > 0) {
                const sizeQuery = `
                    INSERT INTO product_sizes (product_id, size_id)
                    SELECT $1, UNNEST($2::int[]);
                `;
                await client.query(sizeQuery, [product_id, size_ids]);
            }
    
            // Step 4: Insert into product_conditions
            if (condition_ids.length > 0) {
                const conditionQuery = `
                    INSERT INTO product_conditions (product_id, condition_id)
                    SELECT $1, UNNEST($2::int[]);
                `;
                await client.query(conditionQuery, [product_id, condition_ids]);
            }
    
            await client.query('COMMIT'); // Commit transaction
            return product;
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback on error
            console.error('Database error while adding product:', error.message);
            throw new Error(`Database error: ${error.message}`);
        } finally {
            client.release(); // Release the client back to the pool
        }
    }
    
    /**
     * This method updates a product in the products table along with all associated attributes.   
     */
    static async updateProduct(productId, { brand_id, title, price, description, category_id, image, color_ids = [], size_ids = [], condition_ids = [] }) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');
    
            // Step 1: Update product
            const updateProductQuery = `
                UPDATE products
                SET brand_id = $1, title = $2, price = $3, description = $4, category_id = $5, image = $6
                WHERE id = $7
                RETURNING *;
            `;
            const productValues = [brand_id, title, price, description, category_id, image, productId];
            const { rows } = await client.query(updateProductQuery, productValues);
            const product = rows[0];
    
            // Function to update associated attributes (colors, sizes, conditions)
            const updateAssociations = async (table, column, values) => {
                await client.query(`DELETE FROM ${table} WHERE product_id = $1;`, [productId]);
                if (values.length > 0) {
                    await client.query(`INSERT INTO ${table} (product_id, ${column}) SELECT $1, UNNEST($2::int[]);`, [productId, values]);
                }
            };
    
            await updateAssociations('product_colors', 'color_id', color_ids);
            await updateAssociations('product_sizes', 'size_id', size_ids);
            await updateAssociations('product_conditions', 'condition_id', condition_ids);
    
            await client.query('COMMIT');
            return product;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Database error while updating product:', error.message);
            throw new Error(`Database error: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /*
    * This method deletes a product from the products table along with all associated attributes.
    */
    static async deleteProduct(productId) {
        const client = await pool.connect();
    
        try {
            await client.query('BEGIN');
    
            // Step 1: Delete product
            await client.query('DELETE FROM products WHERE id = $1;', [productId]);
    
            // Step 2: Delete associated attributes
            const deleteAssociations = async (table) => {
                await client.query(`DELETE FROM ${table} WHERE product_id = $1;`, [productId]);
            };
    
            await deleteAssociations('product_colors');
            await deleteAssociations('product_sizes');
            await deleteAssociations('product_conditions');
    
            await client.query('COMMIT');
            return true;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Database error while deleting product:', error.message);
            throw new Error(`Database error: ${error.message}`);
        } finally {
            client.release();
        }
    } 

    /**
     * Search for products by text
     * 
     * @param {string} query - Search query
     * @returns {Promise<Array>} - Array of matching products
     */
    static async searchProducts(query) {
        // Using the search_vector column created in reset.js
        const searchQuery = `
            SELECT * FROM product_details
            WHERE search_vector @@ plainto_tsquery('english', $1)
            OR title ILIKE $2
            OR description ILIKE $2
            OR brand_name ILIKE $2
            OR category_name ILIKE $2
            ORDER BY 
                CASE WHEN title ILIKE $2 THEN 1
                    WHEN brand_name ILIKE $2 THEN 2
                    WHEN category_name ILIKE $2 THEN 3
                    ELSE 4
                END,
                created_at DESC
            LIMIT 20;
        `;
        
        try {
            const result = await pool.query(searchQuery, [query, `%${query}%`]);
            return result.rows;
        } catch (error) {
            console.error('Error executing search query:', error.message);
            throw new Error('Database error: Failed to search products');
        }
    }
}

export default ProductModel;
