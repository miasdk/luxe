import ProductService from "../services/ProductService.js";

class ProductController {
    static async getAllProducts(req, res) {
        const productService = new ProductService();
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching all products:", error);
            res.status(500).json({ message: "Failed to retrieve products" });
        }
    }

    static async getProductById(req, res) {
        const productService = new ProductService();
        const { id } = req.params;
        try {
            const product = await productService.getProductById(id);
            if (!product) return res.status(404).json({ message: "Product not found" });
            res.status(200).json(product);
        } catch (error) {
            console.error("Error fetching product by ID:", error);
            res.status(500).json({ message: "Failed to retrieve product" });
        }
    }

    static async getProductsByCategory(req, res) {
        const productService = new ProductService();
        const { category } = req.params;
        try {
            const products = await productService.getProductsByCategory(category);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            res.status(500).json({ message: "Failed to retrieve products" });
        }
    }

    static async getProductsByFilters(req, res) {
        const productService = new ProductService();
        const filters = req.query;
        const { sortBy = "title", sortOrder = "ASC" } = req.query;
        try {
            const products = await productService.getProductsByFilters(filters, sortBy, sortOrder);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error filtering products:", error);
            res.status(500).json({ message: "Failed to retrieve filtered products" });
        }
    }

    static async searchProductsByTitle(req, res) {
        const productService = new ProductService();
        const { keyword } = req.query;
        try {
            const products = await productService.searchProductsByTitle(keyword);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error searching products by title:", error);
            res.status(500).json({ error: error.message });
        }
    }
    
    static async addProduct(req, res) {
        const productService = new ProductService();
        try {
            const newProduct = await productService.addProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            console.error("Error adding product:", error);
            res.status(500).json({ message: "Failed to add product" });
        }
    }

   static async updateProduct(req, res) {
    const productService = new ProductService();
    const { id } = req.params;
    
    try {
        console.log("Update request for product ID:", id);
        console.log("Request body:", req.body);
        
        const updatedProduct = await productService.updateProduct(id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ 
        message: "Failed to update product",
        error: error.message 
        });
    }
    }

    static async deleteProduct(req, res) {
        const productService = new ProductService();
        const { id } = req.params;
        try {
            const deletedProduct = await productService.deleteProduct(id);
            if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ message: "Failed to delete product" });
        }
    }

    static async getFilterOptions(req, res) {
    const productService = new ProductService();
    const { category } = req.query;
    try {
        const filterOptions = await productService.getFilterOptions(category);
        res.status(200).json(filterOptions);
    } catch (error) {
        console.error("Error fetching filter options:", error);
        res.status(500).json({ message: "Failed to retrieve filter options" });
    }
    }

    static async getCategoriesWithCount(req, res) {
        const productService = new ProductService();
        try {
            const categories = await productService.getCategoriesWithCount();
            res.status(200).json(categories);
        } catch (error) {
            console.error("Error fetching categories with count:", error);
            res.status(500).json({ message: "Failed to retrieve categories" });
        }
    }
}

export default ProductController;
