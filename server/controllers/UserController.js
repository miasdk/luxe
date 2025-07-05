import UserService from '../services/UserService.js';

class UserController {
    static async handleFirebaseLogin(req, res) {
        try {
            const firebaseUser = req.user; // Assuming the user is set in the request by middleware
            const user = await UserService.syncUser(firebaseUser);
            res.status(200).json(user);
        } catch (error) {
            console.error("Error syncing user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await UserService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async deleteUserById(req, res) {
        const userId = req.params.id;
        try {
            const deletedUser = await UserService.deleteUserById(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(deletedUser);
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async handleRegistration(req, res) {
        try {
            const user = await UserService.syncUser({
                uid: req.body.uid,
                email: req.body.email,
                display_name: req.body.display_name || null,
                photo_url: req.body.photo_url || null,
            });
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({
                message: error.message || "Failed to register user",
            });
        }
    }
}

export default UserController;