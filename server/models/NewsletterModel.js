import { pool } from '../config/database.js';

class NewsletterModel {
  // Create newsletter table if it doesn't exist
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE
      );
    `;
    await pool.query(query);
  }

  // Add a new subscriber
  static async create(email) {
    const query = `
      INSERT INTO newsletter_subscribers (email)
      VALUES ($1)
      RETURNING *;
    `;
    const result = await pool.query(query, [email.toLowerCase()]);
    return result.rows[0];
  }

  // Find subscriber by email
  static async findByEmail(email) {
    const query = `
      SELECT * FROM newsletter_subscribers 
      WHERE email = $1 AND is_active = TRUE;
    `;
    const result = await pool.query(query, [email.toLowerCase()]);
    return result.rows[0];
  }

  // Delete subscriber by email (soft delete)
  static async deleteByEmail(email) {
    const query = `
      UPDATE newsletter_subscribers 
      SET is_active = FALSE 
      WHERE email = $1 AND is_active = TRUE
      RETURNING *;
    `;
    const result = await pool.query(query, [email.toLowerCase()]);
    return result.rows[0];
  }

  // Get all active subscribers
  static async getAll() {
    const query = `
      SELECT id, email, subscribed_at 
      FROM newsletter_subscribers 
      WHERE is_active = TRUE 
      ORDER BY subscribed_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Get subscriber count
  static async getCount() {
    const query = `
      SELECT COUNT(*) as count 
      FROM newsletter_subscribers 
      WHERE is_active = TRUE;
    `;
    const result = await pool.query(query);
    return parseInt(result.rows[0].count);
  }
}

// Initialize table on import
NewsletterModel.createTable().catch(console.error);

export default NewsletterModel; 