import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

// Specific fixed-path routes should come FIRST
router.get('/categories-with-count', ProductController.getCategoriesWithCount);
router.get('/filter-options', ProductController.getFilterOptions);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/search', ProductController.searchProductsByTitle);
router.get('/filter', ProductController.getProductsByFilters);

// Root route
router.get('/', ProductController.getAllProducts);

// Parameter routes should come LAST
router.get('/:id', ProductController.getProductById);

// Other methods
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;