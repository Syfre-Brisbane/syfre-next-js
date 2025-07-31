const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8000/wp-json/wp/v2';
const WORDPRESS_USERNAME = process.env.WORDPRESS_USERNAME;
const WORDPRESS_APP_PASSWORD = process.env.WORDPRESS_APP_PASSWORD;

// Create headers (no auth needed for public endpoints)
function getHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

// Generic function to fetch from WordPress API
async function fetchWordPress(endpoint: string) {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}${endpoint}`, {
      headers: getHeaders(),
      cache: 'no-store', // Disable caching for development
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('WordPress API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        url: `${WORDPRESS_API_URL}${endpoint}`
      });
      throw new Error(`WordPress API error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('WordPress API fetch error:', error);
    throw error;
  }
}

// Test connection to WordPress API
export async function testWordPressConnection() {
  try {
    console.log('Testing WordPress connection to:', WORDPRESS_API_URL);
    const response = await fetch(WORDPRESS_API_URL.replace('/wp/v2', ''), {
      headers: getHeaders(),
    });
    
    if (!response.ok) {
      throw new Error(`Connection failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('WordPress API connection successful:', data);
    return true;
  } catch (error) {
    console.error('WordPress connection test failed:', error);
    return false;
  }
}

// Get homepage data (usually the page with slug 'home' or ID 1)
export async function getHomepageData() {
  try {
    // Try to get page with slug 'home' first
    let homepage = await fetchWordPress('/pages?slug=home');
    
    // If no 'home' slug, try common homepage slugs
    if (!homepage || homepage.length === 0) {
      const commonSlugs = ['homepage', 'front-page', 'welcome'];
      
      for (const slug of commonSlugs) {
        homepage = await fetchWordPress(`/pages?slug=${slug}`);
        if (homepage && homepage.length > 0) {
          break;
        }
      }
      
      // If still no homepage found, get the first page
      if (!homepage || homepage.length === 0) {
        const pages = await fetchWordPress('/pages?per_page=1&orderby=menu_order&order=asc');
        homepage = pages.length > 0 ? [pages[0]] : null;
      }
    }
    
    return homepage && homepage.length > 0 ? homepage[0] : null;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    throw error;
  }
}

// Get pages with ACF fields
export async function getPage(id: number) {
  return fetchWordPress(`/pages/${id}`);
}

// Get posts with ACF fields  
export async function getPosts(limit = 10) {
  return fetchWordPress(`/posts?per_page=${limit}`);
}

// Get specific post
export async function getPost(id: number) {
  return fetchWordPress(`/posts/${id}`);
}

// Get media/images
export async function getMedia(id: number) {
  return fetchWordPress(`/media/${id}`);
}