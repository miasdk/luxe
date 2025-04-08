import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productsRouter from './routes/ProductRoutes.js';
import categoriesRouter from './routes/categoryRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import ordersRouter from './routes/orderRoutes.js';
import userRouter from './routes/userRoutes.js';
dotenv.config();
const app = express(); 

app.use(express.json());
app.use(cors());

// API Routes 
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">eCart API</h1>')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

