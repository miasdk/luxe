/**
 * This script is used to reset the database and seed it with initial data.
 * Initial seed from fakestoreapi.com to seed the products table, this will be replaced with the actual products from the client
 */
import { pool } from './database.js';
import { userData as users } from '../data/users.js';
import { categoryData as categories } from '../data/categories.js';
import { productData as products } from '../data/products.js';
import { sizeData as sizes } from '../data/sizes.js';
import { colorData as colors } from '../data/colors.js';
import { conditionData as conditions } from '../data/conditions.js';
import { cartData as carts } from '../data/carts.js';
import { cartProductData } from '../data/cart_products.js';
import { productSizesData } from '../data/product_sizes.js';
import { productColorsData } from '../data/product_colors.js';
import { productConditionsData } from '../data/product_conditions.js';
import { brandData as brands } from '../data/brands.js';
import { ordersData } from '../data/orders.js';
import { orderItemsData } from '../data/order_items.js';
import './dotenv.js';
import fetch from 'node-fetch';

const createUsersTable = async () => {
    const insertQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            uid VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            display_name VARCHAR(255) NOT NULL,
            phone_number VARCHAR(255),
            photo_url VARCHAR(255),
            email_verified BOOLEAN NOT NULL,
            disabled BOOLEAN NOT NULL
        );
    `;
    try {
        await pool.query(insertQuery);
        console.log('Users table created successfully');
    } catch (error) {
        console.error('Error creating users table', error.stack);
    }
}

const seedUsersTable = async () => {
    await createUsersTable();

    const insertQuery = `   
        INSERT INTO users (uid, email, password, display_name, phone_number, photo_url, email_verified, disabled)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    try {
        for (const user of users) {
            await pool.query(insertQuery, Object.values(user));
        }
        console.log(`Successfully added ${users.length} users to the users table`); 
    } catch (error) {
        console.error('Error seeding users table', error.stack);
    }
}

const createCategoriesTable = async () => {
    const insertQuery = `
        CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
        );
    `;
    try {
        await pool.query(insertQuery);
        console.log('Categories table created successfully');
    } catch (error) {
        console.error('Error creating categories table', error.stack);
    }
}

const seedCategoriesTable = async () => {
    await createCategoriesTable();
    const query = `
        INSERT INTO categories (name, image)
        VALUES ($1, $2)
    `;
    try {
        for (const category of categories) {
            await pool.query(query, [category.name, category.image]);
        }
        console.log(`Successfully added ${categories.length} categories to the categories table`);
    } catch (error) {
        console.error('Error seeding categories table', error.stack);
    }
}

const createBrandsTable = async () => {
    const insertQuery = `
        CREATE TABLE IF NOT EXISTS brands (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL
        );
    `;
    try {
        await pool.query(insertQuery);
        console.log('Brands table created successfully');
    }
    catch (error) {
        console.error('Error creating brands table', error.stack);
    }
}

const seedBrandsTable = async () => {
    await createBrandsTable();
    const query = `
        INSERT INTO brands (name, image)
        VALUES ($1, $2)
    `;
    try {
        for (const brand of brands) {
            await pool.query(query, Object.values(brand));
        }
        console.log(`Successfully added ${brands.length} brands to the brands table`);
    } catch (error) {
        console.error('Error seeding brands table', error.stack);
    }
}

