/**
 * Vercel Edge API Route - Proxy /health requests
 */

export const config = {
  runtime: 'edge',
};

const BACKEND_URL = process.env.BACKEND_URL || 'https://ecommerce-scraper-aki2.onrender.com';

export default async function handler(req) {
  try {
    const backendResponse = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(20000),
    });

    const data = await backendResponse.text();
    
    return new Response(data, {
      status: backendResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        status: 'error',
        error: 'Backend unreachable', 
        details: error.message 
      }),
      { 
        status: 502,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}
