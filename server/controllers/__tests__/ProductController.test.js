import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductController from '../ProductController.js';

// Mock the ProductService
vi.mock('../../services/ProductService.js', () => {
  const mockProductService = {
    getAllProducts: vi.fn(),
    getProductById: vi.fn(),
    addProduct: vi.fn()
  };
  return {
    default: mockProductService
  };
});

describe('ProductController', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      query: {}
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products successfully', async () => {
      const mockProducts = [
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' }
      ];

      // Import the mocked service
      const ProductService = await import('../../services/ProductService.js');
      ProductService.default.getAllProducts.mockResolvedValue(mockProducts);

      await ProductController.getAllProducts(mockReq, mockRes);

      expect(ProductService.default.getAllProducts).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle errors when fetching products', async () => {
      const error = new Error('Database error');
      const ProductService = await import('../../services/ProductService.js');
      ProductService.default.getAllProducts.mockRejectedValue(error);

      await ProductController.getAllProducts(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Failed to retrieve products'
      });
    });
  });

  describe('getProductById', () => {
    it('should return a product by id successfully', async () => {
      const mockProduct = { id: 1, title: 'Product 1' };
      mockReq.params.id = '1';

      const ProductService = await import('../../services/ProductService.js');
      ProductService.default.getProductById.mockResolvedValue(mockProduct);

      await ProductController.getProductById(mockReq, mockRes);

      expect(ProductService.default.getProductById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should handle product not found', async () => {
      mockReq.params.id = '999';
      const ProductService = await import('../../services/ProductService.js');
      ProductService.default.getProductById.mockResolvedValue(null);

      await ProductController.getProductById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Product not found'
      });
    });
  });

  describe('addProduct', () => {
    it('should add a new product successfully', async () => {
      const newProduct = {
        title: 'New Product',
        price: 99.99,
        description: 'Test description'
      };
      mockReq.body = newProduct;

      const mockAddedProduct = { id: 1, ...newProduct };
      const ProductService = await import('../../services/ProductService.js');
      ProductService.default.addProduct.mockResolvedValue(mockAddedProduct);

      await ProductController.addProduct(mockReq, mockRes);

      expect(ProductService.default.addProduct).toHaveBeenCalledWith(newProduct);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockAddedProduct);
    });

    it('should handle validation errors', async () => {
      mockReq.body = { title: '' }; // Invalid product data

      await ProductController.addProduct(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Invalid product data'
      });
    });
  });
}); 