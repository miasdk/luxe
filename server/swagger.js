import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'eCart API',
      version: '1.0.0',
      description: 'A comprehensive e-commerce API built with Node.js, Express, and PostgreSQL',
      contact: {
        name: 'eCart Development Team',
        email: 'dev@ecart.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001/api',
        description: 'Development server'
      },
      {
        url: process.env.PRODUCTION_API_URL || 'https://your-render-app.onrender.com/api',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Firebase JWT'
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