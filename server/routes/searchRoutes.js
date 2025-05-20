import express from 'express';
import SearchController from '../controllers/SearchController.js';

const router = express.Router();

// Search products
router.get('/', SearchController.searchProducts);

export default router;