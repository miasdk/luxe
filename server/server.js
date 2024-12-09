import express from 'express';
import productsRouter from './routes/products.js';
import './config/dotenv.js';    
import cors from 'cors';


const app = express(); 

app.use(cors());
app.use('/products', productsRouter); 

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">eCart API</h1>')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

