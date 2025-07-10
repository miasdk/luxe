/**
 * Script to populate products database with sample products for each category
 * Run with: node scripts/populate_products.js
 */
import { pool } from '../config/database.js';
import '../config/dotenv.js';

const sampleProducts = [
  // DRESSES
  {
    title: "Elegant Black Cocktail Dress",
    price: 89.99,
    description: "A sophisticated black cocktail dress perfect for evening events. Features a flattering A-line silhouette and comfortable stretch fabric.",
    category_name: "Dresses",
    brand_name: "Zara",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "M",
    color: "Black"
  },
  {
    title: "Floral Summer Maxi Dress",
    price: 65.00,
    description: "Beautiful floral print maxi dress perfect for summer days. Lightweight and breathable fabric with adjustable straps.",
    category_name: "Dresses",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "S",
    color: "Blue"
  },
  {
    title: "Little Black Dress",
    price: 120.00,
    description: "Classic little black dress with a modern twist. Perfect for any occasion with its versatile design.",
    category_name: "Dresses",
    brand_name: "J.Crew",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "L",
    color: "Black"
  },

  // TOPS
  {
    title: "Silk Blouse in Cream",
    price: 45.00,
    description: "Elegant silk blouse in a soft cream color. Perfect for professional settings or casual outings.",
    category_name: "Tops",
    brand_name: "Gap",
    image: "https://images.unsplash.com/photo-1564257631407-3deb5d241c4b?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Cream"
  },
  {
    title: "Graphic Tee - Vintage Style",
    price: 25.00,
    description: "Comfortable cotton graphic tee with a vintage-inspired design. Perfect for casual everyday wear.",
    category_name: "Tops",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "S",
    color: "White"
  },

  // SWEATERS
  {
    title: "Cozy Cashmere Sweater",
    price: 95.00,
    description: "Luxurious cashmere sweater in a soft gray color. Perfect for cold weather with its warm and soft texture.",
    category_name: "Sweaters",
    brand_name: "J.Crew",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "M",
    color: "Gray"
  },
  {
    title: "Oversized Knit Sweater",
    price: 75.00,
    description: "Trendy oversized knit sweater perfect for the fall season. Comfortable and stylish with a relaxed fit.",
    category_name: "Sweaters",
    brand_name: "Zara",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "L",
    color: "Beige"
  },

  // PANTS
  {
    title: "High-Waisted Skinny Jeans",
    price: 55.00,
    description: "Flattering high-waisted skinny jeans with stretch denim. Perfect for any casual or dressy occasion.",
    category_name: "Pants",
    brand_name: "Gap",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "28",
    color: "Blue"
  },
  {
    title: "Wide-Leg Trousers",
    price: 85.00,
    description: "Elegant wide-leg trousers perfect for professional settings. Made from high-quality fabric with a comfortable fit.",
    category_name: "Pants",
    brand_name: "J.Crew",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "30",
    color: "Black"
  },

  // SKIRTS
  {
    title: "Pencil Skirt in Navy",
    price: 45.00,
    description: "Classic pencil skirt in navy blue. Perfect for office wear with its professional and flattering silhouette.",
    category_name: "Skirts",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Navy"
  },
  {
    title: "Pleated Midi Skirt",
    price: 65.00,
    description: "Elegant pleated midi skirt perfect for both casual and formal occasions. Features a flattering A-line cut.",
    category_name: "Skirts",
    brand_name: "Zara",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "S",
    color: "Beige"
  },

  // SHOES
  {
    title: "Leather Ankle Boots",
    price: 120.00,
    description: "Classic leather ankle boots with a comfortable heel. Perfect for fall and winter seasons.",
    category_name: "Shoes",
    brand_name: "Nike",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "8",
    color: "Brown"
  },
  {
    title: "White Sneakers",
    price: 85.00,
    description: "Versatile white sneakers perfect for everyday wear. Comfortable and stylish with a clean design.",
    category_name: "Shoes",
    brand_name: "Nike",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "7",
    color: "White"
  },

  // OUTERWEAR
  {
    title: "Denim Jacket",
    price: 75.00,
    description: "Classic denim jacket perfect for layering. Features a comfortable fit and timeless style.",
    category_name: "Outerwear",
    brand_name: "Gap",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Blue"
  },
  {
    title: "Wool Blazer",
    price: 150.00,
    description: "Professional wool blazer perfect for office settings. Features a tailored fit and high-quality fabric.",
    category_name: "Outerwear",
    brand_name: "J.Crew",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "L",
    color: "Navy"
  },

  // ACTIVEWEAR
  {
    title: "Yoga Leggings",
    price: 65.00,
    description: "Comfortable yoga leggings with moisture-wicking fabric. Perfect for workouts and active lifestyle.",
    category_name: "Activewear",
    brand_name: "Lululemon",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "M",
    color: "Black"
  },
  {
    title: "Sports Bra",
    price: 45.00,
    description: "Supportive sports bra perfect for high-impact workouts. Features breathable fabric and comfortable fit.",
    category_name: "Activewear",
    brand_name: "Nike",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Gray"
  },

  // ACCESSORIES
  {
    title: "Leather Crossbody Bag",
    price: 95.00,
    description: "Stylish leather crossbody bag perfect for everyday use. Features multiple compartments and adjustable strap.",
    category_name: "Accessories",
    brand_name: "Zara",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "One Size",
    color: "Brown"
  },
  {
    title: "Gold Hoop Earrings",
    price: 35.00,
    description: "Classic gold hoop earrings perfect for any occasion. High-quality metal with a timeless design.",
    category_name: "Accessories",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "One Size",
    color: "Gold"
  },

  // DENIM
  {
    title: "High-Waisted Denim Shorts",
    price: 45.00,
    description: "Trendy high-waisted denim shorts perfect for summer. Comfortable fit with a flattering silhouette.",
    category_name: "Denim",
    brand_name: "Gap",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Blue"
  },
  {
    title: "Denim Shirt",
    price: 55.00,
    description: "Classic denim shirt perfect for layering. Features a comfortable fit and versatile style.",
    category_name: "Denim",
    brand_name: "Zara",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "L",
    color: "Blue"
  },

  // LINGERIE
  {
    title: "Silk Robe",
    price: 85.00,
    description: "Luxurious silk robe perfect for lounging. Features a comfortable fit and elegant design.",
    category_name: "Lingerie",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "M",
    color: "Pink"
  },
  {
    title: "Lace Bodysuit",
    price: 65.00,
    description: "Elegant lace bodysuit perfect for special occasions. Features a flattering fit and beautiful detailing.",
    category_name: "Lingerie",
    brand_name: "Zara",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "S",
    color: "Black"
  },

  // SWIMWEAR
  {
    title: "One-Piece Swimsuit",
    price: 55.00,
    description: "Flattering one-piece swimsuit perfect for beach days. Features a comfortable fit and stylish design.",
    category_name: "Swimwear",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Black"
  },
  {
    title: "Bikini Set",
    price: 45.00,
    description: "Stylish bikini set perfect for poolside lounging. Features a comfortable fit and trendy design.",
    category_name: "Swimwear",
    brand_name: "Zara",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "M",
    color: "Blue"
  },

  // MATERNITY
  {
    title: "Maternity Dress",
    price: 75.00,
    description: "Comfortable maternity dress perfect for pregnancy. Features a flattering fit and breathable fabric.",
    category_name: "Maternity",
    brand_name: "Gap",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Blue"
  },
  {
    title: "Maternity Jeans",
    price: 65.00,
    description: "Comfortable maternity jeans with stretch panel. Perfect for everyday wear during pregnancy.",
    category_name: "Maternity",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=600&fit=crop&crop=center",
    condition: "Like New",
    size: "L",
    color: "Blue"
  },

  // PLUS SIZE
  {
    title: "Plus Size Maxi Dress",
    price: 85.00,
    description: "Beautiful plus size maxi dress perfect for any occasion. Features a flattering fit and comfortable fabric.",
    category_name: "Plus Size",
    brand_name: "H&M",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop&crop=center",
    condition: "Excellent",
    size: "XL",
    color: "Red"
  },
  {
    title: "Plus Size Blouse",
    price: 55.00,
    description: "Elegant plus size blouse perfect for professional settings. Features a comfortable fit and stylish design.",
    category_name: "Plus Size",
    brand_name: "Gap",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "XXL",
    color: "White"
  },

  // VINTAGE
  {
    title: "Vintage Denim Jacket",
    price: 120.00,
    description: "Authentic vintage denim jacket with unique character. Features original details and timeless style.",
    category_name: "Vintage",
    brand_name: "Vintage",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "M",
    color: "Blue"
  },
  {
    title: "Vintage Silk Scarf",
    price: 45.00,
    description: "Beautiful vintage silk scarf with unique pattern. Perfect for accessorizing any outfit.",
    category_name: "Vintage",
    brand_name: "Vintage",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center",
    condition: "Good",
    size: "One Size",
    color: "Multi"
  }
];

