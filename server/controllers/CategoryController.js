import CategoryService from "../services/CategoryService.js";

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error("Error fetching categories:", error.message);
            res.status(500).json({ error: "Failed to retrieve categories" });
        }
    }

    static async getCategoryById(req, res) {
        const { id } = req.params;
        try {
            const category = await CategoryService.getCategoryById(id);
            if (!category) {
                return res.status(404).json({ error: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error("Error fetching category by ID:", error.message);
            res.status(500).json({ error: "Failed to retrieve category" });
        }
    }
}

export default CategoryController;
