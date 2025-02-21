import ProductService from "../services/ProductService.js";

class ProductController {
    
    // Get all products
    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching all products:", error);
            res.status(500).json({ message: "Failed to retrieve products" });
        }
    }

    // Get product by ID
    static async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await ProductService.getProductById(id);
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.status(200).json(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            res.status(500).json({ message: "Failed to retrieve product" });
        }
    }

    //  Get products by category
    static async getProductsByCategory(req, res) {
        const { category } = req.params;
        try {
            const products = await ProductService.getProductsByCategory(category);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            res.status(500).json({ message: "Failed to retrieve products" });
        }
    }

    // Get products by filters (Category, Size, Color, Condition)
    static async getProductsByFilters(req, res) {
        const filters = req.query; // Fix: Filters should come from `req.query`, not `req.body`
        const { sortBy = "name", sortOrder = "ASC" } = req.query; // Default sorting parameters
        try {
            const products = await ProductService.getProductsByFilters(filters, sortBy, sortOrder);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error filtering products:", error);
            res.status(500).json({ message: "Failed to retrieve filtered products" });
        }
    }

    // Get product by title
    static async getProductByTitle(req, res) {
        const { title } = req.params;
        try {
            const product = await ProductService.getProductByTitle(title);
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.status(200).json(product);
        } catch (error) {
            console.error("Error fetching product by title:", error);
            res.status(500).json({ message: "Failed to retrieve product" });
        }
    }

    // ✅ Add a new product
    static async addProduct(req, res) {
        try {
            const newProduct = await ProductService.addProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ message: "Failed to add product" });
        }
    }

    // ✅ Update product
    static async updateProduct(req, res) {
        const { id } = req.params;
        try {
            const updatedProduct = await ProductService.updateProduct(id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ message: "Failed to update product" });
        }
    }

    // ✅ Delete product
    static async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const deletedProduct = await ProductService.deleteProduct(id);
            if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Failed to delete product" });
        }
    }
}

export default ProductController;
