/**
 * Collection Service - Handles both algorithmic and user-generated collections
 */
import { API_BASE_URL } from '../config/api.js';
import productService from './productService.js';

/**
 * Generate dynamic collections using smart algorithms
 */
const generateAlgorithmicCollections = async () => {
    try {
        const products = await productService.fetchAllProducts();
        
        if (!products || products.length === 0) {
            return {};
        }

        // Define collection algorithms
        const collections = {
            "trending_hits": generateTrendingCollection(products),
            "hidden_gems": generateHiddenGemsCollection(products),
            "style_steals": generateStyleStealsCollection(products),
            "fresh_drops": generateFreshDropsCollection(products),
            "curator_picks": generateCuratorPicksCollection(products),
            "weekend_vibes": generateWeekendVibesCollection(products),
            "investment_pieces": generateInvestmentPiecesCollection(products)
        };

        return collections;
    } catch (error) {
        console.error('Error generating algorithmic collections:', error);
        return {};
    }
};

/**
 * Trending Hits - High engagement items
 */
const generateTrendingCollection = (products) => {
    const scored = products.map(product => {
        let score = 0;
        
        // Likes momentum (recent likes weighted more)
        score += (product.num_likes || 0) * 2;
        
        // Price range sweet spot
        const price = parseFloat(product.price || 0);
        if (price >= 25 && price <= 150) score += 10;
        
        // Brand recognition
        const trendingBrands = ['Nike', 'Zara', 'Vintage', 'H&M', 'Urban Outfitters'];
        if (trendingBrands.some(brand => (product.brand_name || '').includes(brand))) {
            score += 15;
        }
        
        // Category popularity
        const hotCategories = ['Tops', 'Dresses', 'Sneakers', 'Jackets'];
        if (hotCategories.includes(product.category_name)) score += 8;
        
        return { ...product, score };
    });
    
    return {
        id: 'trending_hits',
        title: 'Trending Hits',
        description: 'The most loved items right now',
        type: 'algorithmic',
        products: scored.sort((a, b) => b.score - a.score).slice(0, 20),
        metadata: {
            updated: new Date().toISOString(),
            criteria: 'engagement + pricing + brand recognition'
        }
    };
};

/**
 * Hidden Gems - Quality items with low engagement
 */
const generateHiddenGemsCollection = (products) => {
    const gems = products.filter(product => {
        const likes = product.num_likes || 0;
        const price = parseFloat(product.price || 0);
        const hasImage = product.image && product.image.trim() !== '';
        
        // Low likes but good quality indicators
        return likes < 3 && price >= 20 && hasImage && product.brand_name;
    }).map(product => {
        let score = 0;
        
        // Quality indicators
        if (product.image) score += 10;
        if (product.brand_name) score += 8;
        if (product.description && product.description.length > 50) score += 5;
        
        // Reasonable pricing
        const price = parseFloat(product.price || 0);
        if (price >= 20 && price <= 80) score += 15;
        
        return { ...product, score };
    });
    
    return {
        id: 'hidden_gems',
        title: 'Hidden Gems',
        description: 'Quality finds waiting to be discovered',
        type: 'algorithmic',
        products: gems.sort((a, b) => b.score - a.score).slice(0, 15),
        metadata: {
            updated: new Date().toISOString(),
            criteria: 'quality + low engagement + fair pricing'
        }
    };
};

/**
 * Style Steals - Best value propositions
 */
const generateStyleStealsCollection = (products) => {
    const steals = products.filter(product => {
        const price = parseFloat(product.price || 0);
        return price > 0 && price < 60; // Affordable range
    }).map(product => {
        let score = 0;
        const price = parseFloat(product.price || 0);
        
        // Better score for lower prices
        score += Math.max(0, 60 - price);
        
        // Brand bonus
        if (product.brand_name) score += 10;
        
        // Condition bonus
        if (product.condition_name && ['New', 'Like New', 'Excellent'].includes(product.condition_name)) {
            score += 15;
        }
        
        return { ...product, score };
    });
    
    return {
        id: 'style_steals',
        title: 'Style Steals',
        description: 'Amazing style, incredible prices',
        type: 'algorithmic',
        products: steals.sort((a, b) => b.score - a.score).slice(0, 20),
        metadata: {
            updated: new Date().toISOString(),
            criteria: 'price under $60 + condition + brand'
        }
    };
};

/**
 * Fresh Drops - Recently listed items
 */
const generateFreshDropsCollection = (products) => {
    const fresh = products.filter(product => {
        if (!product.created_at) return false;
        
        const daysOld = (Date.now() - new Date(product.created_at)) / (1000 * 60 * 60 * 24);
        return daysOld <= 7; // Within last week
    }).map(product => {
        let score = 0;
        
        const daysOld = (Date.now() - new Date(product.created_at)) / (1000 * 60 * 60 * 24);
        
        // Newer = higher score
        score += Math.max(0, 10 - daysOld);
        
        // Quality indicators
        if (product.image) score += 8;
        if (product.brand_name) score += 5;
        
        return { ...product, score };
    });
    
    return {
        id: 'fresh_drops',
        title: 'Fresh Drops',
        description: 'Just listed this week',
        type: 'algorithmic',
        products: fresh.sort((a, b) => b.score - a.score).slice(0, 18),
        metadata: {
            updated: new Date().toISOString(),
            criteria: 'recency + image quality + brand'
        }
    };
};