const createProductsTable = async () => {
    const insertQuery = `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            description TEXT NOT NULL,
            category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
            image VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(insertQuery);
        console.log('Products table created successfully');
    } catch (error) {
        console.error('Error creating products table', error.stack);
    }
}

const seedProductsTable = async () => {
    await createProductsTable();    

    const insertQuery = `
        INSERT INTO products (brand_id, title, price, description, category_id, image, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    try {
        for (const product of products) {
            await pool.query(insertQuery, [
                product.brand_id,
                product.title,
                product.price,
                product.description,
                product.category_id,
                product.image,
                product.created_at
            ]);

            console.log(`Successfully added product ${product.title} to the products table`);
        }
        console.log(`Successfully added ${products.length} products to the products table`);
    } catch (error) {
        console.error('Error seeding products table', error.stack);
    }
}

const createSizesTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS sizes (
            size_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `;
    try {
        await pool.query(query);
        console.log('Sizes table created successfully');
    } catch (error) {
        console.error('Error creating sizes table', error.stack);
    }
}

const seedSizesTable = async () => {
    await createSizesTable();   

    const insertQuery = `
        INSERT INTO sizes (name)
        VALUES ($1)
    `;
    try {
        for (const size of sizes) {
            await pool.query(insertQuery, Object.values(size));
        }
        console.log('Sizes table seeded successfully');
    }
    catch (error) {
        console.error('Error seeding sizes table', error.stack);
    }
}

const createColorsTable = async () => {
    const insertQuery = `
        CREATE TABLE IF NOT EXISTS colors (
            color_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `;
    try {
        await pool.query(insertQuery);
        console.log('Colors table created successfully');
    } catch (error) {
        console.error('Error creating colors table', error.stack);
    }
}

const seedColorsTable = async () => {
    await createColorsTable();

    const insertQuery = `
        INSERT INTO colors (name)
        VALUES ($1)
    `;
    try {
        for (const color of colors) {
            await pool.query(insertQuery, Object.values(color));
        }
        console.log('Colors table seeded successfully');
    } catch (error) {
        console.error('Error seeding colors table', error.stack);
    }
}

const createConditionsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS conditions (
            conditions_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
    `;
    try {
        await pool.query(query);
        console.log('Conditions table created successfully');
    } catch (error) {
        console.error('Error creating conditions table', error.stack);
    }
}

const seedConditionsTable = async () => {
    await createConditionsTable();
    const insertQuery = `
        INSERT INTO conditions (name, description)
        VALUES ($1, $2)
    `;
    try {
        for (const condition of conditions) {
            await pool.query(insertQuery, Object.values(condition));
        }
        console.log('Conditions table seeded successfully');
    } catch (error) {
        console.error('Error seeding conditions table', error.stack);
    }
}

const createCartsTable = async () => {
    const insertQuery = `
        CREATE TABLE IF NOT EXISTS carts (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

         CREATE TABLE IF NOT EXISTS cart_products (
            cart_id INT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
            product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
            quantity INT NOT NULL
        );
    `;
    try {
        await pool.query(insertQuery);
        console.log('Carts table created successfully');
    } catch (error) {
        console.error('Error creating carts table', error.stack);
    }
}

const seedCartsTable = async () => {
    await createCartsTable();

    const insertQuery = `
        INSERT INTO carts (user_id)
        VALUES ($1)
    `;
    try {
        for (const cart of carts) {
            await pool.query(insertQuery, [cart.user_id]);
        }
        console.log('Carts table seeded successfully');
    }
    catch (error) {
        console.error('Error seeding carts table', error.stack);
    }

    const insertCartProductQuery = `
        INSERT INTO cart_products (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
    `;
    try {
        for (const cartProduct of cartProductData) {
            await pool.query(insertCartProductQuery, Object.values(cartProduct));
        }
        console.log('Cart products table seeded successfully');
    }
    catch (error) {
        console.error('Error seeding cart products table', error.stack);
    }
}

const createProductSizesTable = async () => {
    const createQuery = `
        DROP TABLE IF EXISTS product_sizes CASCADE;
        
        CREATE TABLE IF NOT EXISTS product_sizes (
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        size_id INT NOT NULL REFERENCES sizes(size_id) ON DELETE CASCADE,
        PRIMARY KEY (product_id, size_id)
       
        );
    `

    try {
        await pool.query(createQuery);
        console.log('Product sizes table created successfully');
    } catch (error) {
        console.error('Error creating product sizes table', error.stack);
    }
}

const seedProductSizes = async () => {
    await createProductSizesTable();

    const insertQuery = `
        INSERT INTO product_sizes (product_id, size_id)
        VALUES ($1, $2)
    `;
    
    productSizesData.map(async (productSize) => {
        try {
            await pool.query(insertQuery, [productSize.product_id, productSize.size_id]);
            console.log(`Created product size for product_id: ${productSize.product_id} and size_id: ${productSize.size_id}`);
        } catch (error) {
            console.error('Error creating product size', error.stack);
        }
    })   
}

const createProductColorsTable = async () => {
    const createQuery = `
        DROP TABLE IF EXISTS product_colors CASCADE;

        CREATE TABLE IF NOT EXISTS product_colors (
            product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
            color_id INT NOT NULL REFERENCES colors(color_id) ON DELETE CASCADE,
            PRIMARY KEY (product_id, color_id)
        );
    `

    try {
        await pool.query(createQuery);
        console.log('Product colors table created successfully');
    } catch (error) {
        console.error('Error creating product colors table', error.stack);
    }
}

const seedProductColors = async () => {
    await createProductColorsTable();

    const insertQuery = `
        INSERT INTO product_colors (product_id, color_id)
        VALUES ($1, $2)
    `;

    productColorsData.map(async (productColor) => {
        try {
            await pool.query(insertQuery, [productColor.product_id, productColor.color_id]);
            console.log(`Created product color for product_id: ${productColor.product_id} and color_id: ${productColor.color_id}`);
        } catch (error) {
            console.error('Error creating product color', error.stack);
        }
    })
}

const createProductConditionsTable = async () => {
    const createQuery = `
        DROP TABLE IF EXISTS product_conditions CASCADE;

        CREATE TABLE IF NOT EXISTS product_conditions (
            product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
            condition_id INT NOT NULL REFERENCES conditions(conditions_id) ON DELETE CASCADE,
            PRIMARY KEY (product_id, condition_id)
        );
    `

    try {
        await pool.query(createQuery);
        console.log('Product conditions table created successfully');
    } catch (error) {
        console.error('Error creating product conditions table', error.stack);
    }
}

const seedProductConditions = async () => {
    await createProductConditionsTable();

    const insertQuery = `
        INSERT INTO product_conditions (product_id, condition_id)
        VALUES ($1, $2)
    `;

    productConditionsData.map(async (productCondition) => {
        try {
            await pool.query(insertQuery, [productCondition.product_id, productCondition.condition_id]);
            console.log(`Created product condition for product_id: ${productCondition.product_id} and condition_id: ${productCondition.condition_id}`);
        } catch (error) {
            console.error('Error creating product condition', error.stack);
        }
    })
}

// Create Orders Table
const createOrdersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE SET NULL,
            total_price DECIMAL(10,2) NOT NULL,
            status VARCHAR(50) CHECK (status IN ('pending', 'paid', 'shipped', 'delivered', 'canceled')) DEFAULT 'pending',
            stripe_payment_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(query);
        console.log('Orders table created successfully');
    } catch (error) {
        console.error('Error creating orders table', error.stack);
    }
}

