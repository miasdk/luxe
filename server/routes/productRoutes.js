import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

// Routes for Fetching Products
router.get('/category/:category', ProductController.getProductsByCategory); // More specific routes first
router.get('/search', ProductController.searchProductsByTitle);
router.get('/filter', ProductController.getProductsByFilters);
router.get('/:id', ProductController.getProductById);
router.get('/', ProductController.getAllProducts);

// Routes for Managing Products
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;