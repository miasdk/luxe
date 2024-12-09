import { pool } from './database.js';
import './dotenv.js';
import productData from '../data/products.js';

const createProductsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS products;

        CREATE TABLE IF NOT EXISTS products ( 
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            image TEXT NOT NULL
        )
    `
    
    try {
        const res = await pool.query(createTableQuery);
        console.log('Table created successfully');
    } catch (err) { 
        console.log('⚠️ error creating gifts table', err);
    }
}

const seedProductsTable = async () => { 
    await createProductsTable();

    productData.forEach((product) => {
        const insertQuery = {
            text: 'INSERT INTO products (name, description, price, image) VALUES ($1, $2, $3, $4)',
        }

        const values = [
            product.title,
            product.description,
            product.price,
            product.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.log('⚠️ error seeding products table', err);
                return
            }
            console.log(`🏬 ${product.title} added successfully`);
        })
    })
}

seedProductsTable();