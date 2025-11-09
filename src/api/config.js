export const API_CONFIG = {
  // Backend base URL
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  
  // API endpoints (matches your actual backend)
  ENDPOINTS: {
    // Main chat/query endpoints
    CHAT: '/chat',
    QUERY: '/query',
    
    // Database
    DB_STRUCTURE: '/db-structure',
    HEALTH_DATA: '/api/health_data',
    
    // Reviews
    REVIEWS: '/api/reviews',
    CREATE_REVIEW: '/api/reviews',
    
    // Tiki scraping
    SCRAPE_TIKI: '/api/scrape/tiki',
    SCRAPE_TIKI_CATEGORY: '/api/scrape/tiki/category',
    SCRAPE_TIKI_ELECTRONICS: '/api/scrape/tiki/electronics',
    
    // Electronics
    ELECTRONICS_CATEGORIES: '/api/electronics/categories',
    
    // Legacy (may not exist on your backend)
    TEXT_TO_SQL: '/api/text2sql',
  },

  // Request timeout (ms)
  TIMEOUT: 30000,

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // ms
  },

  // CORS settings
  CORS_MODE: 'cors',
  CREDENTIALS: 'include',
};

export default API_CONFIG;
