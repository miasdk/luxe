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

    static async getFilterOptions(categoryName = null) {
        try {
            // Base query to get all available filter options with counts
            let query = `
                SELECT 
                    'size' as filter_type,
                    s AS filter_value,
                    COUNT(DISTINCT product_id) as product_count
                FROM (
                    SELECT product_id, unnest(sizes) as s
                    FROM product_details
                    WHERE 1=1
                    ${categoryName ? "AND category_name = $1" : ""}
                ) as sizes_expanded
                GROUP BY s
                
                UNION ALL
                
                SELECT 
                    'color' as filter_type,
                    c AS filter_value,
                    COUNT(DISTINCT product_id) as product_count
                FROM (
                    SELECT product_id, unnest(colors) as c
                    FROM product_details
                    WHERE 1=1
                    ${categoryName ? "AND category_name = $1" : ""}
                ) as colors_expanded
                GROUP BY c
                
                UNION ALL
                
                SELECT 
                    'condition' as filter_type,
                    c AS filter_value,
                    COUNT(DISTINCT product_id) as product_count
                FROM (
                    SELECT product_id, unnest(conditions) as c
                    FROM product_details
                    WHERE 1=1
                    ${categoryName ? "AND category_name = $1" : ""}
                ) as conditions_expanded
                GROUP BY c
                
                ORDER BY filter_type, filter_value;
            `;
            
            const params = categoryName ? [categoryName] : [];
            const result = await pool.query(query, params);
            
            // Transform into a structured object
            const filterOptions = {
                sizes: [],
                colors: [],
                conditions: []
            };
            
            result.rows.forEach(row => {
                if (row.filter_type === 'size') {
                    filterOptions.sizes.push({
                        name: row.filter_value,
                        count: parseInt(row.product_count)
                    });
                } else if (row.filter_type === 'color') {
                    filterOptions.colors.push({
                        name: row.filter_value,
                        count: parseInt(row.product_count)
                    });
                } else if (row.filter_type === 'condition') {
                    filterOptions.conditions.push({
                        name: row.filter_value,
                        count: parseInt(row.product_count)
                    });
                }
            });
            
            return filterOptions;
        } catch (error) {
            console.error("Error fetching filter options:", error.message);
            throw new Error("Failed to retrieve filter options");
        }
    }

    static async getCategoriesWithCount() {
        try {
            const query = `
                SELECT 
                    category_name, 
                    COUNT(DISTINCT product_id) as product_count
                FROM product_details
                GROUP BY category_name
                ORDER BY category_name;
            `;
            
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error("Error fetching categories with count:", error.message);
            throw new Error("Failed to retrieve categories");
        }
    }
    static async getProductsByFilters(filters, sortBy = 'title', sortOrder = 'ASC') {
        const { category, size, color, condition, brand } = filters;
        
        let selectQuery = `
            SELECT * 
            FROM product_details
            WHERE 1=1
        `;
        
        const queryParams = [];
        let paramIndex = 1;
        
        // Primary filter: Category or brand
        if (category) {
            selectQuery += ` AND category_name = $${paramIndex}`;
            queryParams.push(category);
            paramIndex++;
        }
        
        if (brand) {
            selectQuery += ` AND brand_name = $${paramIndex}`;
            queryParams.push(brand);
            paramIndex++;
        }
        
        // Secondary filters: Apply only if a value is selected
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
        
        // Add price range if specified
        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
            selectQuery += ` AND price >= $${paramIndex} AND price <= $${paramIndex + 1}`;
            queryParams.push(filters.minPrice, filters.maxPrice);
            paramIndex += 2;
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
    

    static async addProduct({ brand_id, title, price, description, category_id, image, num_likes = 0, color_ids = [], size_ids = [], condition_ids = [] }) { 
        const client = await pool.connect(); // Get a connection from the pool
    
        try {
            await client.query('BEGIN'); // Begin transaction
    
            // Step 1: Insert product into the products table
            const insertProductQuery = `
                INSERT INTO products (brand_id, title, price, description, category_id, image, num_likes, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
                RETURNING *;
            `;
            const productValues = [brand_id, title, price, description, category_id, image, num_likes || 0]
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
