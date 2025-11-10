/**
 * Vercel Edge API Route - Proxy /chat requests to backend
 * This bypasses CORS by making server-side requests to Render
 */

export const config = {
  runtime: 'edge',
};

const BACKEND_URL = process.env.BACKEND_URL || 'https://ecommerce-scraper-aki2.onrender.com';

export default async function handler(req) {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Forward the request body to backend
    const body = await req.text();
    
    const backendResponse = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward any auth headers if present
        ...(req.headers.get('authorization') && {
          'Authorization': req.headers.get('authorization')
        }),
      },
      body: body,
      signal: AbortSignal.timeout(60000), // 60s timeout
    });

    // Get response from backend
    const data = await backendResponse.text();
    
    // Return with proper CORS headers
    return new Response(data, {
      status: backendResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to reach backend', 
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
