import ProductModel from '../models/ProductModel.js';

class ProductService {
    async getAllProducts() { 
        try {
            return await ProductModel.getAllProducts(); 
        } catch (error) {
            console.error('ProductService.getAllProducts(): Error:', error.message);
            throw error; 
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

    async getProductsByCategory(category) {
        try {
            return await ProductModel.getProductsByCategory(category);
        } catch (error) {
            console.error('ProductService.getProductsByCategory(): Error:', error.message);
            throw error;
        }
    }

    async getProductsBySeller(sellerId) {
        try {
            return await ProductModel.getProductsBySeller(sellerId);
        } catch (error) {
            console.error('ProductService.getProductsBySeller(): Error:', error.message);
            throw error;
        }
    }

    async getFilterOptions(category) {
    try {
        return await ProductModel.getFilterOptions(category);
    } catch (error) {
        console.error('ProductService.getFilterOptions(): Error:', error.message);
        throw error;
    }
    }

    async getCategoriesWithCount() {
        try {
            return await ProductModel.getCategoriesWithCount();
        } catch (error) {
            console.error('ProductService.getCategoriesWithCount(): Error:', error.message);
            throw error;
        }
    }

    async getProductsByFilters(filters, sortBy, sortOrder) { 
        try {
            return await ProductModel.getProductsByFilters(filters, sortBy, sortOrder);
        } catch (error) {
            console.error('ProductService.getProductsByFilters(): Error:', error.message);
            throw error;
        }
    }

    async searchProductsByTitle(keyword) { 
        try {
            return await ProductModel.searchProductsByTitle(keyword);
        } catch (error) {
            console.error('ProductService.searchProductsByTitle(): Error:', error.message);
            throw error;
        }
    }

    async addProduct(product) {
        try {
            return await ProductModel.addProduct(product);
        } catch (error) {
            console.error('ProductService.addProduct(): Error:', error.message);
            throw error;
        }
    }

    async updateProduct(productId, product) {
        try {
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

export default ProductService;