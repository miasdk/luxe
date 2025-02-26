import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productData from '../data/products.js';
import ProductsController from '../controllers/products.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(productData);
})

router.get('/:productId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/product.html'));
})

router.get('/', ProductsController.getProducts);
export default router; 
