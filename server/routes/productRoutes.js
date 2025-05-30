import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/categories-with-count', ProductController.getCategoriesWithCount);
router.get('/filter-options', ProductController.getFilterOptions);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/search', ProductController.searchProductsByTitle);
router.get('/filter', ProductController.getProductsByFilters);

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

// Other methods
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;