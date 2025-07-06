import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import routes
import productsRouter from './routes/productRoutes.js';
import brandsRouter from './routes/brandRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import ordersRouter from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';
import wishlistRouter from './routes/wishlistRoutes.js';
import searchRouter from './routes/searchRoutes.js';
import categoriesRouter from './routes/categoryRoutes.js';
import newsletterRouter from './routes/newsletterRoutes.js';

// Import Swagger
import { specs, swaggerUi, customCss } from './swagger.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
  origin: [
    'http://localhost:5173',                      
    'https://e-cart-mu-olive.vercel.app',
    'https://ecartdemo.vercel.app'          
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss,
  customSiteTitle: 'eCart API Documentation'
}));

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', userRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/search', searchRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/newsletter', newsletterRouter); 

// Health check route
app.get('/health', async (req, res) => {
    try {
        // Test database connection
        const { pool } = await import('./config/database.js');
        const result = await pool.query('SELECT 1 as test');
        
        res.status(200).json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            database: 'connected'
        });
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({ 
            status: 'ERROR', 
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            database: 'disconnected',
            error: error.message
        });
    }
});

// Home route
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
    console.log(`🔍 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});