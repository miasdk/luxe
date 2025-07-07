/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get all brands
 *     description: Retrieve a list of all brands in the marketplace
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Brands retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Create a new brand
 *     description: Add a new brand to the marketplace (admin only)
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nike"
 *               image:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/nike-logo.jpg"
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
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

/**
 * @swagger
 * /brands/{brandId}:
 *   get:
 *     summary: Get brand by ID
 *     description: Retrieve detailed information about a specific brand
 *     tags: [Brands]
 *     parameters:
 *       - name: brandId
 *         in: path
 *         required: true
 *         description: Brand ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Brand details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Brand not found
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

/**
 * @swagger
 * /brands/brands-with-count:
 *   get:
 *     summary: Get brands with product counts
 *     description: Retrieve all brands along with the number of products for each brand
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Brands with counts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Nike"
 *                   image:
 *                     type: string
 *                     format: url
 *                     example: "https://example.com/nike-logo.jpg"
 *                   product_count:
 *                     type: integer
 *                     example: 42
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /brands/find-or-create:
 *   post:
 *     summary: Find or create brand
 *     description: Find an existing brand by name or create a new one if it doesn't exist
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Adidas"
 *               image:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/adidas-logo.jpg"
 *     responses:
 *       200:
 *         description: Brand found or created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brand:
 *                   $ref: '#/components/schemas/Brand'
 *                 created:
 *                   type: boolean
 *                   description: Whether a new brand was created
 *                   example: true
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
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
import BrandController from '../controllers/BrandController.js';

const router = express.Router();

// Route to get brands with count (must be BEFORE the /:brandId route)
router.get('/brands-with-count', BrandController.getBrandsWithCount);

// Route to create a new brand
router.post('/', BrandController.createBrand);

// Route to find or create a brand
router.post('/find-or-create', BrandController.findOrCreateBrand);

// Route to get all brands
router.get('/', BrandController.getAllBrands);

// Route to get a brand by ID
router.get('/:brandId', BrandController.getBrandById);

export default router;