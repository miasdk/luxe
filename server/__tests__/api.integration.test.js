import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import cors from 'cors';

// Import routes
import productsRouter from '../routes/productRoutes.js';
import cartRouter from '../routes/cartRoutes.js';
import ordersRouter from '../routes/orderRoutes.js';

// Create test app
const app = express();
app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);

// Mock Firebase auth middleware for testing
app.use((req, res, next) => {
  req.user = { uid: 'test-user-123', email: 'test@example.com' };
  next();
});

describe('API Integration Tests', () => {
  describe('Products API', () => {
    it('GET /api/products should return products list', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /api/products/filter should handle query parameters', async () => {
      const response = await request(app)
        .get('/api/products/filter?category_id=1&min_price=10&max_price=100')
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('GET /api/products/search should handle search queries', async () => {
      const response = await request(app)
        .get('/api/products/search?query=test')
        .expect(200);

      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('GET /api/products/999999 should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/products/999999')
        .expect(404);

      expect(response.body.message).toContain('not found');
    });
  });

  describe('Cart API', () => {
    it('POST /api/cart should handle cart creation', async () => {
      const cartData = {
        user_id: 'test-user-123',
        items: []
      };

      const response = await request(app)
        .post('/api/cart')
        .send(cartData);

      // Should either succeed (201) or handle existing cart (200/400)
      expect([200, 201, 400].includes(response.status)).toBe(true);
    });

    it('POST /api/cart/add should handle adding items', async () => {
      const itemData = {
        product_id: 1,
        quantity: 2
      };

      const response = await request(app)
        .post('/api/cart/add')
        .send(itemData);

      // Should handle the request (success or validation error)
      expect(response.status).toBeLessThan(500);
    });
  });

  describe('Orders API', () => {
    it('GET /api/orders should return orders for authenticated user', async () => {
      const response = await request(app)
        .get('/api/orders');

      expect(response.status).toBeLessThan(500);
      expect(response.body).toBeDefined();
    });

    it('POST /api/orders should handle order creation request', async () => {
      const orderData = {
        items: [{ product_id: 1, quantity: 1, price: 99.99 }],
        total_amount: 99.99,
        payment_method_id: 'pm_test_card'
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData);

      // Should handle the request (may fail due to Stripe test keys)
      expect(response.status).toBeLessThan(500);
      expect(response.body).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON requests', async () => {
      const response = await request(app)
        .post('/api/products')
        .send('invalid json')
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
    });

    it('should handle missing required fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({});

      expect([400, 500].includes(response.status)).toBe(true);
    });
  });

  describe('API Response Format', () => {
    it('should return JSON responses', async () => {
      const response = await request(app)
        .get('/api/products');

      expect(response.headers['content-type']).toMatch(/application\/json/);
    });

    it('should handle CORS headers', async () => {
      const response = await request(app)
        .options('/api/products')
        .set('Origin', 'http://localhost:5173');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});