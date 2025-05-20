import { pool } from '../config/database.js';

class SearchController {
    /**
     * Search for products
     * 
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async searchProducts(req, res) {
        const { query } = req.query;
        
        if (!query || query.trim() === '') {
            return res.status(400).json({ message: 'Search query is required' });
        }
        
        try {
            // Using the product_details view and search_vector for full-text search
            const searchQuery = `
                SELECT * FROM product_details
                WHERE 
                    to_tsvector('english', title || ' ' || description || ' ' || brand_name || ' ' || category_name) @@ plainto_tsquery('english', $1)
                    OR title ILIKE $2
                    OR description ILIKE $2
                    OR brand_name ILIKE $2
                    OR category_name ILIKE $2
                ORDER BY 
                    CASE 
                        WHEN title ILIKE $2 THEN 1
                        WHEN brand_name ILIKE $2 THEN 2
                        WHEN category_name ILIKE $2 THEN 3
                        ELSE 4
                    END,
                    product_id DESC
                LIMIT 20;
            `;
            
            const result = await pool.query(searchQuery, [query, `%${query}%`]);
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error searching products:', error.message);
            res.status(500).json({ message: 'Failed to search products' });
        }
    }
}

export default SearchController;