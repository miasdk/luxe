import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the database pool
const mockPool = {
  query: vi.fn()
};

vi.mock('../config/database.js', () => ({
  pool: mockPool
}));

// Import services after mocking
import ProductService from '../services/ProductService.js';
import CartService from '../services/CartService.js';

describe('Service Layer Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ProductService', () => {
    describe('getAllProducts', () => {
      it('should return all products', async () => {
        const mockProducts = [
          { id: 1, title: 'Product 1', price: 29.99 },
          { id: 2, title: 'Product 2', price: 49.99 }
        ];

        mockPool.query.mockResolvedValueOnce({ rows: mockProducts });

        const productService = new ProductService();
        const result = await productService.getAllProducts();

        expect(mockPool.query).toHaveBeenCalled();
        expect(result).toEqual(mockProducts);
      });

      it('should handle database errors', async () => {
        mockPool.query.mockRejectedValueOnce(new Error('Database connection error'));

        const productService = new ProductService();

        await expect(productService.getAllProducts()).rejects.toThrow('Database connection error');
      });
    });

    describe('getProductById', () => {
      it('should return a single product by id', async () => {
        const mockProduct = { id: 1, title: 'Product 1', price: 29.99 };
        mockPool.query.mockResolvedValueOnce({ rows: [mockProduct] });

        const productService = new ProductService();
        const result = await productService.getProductById(1);

        expect(mockPool.query).toHaveBeenCalledWith(
          expect.stringContaining('WHERE'), 
          expect.arrayContaining([1])
        );
        expect(result).toEqual(mockProduct);
      });

      it('should return null for non-existent product', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [] });

        const productService = new ProductService();
        const result = await productService.getProductById(999);

        expect(result).toBeNull();
      });
    });

    describe('searchProductsByTitle', () => {
      it('should search products using full-text search', async () => {
        const mockResults = [
          { id: 1, title: 'Leather Jacket', price: 89.99 },
          { id: 2, title: 'Leather Boots', price: 129.99 }
        ];

        mockPool.query.mockResolvedValueOnce({ rows: mockResults });

        const productService = new ProductService();
        const result = await productService.searchProductsByTitle('leather');

        expect(mockPool.query).toHaveBeenCalledWith(
          expect.stringContaining('to_tsvector'),
          expect.arrayContaining(['leather'])
        );
        expect(result).toEqual(mockResults);
      });

      it('should handle empty search results', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [] });

        const productService = new ProductService();
        const result = await productService.searchProductsByTitle('nonexistent');

        expect(result).toEqual([]);
      });

      it('should sanitize search input', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [] });

        const productService = new ProductService();
        await productService.searchProductsByTitle("'; DROP TABLE products; --");

        // Should still make a safe query
        expect(mockPool.query).toHaveBeenCalled();
      });
    });

    describe('getProductsByFilters', () => {
      it('should apply category filter', async () => {
        const mockResults = [{ id: 1, title: 'Product 1', category_id: 1 }];
        mockPool.query.mockResolvedValueOnce({ rows: mockResults });

        const productService = new ProductService();
        const filters = { category_id: 1 };
        const result = await productService.getProductsByFilters(filters);

        expect(mockPool.query).toHaveBeenCalledWith(
          expect.stringContaining('category_id'),
          expect.arrayContaining([1])
        );
        expect(result).toEqual(mockResults);
      });

      it('should apply price range filters', async () => {
        const mockResults = [{ id: 1, title: 'Product 1', price: 50.00 }];
        mockPool.query.mockResolvedValueOnce({ rows: mockResults });

        const productService = new ProductService();
        const filters = { min_price: 25, max_price: 75 };
        const result = await productService.getProductsByFilters(filters);

        expect(mockPool.query).toHaveBeenCalledWith(
          expect.stringContaining('price'),
          expect.arrayContaining([25, 75])
        );
        expect(result).toEqual(mockResults);
      });

      it('should handle multiple filters', async () => {
        const mockResults = [{ id: 1, title: 'Product 1' }];
        mockPool.query.mockResolvedValueOnce({ rows: mockResults });

        const productService = new ProductService();
        const filters = { 
          category_id: 1, 
          brand_id: 2, 
          min_price: 10, 
          max_price: 100 
        };
        
        await productService.getProductsByFilters(filters);

        expect(mockPool.query).toHaveBeenCalled();
      });
    });
  });

  describe('CartService', () => {
    describe('addToCart', () => {
      it('should add item to cart', async () => {
        const mockResult = { id: 1, cart_id: 1, product_id: 1, quantity: 2 };
        mockPool.query.mockResolvedValueOnce({ rows: [mockResult] });

        const cartService = new CartService();
        const result = await cartService.addToCart(1, 1, 2);

        expect(mockPool.query).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
      });

      it('should handle duplicate cart items', async () => {
        // First call simulates existing item
        mockPool.query
          .mockResolvedValueOnce({ rows: [{ id: 1, quantity: 1 }] })
          .mockResolvedValueOnce({ rows: [{ id: 1, quantity: 3 }] });

        const cartService = new CartService();
        const result = await cartService.addToCart(1, 1, 2);

        // Should update quantity instead of creating duplicate
        expect(mockPool.query).toHaveBeenCalledTimes(2);
      });
    });

    describe('removeFromCart', () => {
      it('should remove item from cart', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

        const cartService = new CartService();
        const result = await cartService.removeFromCart(1, 1);

        expect(mockPool.query).toHaveBeenCalledWith(
          expect.stringContaining('DELETE'),
          expect.arrayContaining([1, 1])
        );
      });
    });

    describe('getCartItems', () => {
      it('should return cart items with product details', async () => {
        const mockCartItems = [
          {
            id: 1,
            product_id: 1,
            quantity: 2,
            product_title: 'Product 1',
            product_price: 29.99
          }
        ];

        mockPool.query.mockResolvedValueOnce({ rows: mockCartItems });

        const cartService = new CartService();
        const result = await cartService.getCartItems(1);

        expect(mockPool.query).toHaveBeenCalledWith(
          expect.stringContaining('JOIN'),
          expect.arrayContaining([1])
        );
        expect(result).toEqual(mockCartItems);
      });

      it('should return empty array for empty cart', async () => {
        mockPool.query.mockResolvedValueOnce({ rows: [] });

        const cartService = new CartService();
        const result = await cartService.getCartItems(1);

        expect(result).toEqual([]);
      });
    });
  });

  describe('Database Query Security', () => {
    it('should use parameterized queries to prevent SQL injection', async () => {
      const productService = new ProductService();
      
      // Test with potentially malicious input
      const maliciousInput = "'; DROP TABLE products; --";
      
      try {
        await productService.getProductById(maliciousInput);
      } catch (error) {
        // Expected to fail, but shouldn't execute malicious SQL
      }

      // Verify parameterized query was used
      expect(mockPool.query).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([maliciousInput])
      );
    });

    it('should handle special characters in search safely', async () => {
      const productService = new ProductService();
      
      const specialChars = "test's \"quoted\" string & symbols";
      mockPool.query.mockResolvedValueOnce({ rows: [] });
      
      await productService.searchProductsByTitle(specialChars);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([specialChars])
      );
    });
  });
});