// Use NEXT_PUBLIC_ for client-side access, fallback to server-side env var
const getWordPressApiUrl = () => {
  return 'https://api.syfre.ai/wp-json/wp/v2';
  //TODO let environemnt variables handle this
};

const WORDPRESS_API_URL = getWordPressApiUrl();


// Create headers (no auth needed for public endpoints)
function getHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

// Function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&hellip;': '…',
    '&nbsp;': ' ',
  };
  
  return text.replace(/&[#\w]+;/g, (entity) => {
    return entities[entity] || entity;
  });
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

// Get post by slug
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const posts: WordPressPostResponse[] = await fetchWordPress(`/posts?slug=${slug}&_embed`);
    if (posts && posts.length > 0) {
      const post = posts[0];
      return {
        id: post.id,
        title: decodeHtmlEntities(post.title.rendered),
        content: post.content.rendered,
        excerpt: decodeHtmlEntities(post.excerpt.rendered.replace(/<[^>]*>/g, '')),
        date: new Date(post.date).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        slug: post.slug,
        categories: post._embedded?.['wp:term']?.[0] || [],
        featured_media: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Get media/images
export async function getMedia(id: number) {
  return fetchWordPress(`/media/${id}`);
}

// Get recent articles for homepage
export async function getRecentArticles(limit = 3): Promise<WordPressArticle[]> {
  try {
    const posts: WordPressPostResponse[] = await fetchWordPress(`/posts?per_page=${limit}&orderby=date&order=desc&_embed`);
    return posts.map((post) => ({
      id: post.id,
      title: decodeHtmlEntities(post.title.rendered),
      excerpt: decodeHtmlEntities(post.excerpt.rendered.replace(/<[^>]*>/g, '')), // Strip HTML tags and decode entities
      date: new Date(post.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      slug: post.slug,
      categories: post._embedded?.['wp:term']?.[0] || [],
      featured_media: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
    }));
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    console.error('WordPress API URL being used:', WORDPRESS_API_URL);
    console.error('Full fetch URL was:', `${WORDPRESS_API_URL}/posts?per_page=${limit}&orderby=date&order=desc&_embed`);
    // Return empty array in case of error
    return [];
  }
}

// WordPress API response types
export interface WordPressTitle {
  rendered: string;
}

export interface WordPressContent {
  rendered: string;
}

export interface WordPressExcerpt {
  rendered: string;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WordPressFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
}

export interface WordPressEmbedded {
  'wp:term'?: WordPressCategory[][];
  'wp:featuredmedia'?: WordPressFeaturedMedia[];
}

export interface WordPressPostResponse {
  id: number;
  title: WordPressTitle;
  content: WordPressContent;
  excerpt: WordPressExcerpt;
  date: string;
  slug: string;
  _embedded?: WordPressEmbedded;
}

// Processed types for our app
export interface WordPressArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  categories: { name: string }[];
  featured_media: string | null;
}

export interface WordPressPost extends WordPressArticle {
  content: string;
}