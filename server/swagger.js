import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Luxe Marketplace API',
      version: '1.0.0',
      description: 'A comprehensive luxury marketplace API built with Node.js, Express, and PostgreSQL. Features user authentication, product management, shopping cart, order processing, and payment integration.',
      contact: {
        name: 'Luxe Development Team',
        email: 'api@luxemarketplace.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Development server'
      },
      {
        url: process.env.PRODUCTION_API_URL || 'https://ecart-mxsk.onrender.com/api',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Firebase JWT',
          description: 'Firebase JWT token for authenticated requests'
        }
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['title', 'price', 'brand_id', 'category_id', 'seller_id'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique product identifier',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Product title',
              example: 'Vintage Leather Jacket'
            },
            price: {
              type: 'number',
              format: 'decimal',
              description: 'Product price in USD',
              example: 89.99
            },
            description: {
              type: 'string',
              description: 'Product description',
              example: 'Authentic vintage leather jacket in excellent condition'
            },
            brand_id: {
              type: 'integer',
              description: 'Brand identifier',
              example: 1
            },
            category_id: {
              type: 'integer',
              description: 'Category identifier',
              example: 1
            },
            image: {
              type: 'string',
              format: 'url',
              description: 'Product image URL',
              example: 'https://example.com/image.jpg'
            },
            seller_id: {
              type: 'string',
              description: 'Seller Firebase UID',
              example: 'firebase_user_123'
            },
            num_likes: {
              type: 'integer',
              description: 'Number of likes/favorites',
              example: 15
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp'
            },
            color_ids: {
              type: 'array',
              items: { type: 'integer' },
              description: 'Available color IDs'
            },
            size_ids: {
              type: 'array',
              items: { type: 'integer' },
              description: 'Available size IDs'
            },
            condition_ids: {
              type: 'array',
              items: { type: 'integer' },
              description: 'Product condition IDs'
            }
          }
        },
        Order: {
          type: 'object',
          required: ['user_id', 'status', 'total_amount'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique order identifier',
              example: 1
            },
            user_id: {
              type: 'string',
              description: 'User Firebase UID',
              example: 'firebase_user_123'
            },
            status: {
              type: 'string',
              enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
              description: 'Order status',
              example: 'confirmed'
            },
            total_amount: {
              type: 'number',
              format: 'decimal',
              description: 'Total order amount in USD',
              example: 149.99
            },
            shipping_address: {
              type: 'object',
              properties: {
                street: { type: 'string', example: '123 Main St' },
                city: { type: 'string', example: 'New York' },
                state: { type: 'string', example: 'NY' },
                zip_code: { type: 'string', example: '10001' },
                country: { type: 'string', example: 'USA' }
              }
            },
            payment_intent_id: {
              type: 'string',
              description: 'Stripe payment intent ID',
              example: 'pi_1234567890'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Order creation timestamp'
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Cart: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique cart identifier',
              example: 1
            },
            user_id: {
              type: 'string',
              description: 'User Firebase UID',
              example: 'firebase_user_123'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Cart creation timestamp'
            },
            items: {
              type: 'array',
              items: { '$ref': '#/components/schemas/CartItem' }
            }
          }
        },
        CartItem: {
          type: 'object',
          properties: {
            product_id: {
              type: 'integer',
              description: 'Product identifier',
              example: 1
            },
            quantity: {
              type: 'integer',
              minimum: 1,
              description: 'Item quantity',
              example: 2
            },
            product: {
              '$ref': '#/components/schemas/Product'
            }
          }
        },
        User: {
          type: 'object',
          properties: {
            uid: {
              type: 'string',
              description: 'Firebase user UID',
              example: 'firebase_user_123'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'user@example.com'
            },
            display_name: {
              type: 'string',
              description: 'User display name',
              example: 'John Doe'
            },
            photo_url: {
              type: 'string',
              format: 'url',
              description: 'User profile photo URL',
              example: 'https://example.com/profile.jpg'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp'
            }
          }
        },
        Brand: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique brand identifier',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Brand name',
              example: 'Nike'
            },
            image: {
              type: 'string',
              format: 'url',
              description: 'Brand logo URL',
              example: 'https://example.com/logo.jpg'
            }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique category identifier',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Category name',
              example: 'Dresses'
            }
          }
        },
        WishlistItem: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique wishlist item identifier',
              example: 1
            },
            user_id: {
              type: 'string',
              description: 'User Firebase UID',
              example: 'firebase_user_123'
            },
            product_id: {
              type: 'integer',
              description: 'Product identifier',
              example: 1
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Addition timestamp'
            },
            product: {
              '$ref': '#/components/schemas/Product'
            }
          }
        },
        Newsletter: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique subscription identifier',
              example: 1
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Subscriber email address',
              example: 'subscriber@example.com'
            },
            subscribed_at: {
              type: 'string',
              format: 'date-time',
              description: 'Subscription timestamp'
            },
            is_active: {
              type: 'boolean',
              description: 'Subscription status',
              example: true
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Resource not found'
            },
            status: {
              type: 'integer',
              description: 'HTTP status code',
              example: 404
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      }
    },
    tags: [
      { name: 'Products', description: 'Product management' },
      { name: 'Cart', description: 'Shopping cart operations' },
      { name: 'Orders', description: 'Order management' },
      { name: 'Users', description: 'User management' },
      { name: 'Categories', description: 'Product categories' },
      { name: 'Brands', description: 'Product brands' },
      { name: 'Wishlist', description: 'User wishlist' },
      { name: 'Search', description: 'Product search' },
      { name: 'Newsletter', description: 'Newsletter subscription management' }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

const customCss = `
  .swagger-ui .topbar { display: none }
  .swagger-ui .info .title { color: #3b82f6; font-size: 2rem; }
`;

export { specs, swaggerUi, customCss };