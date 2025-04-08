import { pool } from '../config/database.js';

class UserModel { 
    //Create or update an existing user based on the provided Firebase UID
    static async createOrUpdateUser(uid, email, display_name, photo_url, updated_at) {
        const query = `
            INSERT INTO users (uid, email, display_name, photo_url, updated_at)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (uid) DO UPDATE
            SET email = EXCLUDED.email,
                display_name = EXCLUDED.display_name,
                photo_url = EXCLUDED.photo_url,
                updated_at = EXCLUDED.updated_at
            RETURNING *;
        `;
        const values = [uid, email, display_name, photo_url, updated_at || new Date().toISOString()];

        try {
            const result = await pool.query(query, values);
            console.log("User synced:", result.rows[0]);
            return result.rows[0];
        }
        catch (error) {
            console.error("Failed to sync user:", error.message);
            throw new Error("Failed to sync user: " + error.message);
        }
    }

    static async getUserById(userId) {
        const query = `SELECT * FROM users WHERE id = $1;`;
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    }
    // Retrieve all users
    static async getAllUsers() {
        const query = `SELECT * FROM users;`;
        const result = await pool.query(query);
        return result.rows;
    }   

    // Delete a user by ID
    static async deleteUserById(userId) {
        const query = `DELETE FROM users WHERE id = $1 RETURNING *;`;
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    }
}

export default UserModel;