/**
 * Curator Picks - Platform team highlights
 */
const generateCuratorPicksCollection = (products) => {
    // Use existing featured product algorithm but for multiple items
    const scored = products.map(product => {
        let score = 0;
        
        // Core brands get priority
        const coreBrands = ['Nike', 'Zara', 'H&M', 'Gap', 'Lululemon', 'J.Crew'];
        if (product.brand_name && coreBrands.includes(product.brand_name)) {
            score += 20;
        }
        
        // Popular categories
        const popularCategories = ['Tops', 'Dresses', 'Shoes', 'Accessories'];
        if (product.category_name && popularCategories.includes(product.category_name)) {
            score += 15;
        }
        
        // Engagement
        if (product.num_likes) {
            score += Math.min(Math.log10(product.num_likes + 1) * 8, 25);
        }
        
        // Image quality
        if (product.image && product.image.trim() !== '') {
            score += 15;
        }
        
        return { ...product, score };
    });
    
    return {
        id: 'curator_picks',
        title: 'Curator Picks',
        description: 'Hand-selected favorites from our team',
        type: 'algorithmic',
        products: scored.sort((a, b) => b.score - a.score).slice(0, 12),
        metadata: {
            updated: new Date().toISOString(),
            criteria: 'core brands + popularity + engagement + quality'
        }
    };
};

/**
 * Weekend Vibes - Casual, comfort-focused pieces
 */
const generateWeekendVibesCollection = (products) => {
    const weekendKeywords = ['casual', 'comfort', 'relax', 'weekend', 'cozy', 'soft', 'loose'];
    const weekendCategories = ['Loungewear', 'T-Shirts', 'Hoodies', 'Sneakers', 'Jeans'];
    
    const vibes = products.filter(product => {
        const title = (product.title || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        const category = product.category_name || '';
        
        const hasKeyword = weekendKeywords.some(keyword => 
            title.includes(keyword) || description.includes(keyword)
        );
        
        const isWeekendCategory = weekendCategories.includes(category);
        
        return hasKeyword || isWeekendCategory;
    }).map(product => {
        let score = Math.random() * 5; // Add variety
        
        // Price preference for weekend items
        const price = parseFloat(product.price || 0);
        if (price >= 15 && price <= 80) score += 10;
        
        return { ...product, score };
    });
    
    return {
        id: 'weekend_vibes',
        title: 'Weekend Vibes',
        description: 'Comfort meets style for your downtime',
        type: 'algorithmic',
        products: vibes.sort((a, b) => b.score - a.score).slice(0, 16),
        metadata: {
            updated: new Date().toISOString(),
            criteria: 'casual keywords + weekend categories + price range'
        }
    };
};

/**
 * Investment Pieces - Higher-value, quality items
 */
const generateInvestmentPiecesCollection = (products) => {
    const luxury = products.filter(product => {
        const price = parseFloat(product.price || 0);
        return price >= 100; // Higher price threshold
    }).map(product => {
        let score = 0;
        const price = parseFloat(product.price || 0);
        
        // Price indicates quality (up to a point)
        score += Math.min(price * 0.1, 30);
        
        // Brand matters more for investment pieces
        const luxuryBrands = ['Coach', 'Gucci', 'Prada', 'Burberry', 'Nike', 'Lululemon'];
        if (product.brand_name && luxuryBrands.some(brand => 
            (product.brand_name || '').includes(brand))) {
            score += 25;
        }
        
        // Condition is crucial
        if (product.condition_name && ['New', 'Like New'].includes(product.condition_name)) {
            score += 20;
        }
        
        return { ...product, score };
    });
    
    return {
        id: 'investment_pieces',
        title: 'Investment Pieces',
        description: 'Quality items that last and hold value',
        type: 'algorithmic',
        products: luxury.sort((a, b) => b.score - a.score).slice(0, 10),
        metadata: {
            updated: new Date().toISOString(),
            criteria: 'price threshold + luxury brands + condition'
        }
    };
};

/**
 * User-Generated Collections API
 */
const createUserCollection = async (collectionData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/collections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(collectionData)
        });
        
        if (!response.ok) throw new Error('Failed to create collection');
        return await response.json();
    } catch (error) {
        console.error('Error creating collection:', error);
        throw error;
    }
};

const getUserCollections = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/collections/user/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user collections');
        return await response.json();
    } catch (error) {
        console.error('Error fetching user collections:', error);
        throw error;
    }
};

const getPublicCollections = async (limit = 20) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/collections/public?limit=${limit}`);
        if (!response.ok) throw new Error('Failed to fetch public collections');
        return await response.json();
    } catch (error) {
        console.error('Error fetching public collections:', error);
        throw error;
    }
};

const followCollection = async (collectionId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/collections/${collectionId}/follow`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        if (!response.ok) throw new Error('Failed to follow collection');
        return await response.json();
    } catch (error) {
        console.error('Error following collection:', error);
        throw error;
    }
};

export default {
    generateAlgorithmicCollections,
    createUserCollection,
    getUserCollections,
    getPublicCollections,
    followCollection
}; 