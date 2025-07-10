-- Update category images in Railway PostgreSQL database
-- Run this in Railway CLI: railway connect
-- Then copy and paste this script

-- DRESSES - Elegant dress image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Dresses';

-- TOPS - Blouse/shirt image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1564257631407-3deb5d241c4b?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Tops';

-- SWEATERS - Cozy sweater image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Sweaters';

-- PANTS - Jeans/trousers image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Pants';

-- SKIRTS - Skirt image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Skirts';

-- SHOES - Shoe image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Shoes';

-- OUTERWEAR - Jacket/coat image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Outerwear';

-- ACTIVEWEAR - Athletic wear image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Activewear';

-- ACCESSORIES - Handbag/jewelry image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Accessories';

-- DENIM - Denim clothing image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Denim';

-- LINGERIE - Lingerie image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Lingerie';

-- SWIMWEAR - Swimsuit image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Swimwear';

-- MATERNITY - Maternity clothing image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Maternity';

-- PLUS SIZE - Plus size clothing image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Plus Size';

-- VINTAGE - Vintage clothing image
UPDATE categories 
SET image = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop&crop=center' 
WHERE name = 'Vintage';

-- Verify the updates
SELECT name, image FROM categories ORDER BY name; 