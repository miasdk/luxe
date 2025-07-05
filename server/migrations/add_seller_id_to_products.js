/**
 * Migration to add seller_id field to products table
 * This allows tracking which user created each product listing
 */

import { pool } from '../config/database.js';

const addSellerIdToProducts = async () => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        // Add seller_id column to products table
        const addColumnQuery = `
            ALTER TABLE products 
            ADD COLUMN IF NOT EXISTS seller_id TEXT REFERENCES users(uid) ON DELETE CASCADE;
        `;
        
        await client.query(addColumnQuery);
        console.log('✅ Added seller_id column to products table');
        
        // Update the product_details view to include seller information
        const updateViewQuery = `
            DROP VIEW IF EXISTS product_details CASCADE;
            
            CREATE VIEW product_details AS
            SELECT 
                p.id AS product_id,
                p.title,
                p.price,
                p.description,
                p.image,
                p.num_likes,
                p.created_at,
                p.seller_id,
                b.name AS brand_name,
                c.name AS category_name,
                ARRAY_AGG(DISTINCT col.name) FILTER (WHERE col.name IS NOT NULL) AS colors,
                ARRAY_AGG(DISTINCT s.name) FILTER (WHERE s.name IS NOT NULL) AS sizes,
                ARRAY_AGG(DISTINCT cond.name) FILTER (WHERE cond.name IS NOT NULL) AS conditions,
                p.search_vector
            FROM products p
            LEFT JOIN brands b ON p.brand_id = b.id
            LEFT JOIN categories c ON p.category_id = c.id
            LEFT JOIN product_colors pc ON p.id = pc.product_id
            LEFT JOIN colors col ON pc.color_id = col.color_id
            LEFT JOIN product_sizes ps ON p.id = ps.product_id
            LEFT JOIN sizes s ON ps.size_id = s.size_id
            LEFT JOIN product_conditions pcon ON p.id = pcon.product_id
            LEFT JOIN conditions cond ON pcon.condition_id = cond.conditions_id
            GROUP BY p.id, p.title, p.price, p.description, p.image, p.num_likes, p.created_at, p.seller_id, b.name, c.name, p.search_vector
            ORDER BY p.created_at DESC;
        `;
        
        await client.query(updateViewQuery);
        console.log('✅ Updated product_details view to include seller_id');
        
        await client.query('COMMIT');
        console.log('✅ Migration completed successfully');
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Migration failed:', error.message);
        throw error;
    } finally {
        client.release();
    }
};

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    addSellerIdToProducts()
        .then(() => {
            console.log('Migration completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}

export default addSellerIdToProducts; 