/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products in the marketplace
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the marketplace (requires authentication)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, price, brand_id, category_id, seller_id]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Vintage Leather Jacket"
 *               price:
 *                 type: number
 *                 format: decimal
 *                 example: 89.99
 *               description:
 *                 type: string
 *                 example: "Authentic vintage leather jacket in excellent condition"
 *               brand_id:
 *                 type: integer
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/image.jpg"
 *               seller_id:
 *                 type: string
 *                 example: "firebase_user_123"
 *               color_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               size_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1, 2]
 *               condition_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - invalid or missing authentication token
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
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve detailed information about a specific product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
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
 *   put:
 *     summary: Update product
 *     description: Update an existing product (requires authentication and ownership)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Vintage Leather Jacket"
 *               price:
 *                 type: number
 *                 format: decimal
 *                 example: 99.99
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               brand_id:
 *                 type: integer
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               image:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/updated-image.jpg"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
 *       404:
 *         description: Product not found
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
 *   delete:
 *     summary: Delete product
 *     description: Delete a product from the marketplace (requires authentication and ownership)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Product not found
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
 * /products/filter:
 *   get:
 *     summary: Get filtered products
 *     description: Retrieve products based on various filter criteria
 *     tags: [Products]
 *     parameters:
 *       - name: category_id
 *         in: query
 *         description: Filter by category ID
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: brand_id
 *         in: query
 *         description: Filter by brand ID
 *         schema:
 *           type: integer
 *           example: 1
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
 *       - name: color_ids
 *         in: query
 *         description: Filter by color IDs (comma-separated)
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *       - name: size_ids
 *         in: query
 *         description: Filter by size IDs (comma-separated)
 *         schema:
 *           type: string
 *           example: "1,2"
 *       - name: condition_ids
 *         in: query
 *         description: Filter by condition IDs (comma-separated)
 *         schema:
 *           type: string
 *           example: "1"
 *       - name: limit
 *         in: query
 *         description: Maximum number of products to return
 *         schema:
 *           type: integer
 *           example: 20
 *       - name: offset
 *         in: query
 *         description: Number of products to skip (for pagination)
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Filtered products retrieved successfully
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
 *                   description: Total number of products matching filters
 *                   example: 150
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products by title
 *     description: Search for products using full-text search on product titles
 *     tags: [Products]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query string
 *         schema:
 *           type: string
 *           example: "leather jacket"
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Missing search query
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
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     description: Retrieve all products in a specific category
 *     tags: [Products]
 *     parameters:
 *       - name: category
 *         in: path
 *         required: true
 *         description: Category name or ID
 *         schema:
 *           type: string
 *           example: "dresses"
 *     responses:
 *       200:
 *         description: Products in category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: Category not found
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
 * /products/seller/{sellerId}:
 *   get:
 *     summary: Get products by seller
 *     description: Retrieve all products listed by a specific seller
 *     tags: [Products]
 *     parameters:
 *       - name: sellerId
 *         in: path
 *         required: true
 *         description: Seller Firebase UID
 *         schema:
 *           type: string
 *           example: "firebase_user_123"
 *     responses:
 *       200:
 *         description: Seller products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /products/categories-with-count:
 *   get:
 *     summary: Get categories with product counts
 *     description: Retrieve all categories along with the number of products in each
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Categories with counts retrieved successfully
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
 *                     example: "Dresses"
 *                   product_count:
 *                     type: integer
 *                     example: 25
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'

/**
 * @swagger
 * /products/filter-options:
 *   get:
 *     summary: Get available filter options
 *     description: Retrieve all available filter options (brands, categories, colors, sizes, conditions)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Filter options retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 brands:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Brand'
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Black"
 *                 sizes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Small"
 *                 conditions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "New with tags"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/categories-with-count', ProductController.getCategoriesWithCount);
router.get('/filter-options', ProductController.getFilterOptions);
router.get('/category/:category', ProductController.getProductsByCategory);
router.get('/seller/:sellerId', async (req, res) => {
    const ProductService = (await import('../services/ProductService.js')).default;
    const productService = new ProductService();
    const { sellerId } = req.params;
    try {
        const products = await productService.getProductsBySeller(sellerId);
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by seller:", error);
        res.status(500).json({ message: "Failed to retrieve seller products" });
    }
});
router.get('/search', ProductController.searchProductsByTitle);
router.get('/filter', ProductController.getProductsByFilters);

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

// Other methods
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;

//update the ProductController.js file to include the new method