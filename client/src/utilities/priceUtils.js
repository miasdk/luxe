/**
 * Calculate discount percentage between original and current price
 * @param {number} originalPrice - The original price
 * @param {number} currentPrice - The current price
 * @returns {number} - Discount percentage (rounded to nearest integer)
 */
export const calculateDiscountPercentage = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return 0;
  }
  
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Format price with currency symbol
 * @param {number} price - Price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  if (price === null || price === undefined) return '';
  return `$${parseFloat(price).toFixed(2)}`;
};

/**
 * Check if a product has a discount
 * @param {number} originalPrice - The original price
 * @param {number} currentPrice - The current price
 * @returns {boolean} - True if there's a discount
 */
export const hasDiscount = (originalPrice, currentPrice) => {
  return originalPrice && currentPrice && originalPrice > currentPrice;
}; 