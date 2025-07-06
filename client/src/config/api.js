// Centralized API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ecart-mxsk.onrender.com';

console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_BASE_URL,
  NODE_ENV: import.meta.env.NODE_ENV
});

export { API_BASE_URL }; 