-- Sample products for each category
-- Run this in Railway CLI to populate your products database

-- DRESSES
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(2, 'Elegant Black Cocktail Dress', 89.99, 'A sophisticated black cocktail dress perfect for evening events.', 1, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center', NULL, 15),
(3, 'Floral Summer Maxi Dress', 65.00, 'Beautiful floral print maxi dress perfect for summer days.', 1, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop&crop=center', NULL, 23),
(4, 'Little Black Dress', 120.00, 'Classic little black dress with a modern twist.', 1, 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&crop=center', NULL, 31);

-- TOPS
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'Silk Blouse in Cream', 45.00, 'Elegant silk blouse in a soft cream color.', 2, 'https://images.unsplash.com/photo-1564257631407-3deb5d241c4b?w=400&h=600&fit=crop&crop=center', NULL, 12),
(3, 'Graphic Tee - Vintage Style', 25.00, 'Comfortable cotton graphic tee with vintage-inspired design.', 2, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop&crop=center', NULL, 8);

-- SWEATERS
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(4, 'Cozy Cashmere Sweater', 95.00, 'Luxurious cashmere sweater in soft gray color.', 3, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center', NULL, 28),
(2, 'Oversized Knit Sweater', 75.00, 'Trendy oversized knit sweater perfect for fall.', 3, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop&crop=center', NULL, 19);

-- PANTS
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'High-Waisted Skinny Jeans', 55.00, 'Flattering high-waisted skinny jeans with stretch denim.', 4, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center', NULL, 22),
(4, 'Wide-Leg Trousers', 85.00, 'Elegant wide-leg trousers perfect for professional settings.', 4, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center', NULL, 14);

-- SKIRTS
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'Pencil Skirt in Navy', 45.00, 'Classic pencil skirt in navy blue for office wear.', 5, 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center', NULL, 11),
(2, 'Pleated Midi Skirt', 65.00, 'Elegant pleated midi skirt with A-line cut.', 5, 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=600&fit=crop&crop=center', NULL, 16);

-- SHOES
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(1, 'Leather Ankle Boots', 120.00, 'Classic leather ankle boots with comfortable heel.', 6, 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop&crop=center', NULL, 33),
(1, 'White Sneakers', 85.00, 'Versatile white sneakers perfect for everyday wear.', 6, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center', NULL, 27);

-- OUTERWEAR
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'Denim Jacket', 75.00, 'Classic denim jacket perfect for layering.', 7, 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop&crop=center', NULL, 18),
(4, 'Wool Blazer', 150.00, 'Professional wool blazer with tailored fit.', 7, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center', NULL, 25);

-- ACTIVEWEAR
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(5, 'Yoga Leggings', 65.00, 'Comfortable yoga leggings with moisture-wicking fabric.', 8, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center', NULL, 29),
(1, 'Sports Bra', 45.00, 'Supportive sports bra for high-impact workouts.', 8, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center', NULL, 21);

-- ACCESSORIES
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(2, 'Leather Crossbody Bag', 95.00, 'Stylish leather crossbody bag with multiple compartments.', 9, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=600&fit=crop&crop=center', NULL, 35),
(3, 'Gold Hoop Earrings', 35.00, 'Classic gold hoop earrings for any occasion.', 9, 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=600&fit=crop&crop=center', NULL, 13);

-- DENIM
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'High-Waisted Denim Shorts', 45.00, 'Trendy high-waisted denim shorts for summer.', 10, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center', NULL, 17),
(2, 'Denim Shirt', 55.00, 'Classic denim shirt perfect for layering.', 10, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center', NULL, 9);

-- LINGERIE
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'Silk Robe', 85.00, 'Luxurious silk robe perfect for lounging.', 11, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center', NULL, 24),
(2, 'Lace Bodysuit', 65.00, 'Elegant lace bodysuit for special occasions.', 11, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center', NULL, 20);

-- SWIMWEAR
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'One-Piece Swimsuit', 55.00, 'Flattering one-piece swimsuit for beach days.', 12, 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center', NULL, 26),
(2, 'Bikini Set', 45.00, 'Stylish bikini set for poolside lounging.', 12, 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center', NULL, 15);

-- MATERNITY
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'Maternity Dress', 75.00, 'Comfortable maternity dress with breathable fabric.', 13, 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=600&fit=crop&crop=center', NULL, 12),
(3, 'Maternity Jeans', 65.00, 'Comfortable maternity jeans with stretch panel.', 13, 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=600&fit=crop&crop=center', NULL, 8);

-- PLUS SIZE
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(3, 'Plus Size Maxi Dress', 85.00, 'Beautiful plus size maxi dress for any occasion.', 14, 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop&crop=center', NULL, 19),
(3, 'Plus Size Blouse', 55.00, 'Elegant plus size blouse for professional settings.', 14, 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop&crop=center', NULL, 11);

-- VINTAGE
INSERT INTO products (brand_id, title, price, description, category_id, image, seller_id, num_likes) VALUES
(6, 'Vintage Denim Jacket', 120.00, 'Authentic vintage denim jacket with unique character.', 15, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center', NULL, 32),
(6, 'Vintage Silk Scarf', 45.00, 'Beautiful vintage silk scarf with unique pattern.', 15, 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center', NULL, 14);

-- Verify the products were added
SELECT COUNT(*) as total_products FROM products; 