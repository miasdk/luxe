/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search products
 *     description: Search for products across the marketplace using various criteria
 *     tags: [Search]
 *     parameters:
 *       - name: q
 *         in: query
 *         description: Search query string
 *         schema:
 *           type: string
 *           example: "vintage jacket"
 *       - name: category
 *         in: query
 *         description: Filter by category
 *         schema:
 *           type: string
 *           example: "clothing"
 *       - name: brand
 *         in: query
 *         description: Filter by brand
 *         schema:
 *           type: string
 *           example: "nike"
 *       - name: min_price
 *         in: query
 *         description: Minimum price filter
 *         schema:
 *           type: number
 *           format: decimal
 *           example: 10.00
 *       - name: max_price
 *         in: query
 *         description: Maximum price filter
 *         schema:
 *           type: number
 *           format: decimal
 *           example: 100.00
 *       - name: limit
 *         in: query
 *         description: Maximum number of results to return
 *         schema:
 *           type: integer
 *           example: 20
 *       - name: offset
 *         in: query
 *         description: Number of results to skip (for pagination)
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: integer
 *                   description: Total number of products matching search criteria
 *                   example: 25
 *                 query:
 *                   type: string
 *                   description: The search query that was performed
 *                   example: "vintage jacket"
 *       400:
 *         description: Invalid search parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
import express from 'express';
import SearchController from '../controllers/SearchController.js';

const router = express.Router();

// Search products
router.get('/', SearchController.searchProducts);

export default router;