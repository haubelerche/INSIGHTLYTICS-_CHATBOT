// Base URL resolution with Vercel Edge proxy support
// 
// In production (Vercel deploy): Use /api proxy routes (no CORS issues)
// In development with proxy: Use Vite proxy (VITE_USE_PROXY=1)
// In development without proxy: Use explicit backend URL or localhost
//
// Priority:
// 1. Production → '' (use Vercel /api routes via relative paths)
// 2. Dev + VITE_USE_PROXY=1 → '' (use Vite proxy)
// 3. VITE_API_URL (explicit backend URL)
// 4. Dev fallback → localhost:8000

const USE_DEV_PROXY = !!(import.meta.env.DEV && import.meta.env.VITE_USE_PROXY === '1');
const USE_VERCEL_PROXY = import.meta.env.PROD; // In production, always use /api routes

const rawEnv = (USE_DEV_PROXY || USE_VERCEL_PROXY)
  ? '' // Relative paths → proxy handles routing
  : (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim())
    || (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim())
    || 'http://localhost:8000'; // Dev fallback

const NORMALIZED_BASE = rawEnv.replace(/\/+$/, '');

export const API_CONFIG = {
  // Backend base URL (no trailing slash)
  BASE_URL: NORMALIZED_BASE,
  
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
