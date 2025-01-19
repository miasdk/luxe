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
    const query = `
        INSERT INTO users (uid, email, password, display_name, phone_number, photo_url, email_verified, disabled)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    try {
        for (const user of users) {
            await pool.query(query, Object.values(user));
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
        INSERT INTO brands (id, name, image)
        VALUES ($1, $2, $3)
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
    const query = `
        INSERT INTO products (title, brand_id, price, description, category_id, image)
        VALUES ($1, $2, $3, $4, $5, $6)
    `;
    try {
        for (const product of products) {
            const { title, brand_id, price, description, category_id, image } = product;
            await pool.query(query, [title, brand_id, price, description, category_id, image]);
        }
        console.log(`Successfully added ${products.length} products to the products table`);
    } catch (error) {
        console.error('Error seeding products table', error.stack);
    }
}

// const createSizesTable = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS sizes (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL
//         );
//     `;
//     try {
//         await pool.query(query);
//         console.log('Sizes table created successfully');
//     } catch (error) {
//         console.error('Error creating sizes table', error.stack);
//     }
// }

// const seedSizesTable = async () => {
//     const query = `
//         INSERT INTO sizes (name)
//         VALUES ($1)
//     `;
//     try {
//         for (const size of sizes) {
//             await pool.query(query, Object.values(size));
//         }
//         console.log('Sizes table seeded successfully');
//     }
//     catch (error) {
//         console.error('Error seeding sizes table', error.stack);
//     }
// }

// const createColorsTable = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS colors (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL
//         );
//     `;
//     try {
//         await pool.query(query);
//         console.log('Colors table created successfully');
//     } catch (error) {
//         console.error('Error creating colors table', error.stack);
//     }
// }

// const seedColorsTable = async () => {
//     const query = `
//         INSERT INTO colors (name)
//         VALUES ($1)
//     `;
//     try {
//         for (const color of colors) {
//             await pool.query(query, Object.values(color));
//         }
//         console.log('Colors table seeded successfully');
//     } catch (error) {
//         console.error('Error seeding colors table', error.stack);
//     }
// }

// const createConditionsTable = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS conditions (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             description TEXT NOT NULL
//         );
//     `;
//     try {
//         await pool.query(query);
//         console.log('Conditions table created successfully');
//     } catch (error) {
//         console.error('Error creating conditions table', error.stack);
//     }
// }

// const seedConditionsTable = async () => {
//     const query = `
//         INSERT INTO conditions (name, description)
//         VALUES ($1, $2)
//     `;
//     try {
//         for (const condition of conditions) {
//             await pool.query(query, Object.values(condition));
//         }
//         console.log('Conditions table seeded successfully');
//     } catch (error) {
//         console.error('Error seeding conditions table', error.stack);
//     }
// }

// const createCartsTable = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS carts (
//             id SERIAL PRIMARY KEY,
//             user_id UUID NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//     `;
//     try {
//         await pool.query(query);
//         console.log('Carts table created successfully');
//     } catch (error) {
//         console.error('Error creating carts table', error.stack);
//     }
// }

// const seedCartsTable = async () => {
//     const query = `
//         INSERT INTO carts (user_id, created_at)
//         VALUES ($1, $2)
//     `;
//     try {
//         for (const cart of carts) {
//             await pool.query(query, Object.values(cart));
//         }
//         console.log('Carts table seeded successfully');
//     } catch (error) {
//         console.error('Error seeding carts table', error.stack);
//     }
// }

// const createCartProductsTable = async () => {
//     const query = `
//         CREATE TABLE IF NOT EXISTS cart_products (
//             id SERIAL PRIMARY KEY,
//             cart_id INT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
//             product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
//             quantity INT NOT NULL
//         );
//     `;
//     try {
//         await pool.query(query);
//         console.log('Cart products table created successfully');
//     } catch (error) {
//         console.error('Error creating cart products table', error.stack);
//     }
// }