const populateProducts = async () => {
  try {
    console.log('🔗 Connecting to Railway PostgreSQL database...');
    
    // Get category and brand IDs
    const categoriesResult = await pool.query('SELECT id, name FROM categories');
    const brandsResult = await pool.query('SELECT id, name FROM brands');
    
    const categories = categoriesResult.rows;
    const brands = brandsResult.rows;
    
    console.log(`✅ Found ${categories.length} categories and ${brands.length} brands`);
    
    let addedCount = 0;
    
    for (const product of sampleProducts) {
      // Find category ID
      const category = categories.find(c => c.name === product.category_name);
      if (!category) {
        console.log(`⚠️  Category not found: ${product.category_name}`);
        continue;
      }
      
      // Find brand ID
      const brand = brands.find(b => b.name === product.brand_name);
      if (!brand) {
        console.log(`⚠️  Brand not found: ${product.brand_name}`);
        continue;
      }
      
      // Insert product
      const insertQuery = `
        INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      
      await pool.query(insertQuery, [
        brand.id,
        product.title,
        product.price,
        product.description,
        category.id,
        product.image,
        null, // seller_id (null for sample data)
        Math.floor(Math.random() * 50) // random likes
      ]);
      
      addedCount++;
      console.log(`✅ Added: ${product.title}`);
    }
    
    console.log(`\n🎉 Successfully added ${addedCount} products to Railway database!`);
    
    // Get total count
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM products');
    console.log(`📈 Total products in database: ${totalResult.rows[0].total}`);
    
  } catch (error) {
    console.error('❌ Error populating products:', error.message);
  } finally {
    await pool.end();
  }
};

// Run the script
populateProducts(); 