// Seed Orders Table
const seedOrdersTable = async () => {
    await createOrdersTable();
    const insertQuery = `
        INSERT INTO orders (user_id, total_price, status, stripe_payment_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    try {
        for (const order of ordersData) {
            await pool.query(insertQuery, [
                order.user_id,
                order.total_price,
                order.status,
                order.stripe_payment_id,
                order.created_at,
                order.updated_at
            ]);
        }
        console.log(`Successfully added ${ordersData.length} orders to the orders table`);
    } catch (error) {
        console.error('Error seeding orders table', error.stack);
    }
}

// Create Order Items Table
const createOrderItemsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS order_items (
            id SERIAL PRIMARY KEY,
            order_id INT REFERENCES orders(id) ON DELETE CASCADE,
            product_id INT REFERENCES products(id) ON DELETE CASCADE,
            quantity INT NOT NULL CHECK (quantity > 0),
            unit_price DECIMAL(10,2) NOT NULL
        );
    `;
    try {
        await pool.query(query);
        console.log('Order items table created successfully');
    } catch (error) {
        console.error('Error creating order items table', error.stack);
    }
}

// Seed Order Items Table
const seedOrderItemsTable = async () => {
    await createOrderItemsTable();
    const insertQuery = `
        INSERT INTO order_items (order_id, product_id, quantity, unit_price)
        VALUES ($1, $2, $3, $4)
    `;
    try {
        for (const item of orderItemsData) {
            await pool.query(insertQuery, [
                item.order_id,
                item.product_id,
                item.quantity,
                item.unit_price
            ]);
        }
        console.log('Successfully seeded order items table');
    } catch (error) {
        console.error('Error seeding order items table', error.stack);
    }
}


const createProductDetailsView = async () => {
    const query = `
        CREATE OR REPLACE VIEW product_details AS
        SELECT 
            p.id AS product_id,
            p.title,
            p.price,
            p.description,
            p.image,
            p.created_at,
            b.name AS brand_name,
            c.name AS category_name,
            array_remove(array_agg(DISTINCT s.name), NULL) AS sizes,
            array_remove(array_agg(DISTINCT cl.name), NULL) AS colors,
            array_remove(array_agg(DISTINCT co.name), NULL) AS conditions
        FROM products p
        LEFT JOIN brands b ON p.brand_id = b.id
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_sizes ps ON p.id = ps.product_id
        LEFT JOIN sizes s ON ps.size_id = s.size_id
        LEFT JOIN product_colors pc ON p.id = pc.product_id
        LEFT JOIN colors cl ON pc.color_id = cl.color_id
        LEFT JOIN product_conditions pc2 ON p.id = pc2.product_id
        LEFT JOIN conditions co ON pc2.condition_id = co.conditions_id
        GROUP BY p.id, b.name, c.name;
    `;
    try {
        await pool.query(query);
        console.log('Product details view created successfully');
    } catch (error) {
        console.error('Error creating product details view', error.stack);
    }
}

const createCartDetailsView = async () => {
    const query = `
        CREATE OR REPLACE VIEW cart_details AS
        SELECT 
            ca.id AS cart_id,
            u.display_name AS user_name,
            p.title AS product_title,
            cp.quantity,
            ca.created_at
        FROM carts ca
        JOIN users u ON ca.user_id = u.id
        JOIN cart_products cp ON ca.id = cp.cart_id
        JOIN products p ON cp.product_id = p.id;
    `;
    try {
        await pool.query(query);
        console.log('Cart details view created successfully');
    } catch (error) {
        console.error('Error creating cart details view', error.stack);
    }
}


seedUsersTable();
seedCategoriesTable();
seedBrandsTable();
seedProductsTable();
seedSizesTable();
seedColorsTable();
seedConditionsTable();
seedCartsTable();
seedProductSizes();
seedProductColors();
seedProductConditions();
seedOrdersTable();
seedOrderItemsTable();
createProductDetailsView();
createCartDetailsView();