// const seedCartProductsTable = async () => {
//     const query = `
//         INSERT INTO cart_products (cart_id, product_id, quantity)
//         VALUES ($1, $2, $3)
//     `;
//     try {
//         for (const cartProduct of cartProductData) {
//             await pool.query(query, Object.values(cartProduct));
//         }
//         console.log('Cart products table seeded successfully');
//     } catch (error) {
//         console.error('Error seeding cart products table', error.stack);
//     }
// }

// const createProductSizesTable = async () => {
//     const createQuery = `
//         DROP TABLE IF EXISTS product_sizes CASCADE;
        
//         CREATE TABLE IF NOT EXISTS product_sizes (
//         product_id INT NOT NULL,
//         size_id INT NOT NULL,
//         PRIMARY KEY (product_id, size_id),
//         FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
//         FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE CASCADE
//         );
//     `

//     try {
//         await pool.query(createQuery);
//         console.log('Product sizes table created successfully');
//     } catch (error) {
//         console.error('Error creating product sizes table', error.stack);
//     }
// }

// const seedProductSizes = async () => {
//     const insertQuery = `
//         INSERT INTO product_sizes (product_id, size_id)
//         VALUES ($1, $2)
//     `;
    
//     productSizesData.map(async (productSize) => {
//         try {
//             await pool.query(insertQuery, [productSize.product_id, productSize.size_id]);
//             console.log(`Created product size for product_id: ${productSize.product_id} and size_id: ${productSize.size_id}`);
//         } catch (error) {
//             console.error('Error creating product size', error.stack);
//         }
//     })   
// }

// const createProductColorsTable = async () => {
//     const createQuery = `
//         DROP TABLE IF EXISTS product_colors CASCADE;
        
//         CREATE TABLE IF NOT EXISTS product_colors (
//         product_id INT NOT NULL,
//         color_id INT NOT NULL,
//         PRIMARY KEY (product_id, color_id),
//         FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
//         FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE CASCADE
//         );
//     `

//     try {
//         await pool.query(createQuery);
//         console.log('Product colors table created successfully');
//     } catch (error) {
//         console.error('Error creating product colors table', error.stack);
//     }
// }

// const seedProductColors = async () => {
//     const insertQuery = `
//         INSERT INTO product_colors (product_id, color_id)
//         VALUES ($1, $2)
//     `;
    
//     productColorsData.map(async (productColor) => {
//         try {
//             await pool.query(insertQuery, [productColor.product_id, productColor.color_id]);
//             console.log(`Created product color for product_id: ${productColor.product_id} and color_id: ${productColor.color_id}`);
//         } catch (error) {
//             console.error('Error creating product color', error.stack);
//         }
//     })   
// }

// const createProductConditionsTable = async () => {
//     const createQuery = `
//         DROP TABLE IF EXISTS product_conditions CASCADE;
        
//         CREATE TABLE IF NOT EXISTS product_conditions (
//         product_id INT NOT NULL,
//         condition_id INT NOT NULL,
//         PRIMARY KEY (product_id, condition_id),
//         FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
//         FOREIGN KEY (condition_id) REFERENCES conditions(id) ON DELETE CASCADE
//         );
//     `

//     try {
//         await pool.query(createQuery);
//         console.log('Product conditions table created successfully');
//     } catch (error) {
//         console.error('Error creating product conditions table', error.stack);
//     }
// }

// const seedProductConditions = async () => {
//     const insertQuery = `
//         INSERT INTO product_conditions (product_id, condition_id)
//         VALUES ($1, $2)
//     `;
    
//     productConditionsData.map(async (productCondition) => {
//         try {
//             await pool.query(insertQuery, [productCondition.product_id, productCondition.condition_id]);
//             console.log(`Created product condition for product_id: ${productCondition.product_id} and condition_id: ${productCondition.condition_id}`);
//         } catch (error) {
//             console.error('Error creating product condition', error.stack);
//         }
//     })   
// }

seedProductsTable();