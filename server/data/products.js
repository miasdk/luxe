const productData = [
    // Dresses (1)
    {
    id: 1,
    brand: "Brand 1",
    title: "Floral Summer Dress",
    price: 59.99,
    category: 1, 
    description: "A light and airy floral dress perfect for summer.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 2,
    brand: "Brand 2",
    title: "Little Black Dress",
    price: 89.99,
    category: 1, 
    description: "A timeless classic, perfect for any occasion.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 3,
    brand: "Brand 3",
    title: "Maxi Dress",
    price: 79.99,
    category: 1, 
    description: "Flowing maxi dress with a bohemian vibe.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 4,
    brand: "Brand 4",
    title: "Wrap Dress",
    price: 69.99,
    category: 1, 
    description: "Flattering wrap dress with adjustable waist.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 5,
    brand: "Brand 5",
    title: "Slip Dress",
    price: 49.99,
    category: 1, 
    description: "Silky slip dress for a touch of elegance.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 6,
    brand: "Brand 6",
    title: "Sundress",
    price: 39.99,
    category: 1, 
    description: "Breezy sundress for warm summer days.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 7,
    brand: "Brand 7",
    title: "Shift Dress",
    price: 55.99,
    category: 1, 
    description: "Classic shift dress for a simple and chic look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 8,
    brand: "Brand 8",
    title: "Bodycon Dress",
    price: 65.99,
    category: 1, 
    description: "Figure-hugging bodycon dress for a night out.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 9,
    brand: "Brand 9",
    title: "Off-Shoulder Dress",
    price: 75.99,
    category: 1, 
    description: "Trendy off-shoulder dress for a summery feel.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 10,
    brand: "Brand 10",
    title: "Lace Dress",
    price: 99.99,
    category: 1, 
    description: "Elegant lace dress for special occasions.",
    image: "https://via.placeholder.com/150"
    },
  
    // Tops (2)
    {
    id: 11,
    brand: "Brand 11",
    title: "T-Shirt",
    price: 19.99,
    category: 2, 
    description: "Classic cotton t-shirt.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 12,
    brand: "Brand 12",
    title: "Tank Top",
    price: 15.99,
    category: 2, 
    description: "Sleeveless tank top for warm weather.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 13,
    brand: "Brand 13",
    title: "Blouse",
    price: 39.99,
    category: 2, 
    description: "Elegant blouse for work or casual wear.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 14,
    brand: "Brand 14",
    title: "Sweatshirt",
    price: 49.99,
    category: 2, 
    description: "Cozy sweatshirt for chilly days.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 15,
    brand: "Brand 15",
    title: "Hoodie",
    price: 59.99,
    category: 2, 
    description: "Hooded sweatshirt for a casual look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 16,
    brand: "Brand 16",
    title: "Crop Top",
    price: 29.99,
    category: 2, 
    description: "Trendy crop top for summer.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 17,
    brand: "Brand 17",
    title: "Off-Shoulder Top",
    price: 35.99,
    category: 2, 
    description: "Stylish off-shoulder top for a summery feel.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 18,
    brand: "Brand 18",
    title: "Long-Sleeve Shirt",
    price: 39.99,
    category: 2, 
    description: "Versatile long-sleeve shirt for any season.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 19,
    brand: "Brand 19",
    title: "Button-Down Shirt",
    price: 45.99,
    category: 2, 
    description: "Classic button-down shirt for a polished look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 20,
    brand: "Brand 20",
    title: "Camisole",
    price: 19.99,
    category: 2, 
    description: "Delicate camisole for layering.",
    image: "https://via.placeholder.com/150"
    },
  
    // Sweaters (3)
    {
    id: 21,
    brand: "Brand 21",
    title: "Cable Knit Sweater",
    price: 69.99,
    category: 3, 
    description: "Classic cable knit sweater for cozy warmth.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 22,
    brand: "Brand 22",
    title: "Chunky Knit Sweater",
    price: 79.99,
    category: 3, 
    description: "Trendy chunky knit sweater for a cozy look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 23,
    brand: "Brand 23",
    title: "Cardigan",
    price: 59.99,
    category: 3, 
    description: "Versatile cardigan for layering.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 24,
    brand: "Brand 24",
    title: "Turtleneck Sweater",
    price: 75.99,
    category: 3, 
    description: "Classic turtleneck sweater for a sophisticated look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 25,
    brand: "Brand 25",
    title: "Crewneck Sweater",
    price: 65.99,
    category: 3, 
    description: "Comfortable crewneck sweater for everyday wear",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 26,
    brand: "Brand 26",
    title: "V-Neck Sweater",
    price: 59.99,
    category: 3, 
    description: "Classic V-neck sweater for a polished look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 27,
    brand: "Brand 27",
    title: "Cashmere Sweater",
    price: 99.99,
    category: 3, 
    description: "Luxurious cashmere sweater for a touch of elegance.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 28,
    brand: "Brand 28",
    title: "Hooded Sweater",
    price: 69.99,
    category: 3, 
    description: "Cozy hooded sweater for casual days.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 29,
    brand: "Brand 29",
    title: "Mock Neck Sweater",
    price: 55.99,
    category: 3,
    description: "Stylish mock neck sweater for a modern look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 30,
    brand: "Brand 30",
    title: "Sweater Dress",
    price: 69.99,
    category: 3,
    description: "Cozy sweater dress for a chic look.",
    image: "https://via.placeholder.com/150"
    },

    // Pants (5)
    {
    id: 31,
    brand: "Brand 40",
    title: "Skinny Jeans",
    price: 49.99,
    category: 5, 
    description: "Classic skinny jeans for a flattering fit.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 32,
    brand: "Brand 41",
    title: "Boyfriend Jeans",
    price: 59.99,
    category: 5, 
    description: "Relaxed boyfriend jeans for a casual look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 33,
    brand: "Brand 42",
    title: "Bootcut Jeans",
    price: 55.99,
    category: 5, 
    description: "Flared bootcut jeans for a retro vibe.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 34,
    brand: "Brand 43",
    title: "Wide-Leg Pants",
    price: 69.99,
    category: 5, 
    description: "Flowing wide-leg pants for a chic look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 35,
    brand: "Brand 44",
    title: "Cropped Pants",
    price: 45.99,
    category: 5, 
    description: "Stylish cropped pants for a modern feel.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 36,
    brand: "Brand 45",
    title: "Leggings",
    price: 29.99,
    category: 5, 
    description: "Comfortable leggings for everyday wear.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 37,
    brand: "Brand 46",
    title: "Cargo Pants",
    price: 59.99,
    category: 5, 
    description: "Functional cargo pants for a utilitarian look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 38,
    brand: "Brand 47",
    title: "Joggers",
    price: 39.99,
    category: 5,
    description: "Comfy joggers for a casual vibe.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 39,
    brand: "Brand 48",
    title: "High-Waisted Pants",
    price: 49.99,
    category: 5,
    description: "Flattering high-waisted pants for a retro look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 40,
    brand: "Brand 49",
    title: "Paperbag Waist Pants",
    price: 55.99,
    category: 5,
    description: "Stylish paperbag waist pants for a modern feel.",
    image: "https://via.placeholder.com/150"
    },

    // Skirts (6)
    {
    id: 41,
    brand: "Brand 50",
    title: "Mini Skirt",
    price: 39.99,
    category: 6, 
    description: "Flirty mini skirt for a fun and playful look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 42,
    brand: "Brand 51",
    title: "A-Line Skirt",
    price: 49.99,
    category: 6,
    description: "Classic A-line skirt for a timeless look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 43,
    brand: "Brand 52",
    title: "Pencil Skirt",
    price: 45.99,
    category: 6,
    description: "Sleek pencil skirt for a polished look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 44,
    brand: "Brand 53",
    title: "Midi Skirt",
    price: 55.99,
    category: 6,
    description: "Versatile midi skirt for any occasion.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 45,
    brand: "Brand 54",
    title: "Maxi Skirt",
    price: 59.99,
    category: 6,
    description: "Flowing maxi skirt for a bohemian vibe.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 46,
    brand: "Brand 55",
    title: "Wrap Skirt",
    price: 49.99,
    category: 6,
    description: "Flattering wrap skirt with adjustable waist.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 47,
    brand: "Brand 56",
    title: "Denim Skirt",
    price: 39.99,
    category: 6,
    description: "Casual denim skirt for a laid-back look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 48,
    brand: "Brand 57",
    title: "Pleated Skirt",
    price: 55.99,
    category: 6,
    description: "Elegant pleated skirt for a feminine touch.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 49,
    brand: "Brand 58",
    title: "Floral Skirt",
    price: 45.99,
    category: 6,
    description: "Pretty floral skirt for a romantic look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 50,
    brand: "Brand 59",
    title: "Leather Skirt",
    price: 69.99,
    category: 6,
    description: "Edgy leather skirt for a cool vibe.",
    image: "https://via.placeholder.com/150"
    },
    // Shoes (7)
    {
    id: 51,
    brand: "Brand 60",
    title: "Sneakers",
    price: 59.99,
    category: 7,
    description: "Classic sneakers for everyday wear.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 52,
    brand: "Brand 61",
    title: "Sandals",
    price: 39.99,
    category: 7,
    description: "Comfortable sandals for warm weather.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 53,
    brand: "Brand 62",
    title: "Flats",
    price: 49.99,
    category: 7,
    description: "Versatile flats for any occasion.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 54,
    brand: "Brand 63",
    title: "Heels",
    price: 69.99,
    category: 7,
    description: "Elegant heels for a sophisticated look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 55,
    brand: "Brand 64",
    title: "Boots",
    price: 79.99,
    category: 7,
    description: "Stylish boots for a trendy look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 56,
    brand: "Brand 65",
    title: "Loafers",
    price: 55.99,
    category: 7,
    description: "Classic loafers for a polished look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 57,
    brand: "Brand 66",
    title: "Espadrilles",
    price: 45.99,
    category: 7,
    description: "Casual espadrilles for a laid-back vibe.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 58,
    brand: "Brand 67",
    title: "Wedges",
    price: 59.99,
    category: 7,
    description: "Stylish wedges for a summery feel.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 59,
    brand: "Brand 68",
    title: "Oxfords",
    price: 65.99,
    category: 7,
    description: "Classic oxfords for a vintage look.",
    image: "https://via.placeholder.com/150"
    },
    {
    id: 60,
    brand: "Brand 69",
    title: "Mules",
    price: 49.99,
    category: 7,
    description: "Trendy mules for a modern feel.",
    image: "https://via.placeholder.com/150"
    }
];

export default productData;