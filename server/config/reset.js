/**
 * This script is used to reset the database and seed it with initial data.
 * Initial seed from fakestoreapi.com to seed the products table, this will be replaced with the actual products from the client
 */
import { pool } from './database.js';
import './dotenv.js';
import fetch from 'node-fetch';


/*------------------------------------*
 *              PRODUCTS              *
 *------------------------------------*/
const createProductsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS products;

        CREATE TABLE IF NOT EXISTS products ( 
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            category VARCHAR(100),
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

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        products.forEach(product => {
            const insertQuery = {
                text: 'INSERT INTO products (name, description, price, category, image) VALUES ($1, $2, $3, $4, $5)',
            }

            const values = [
                product.title,
                product.description,
                product.price,
                product.category,
                product.image
            ]

            pool.query(insertQuery, values, (err, res) => {
                if (err) {
                    console.log('⚠️ error inserting product', err);
                } else {
                    console.log(`Inserted ${product.title}`);
                }
            });
        });
    
        console.log('Products table seeded successfully')
    } catch (err) {
        console.log('⚠️ error seeding products table', err);
    }
}

/*------------------------------------*
 *              USERS                 *
 *------------------------------------*/

const createUsersTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS users;

        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY, 
            email VARCHAR(100) NOT NULL UNIQUE,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            firstname VARCHAR(100) NOT NULL,
            lastname VARCHAR(100) NOT NULL,
            city VARCHAR(100) NOT NULL,
            street VARCHAR(100) NOT NULL,
            number INTEGER NOT NULL,
            zipcode VARCHAR(100) NOT NULL,
            lat DECIMAL(10, 7), 
            long DECIMAL(10, 7), 
            phone VARCHAR(100) NOT NULL,
            avatar TEXT DEFAULT 'https://cdn.iconscout.com/icon/free/png-256/avatar-380-456332.png'
        )
    `

    try {
        await pool.query(createTableQuery);
        console.log('Users table created successfully');
    } catch (err) {
        console.log('⚠️ error creating users table', err);
    }
}

const seedUsersTable = async () => {
    await createUsersTable();

    try {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();

        users.forEach(user => {
            const insertQuery = {
                text: 'INSERT INTO users (email, username, password, firstname, lastname, city, street, number, zipcode, lat, long, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            }

            const values = [
                user.email,
                user.username,
                user.password,
                user.name.firstname,
                user.name.lastname,
                user.address.city,
                user.address.street,
                user.address.number,
                user.address.zipcode,
                user.address.geolocation.lat,
                user.address.geolocation.long,
                user.phone
            ]
 
            pool.query(insertQuery, values, (err, res) => {
                if (err) {
                    console.log('⚠️ error inserting user', err);
                } else {
                    console.log(`Inserted ${user.username}`);
                }
            });
        })

        console.log('Users table seeded successfully')
    } catch (err) {
        console.log('⚠️ error seeding users table', err);
    }
}

/*------------------------------------*
 *              CARTS                 *
 *------------------------------------*/

const createCartsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cart_products; 
        DROP TABLE IF EXISTS carts;

        CREATE TABLE IF NOT EXISTS carts (
            id SERIAL PRIMARY KEY,
            userId INTEGER NOT NULL,
            date DATE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS cart_products (
            id SERIAL PRIMARY KEY, 
            cartId INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
            productId INTEGER NOT NULL, 
            quantity INTEGER NOT NULL
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log('Carts and cart_products tables created successfully');
    } catch (err) {
        console.log('⚠️ error creating carts and cart_products tables', err);
    }
}

const seedCartsTable = async () => {
    await createCartsTable();

    try {
        const response = await fetch('https://fakestoreapi.com/carts');
        const carts = await response.json();

        for (const cart of carts) {
            const { id, userId, date, products } = cart;

            // Insert cart metadata into carts table
            const insertCartQuery = {
                text: 'INSERT INTO carts (id, userId, date) VALUES ($1, $2, $3)',
                values: [id, userId, date]
            };
            await pool.query(insertCartQuery);

            // Insert products into cart_products table
            for (const product of products) {
                const { productId, quantity } = product;
                const insertProductQuery = {
                    text: 'INSERT INTO cart_products (cartId, productId, quantity) VALUES ($1, $2, $3)',
                    values: [id, productId, quantity]
                };
                await pool.query(insertProductQuery);
            }
        }
        console.log('Carts and cart_products table seeded successfully');
    } catch (err) {
        console.log('⚠️ error seeding carts and cart_products tables', err);
    }
}

/*------------------------------------*
 *              MAIN                  *
 *------------------------------------*/

seedProductsTable();
seedUsersTable();
seedCartsTable();

    

