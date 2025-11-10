/**
 * Vercel Edge API Route - Proxy /query requests
 */

export const config = {
  runtime: 'edge',
};

const BACKEND_URL = process.env.BACKEND_URL || 'https://ecommerce-scraper-aki2.onrender.com';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.text();
    
    const backendResponse = await fetch(`${BACKEND_URL}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
      signal: AbortSignal.timeout(30000),
    });

    const data = await backendResponse.text();
    
    return new Response(data, {
      status: backendResponse.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
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
