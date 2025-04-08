import UserModel from '../models/UserModel.js';

class UserService { 
    // Create or update a user in the database
    static async syncUser(firebaseUser) {
        const {
            uid, 
            email, 
            display_name, 
            photo_url,
            metadata
        } = firebaseUser;
        console.log('🔄 Syncing user:', { uid, email, display_name });
        const updated_at = metadata?.lastRefreshTime || new Date().toISOString();

        const user = await UserModel.createOrUpdateUser(
            uid, 
            email, 
            display_name, 
            photo_url,
            updated_at
        );
        return user;
    }

    // Retrieve a user by ID
    static async getUserById(userId) {
        const user = await UserModel.getUserById(userId);
        return user;
    }

    // Retrieve all users
    static async getAllUsers() {
        const users = await UserModel.getAllUsers();
        return users;
    }

    // Delete a user by ID
    static async deleteUserById(userId) {
        const user = await UserModel.deleteUserById(userId);
        return user;
    }

}

export default UserService;