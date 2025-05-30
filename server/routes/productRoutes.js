/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         product_id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "iPhone 14 Pro"
 *         price:
 *           type: number
 *           example: 999.99
 *         description:
 *           type: string
 *           example: "Latest iPhone"
 *         image:
 *           type: string
 *           example: "https://example.com/image.jpg"
 *         brand_name:
 *           type: string
 *           example: "Apple"
 *         category_name:
 *           type: string
 *           example: "Electronics"
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
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