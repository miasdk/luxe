import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

// Route to get products by category
router.get('/category/:category', ProductController.getProductsByCategory);

// Route to search products by title
router.get('/search', ProductController.searchProductsByTitle);

// Route to filter products by criteria
router.get('/filter', ProductController.getProductsByFilters);

// Route to get a product by ID
router.get('/:id', ProductController.getProductById);

// Route to get all products
router.get('/', ProductController.getAllProducts);

// Route to add a new product
router.post('/', ProductController.addProduct);

// Route to update a product by ID
router.put('/:id', ProductController.updateProduct);

// Route to delete a product by ID
router.delete('/:id', ProductController.deleteProduct);

export default router;