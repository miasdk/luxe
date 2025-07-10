import React from 'react';
import { calculateDiscountPercentage, formatPrice, hasDiscount } from '../../../utilities/priceUtils';

const PriceDisplay = ({ 
  price, 
  originalPrice, 
  size = 'medium',
  showDiscount = true,
  className = '' 
}) => {
  const isDiscounted = hasDiscount(originalPrice, price);
  const discountPercentage = isDiscounted ? calculateDiscountPercentage(originalPrice, price) : 0;
  
  // Size classes
  const sizeClasses = {
    small: {
      current: 'text-lg font-semibold',
      original: 'text-sm',
      badge: 'text-xs px-2 py-1'
    },
    medium: {
      current: 'text-xl font-bold',
      original: 'text-base',
      badge: 'text-sm px-2.5 py-1'
    },
    large: {
      current: 'text-2xl font-bold',
      original: 'text-lg',
      badge: 'text-base px-3 py-1.5'
    }
  };
  
  const classes = sizeClasses[size] || sizeClasses.medium;
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Current Price */}
      <span className={`${classes.current} ${isDiscounted ? 'text-red-600' : 'text-gray-900'}`}>
        {formatPrice(price)}
      </span>
      
      {/* Original Price (crossed out) */}
      {isDiscounted && (
        <span className={`${classes.original} text-gray-500 line-through`}>
          {formatPrice(originalPrice)}
        </span>
      )}
      
      {/* Discount Badge */}
      {isDiscounted && showDiscount && discountPercentage > 0 && (
        <span className={`${classes.badge} bg-red-100 text-red-700 font-medium rounded-full`}>
          {discountPercentage}% off
        </span>
      )}
    </div>
  );
};

export default PriceDisplay; 