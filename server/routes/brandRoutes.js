import express from 'express';
import BrandController from '../controllers/BrandController.js';

const router = express.Router();

// Route to get brands with count (must be BEFORE the /:brandId route)
router.get('/brands-with-count', BrandController.getBrandsWithCount);

// Route to get all brands
router.get('/', BrandController.getAllBrands);

// Route to get a brand by ID
router.get('/:brandId', BrandController.getBrandById);

export default router;