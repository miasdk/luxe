import CategoryModel from "../models/CategoryModel.js";

class CategoryService {
    async getAllCategories() {
        try {
            return await CategoryModel.getAllCategories();
        } catch (error) {
            console.error("CategoryService.getAllCategories():", error.message);
            throw error;
        }
    }

    async getCategoryById(categoryId) {
        try {
            return await CategoryModel.getCategoryById(categoryId);
        } catch (error) {
            console.error("CategoryService.getCategoryById():", error.message);
            throw error;
        }
    }
}

export default new CategoryService();
