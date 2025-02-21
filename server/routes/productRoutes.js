import express from 'express';
import ProductController from '../controllers/ProductController.js'; // Ensure `.js` is included for ES Modules

const router = express.Router();

// Routes for Fetching Products
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/filter', ProductController.getProductsByFilters);
router.get('/title/:title', ProductController.getProductByTitle);

// Routes for Managing Products
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;
