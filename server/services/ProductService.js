const ProductModel = require('../models/ProductModel'); // Or import if using modules

class ProductService {
    async getAllProducts() { // Corrected method name
        try {
            return await ProductModel.getAllProducts(); 
        } catch (error) {
            console.error('ProductService.getAllProducts(): Error:', error.message);
            throw error; // No need to wrap in a new Error unless you want to add info
        }
    }

    async getProductById(productId) {
        try {
            return await ProductModel.getProductById(productId);
        } catch (error) {
            console.error('ProductService.getProductById(): Error:', error.message);
            throw error;
        }
    }

    async getProductsByCategory(category) { // Added missing method
        try {
            return await ProductModel.getProductsByCategory(category);
        } catch (error) {
            console.error('ProductService.getProductsByCategory(): Error:', error.message);
            throw error;
        }
    }

    async getProductsByFilters(filters, sortBy, sortOrder) { // Added missing method
        try {
            return await ProductModel.getProductsByFilters(filters, sortBy, sortOrder);
        } catch (error) {
            console.error('ProductService.getProductsByFilters(): Error:', error.message);
            throw error;
        }
    }

    async getProductByTitle(title) { // Added missing method
        try {
            return await ProductModel.getProductByTitle(title);
        } catch (error) {
            console.error('ProductService.getProductByTitle(): Error:', error.message);
            throw error;
        }
    }

    async addProduct(product) {
        try {
            // Validation can go here
            return await ProductModel.addProduct(product);
        } catch (error) {
            console.error('ProductService.addProduct(): Error:', error.message);
            throw error;
        }
    }

    async updateProduct(productId, product) {
        try {
            // Validation can go here
            return await ProductModel.updateProduct(productId, product);
        } catch (error) {
            console.error('ProductService.updateProduct(): Error:', error.message);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            return await ProductModel.deleteProduct(productId);
        } catch (error) {
            console.error('ProductService.deleteProduct(): Error:', error.message);
            throw error;
        }
    }
}

module.exports = new ProductService();