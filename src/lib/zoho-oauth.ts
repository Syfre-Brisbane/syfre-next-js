interface ZohoTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

interface ZohoTokenStorage {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

class ZohoOAuthService {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private apiDomain: string;
  private accountsUrl: string;

  constructor() {
    // Support both client-side (NEXT_PUBLIC_) and server-side environment variables
    this.clientId = process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID || process.env.ZOHO_CLIENT_ID || '';
    this.clientSecret = process.env.NEXT_PUBLIC_ZOHO_CLIENT_SECRET || process.env.ZOHO_CLIENT_SECRET || '';
    this.redirectUri = process.env.NEXT_PUBLIC_ZOHO_REDIRECT_URI || process.env.ZOHO_REDIRECT_URI || 'http://localhost:3000/api/zoho/callback';
    this.apiDomain = process.env.NEXT_PUBLIC_ZOHO_API_DOMAIN || process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.com';
    this.accountsUrl = process.env.NEXT_PUBLIC_ZOHO_ACCOUNTS_URL || process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.com';

    // Debug logging
    console.log('Zoho OAuth Configuration:', {
      clientId: this.clientId ? 'SET' : 'MISSING',
      clientSecret: this.clientSecret ? 'SET' : 'MISSING',
      redirectUri: this.redirectUri,
      isClient: typeof window !== 'undefined',
      env: process.env.NODE_ENV
    });

    if (!this.clientId || !this.clientSecret) {
      throw new Error('Zoho OAuth credentials not configured. Please set ZOHO_CLIENT_ID and ZOHO_CLIENT_SECRET (or NEXT_PUBLIC_ versions) environment variables.');
    }
  }

  getAuthorizationUrl(state?: string): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      scope: 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL',
      redirect_uri: this.redirectUri,
      access_type: 'offline',
      ...(state && { state }),
    });

    return `${this.accountsUrl}/oauth/v2/auth?${params.toString()}`;
  }

  async exchangeCodeForTokens(code: string): Promise<ZohoTokens> {
    const response = await fetch(`${this.accountsUrl}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
        code,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to exchange code for tokens: ${error}`);
    }

    return response.json();
  }

  async refreshAccessToken(refreshToken: string): Promise<ZohoTokens> {
    const response = await fetch(`${this.accountsUrl}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to refresh token: ${error}`);
    }

    return response.json();
  }

  private getStoredTokens(): ZohoTokenStorage | null {
    const accessToken = process.env.NEXT_PUBLIC_ZOHO_ACCESS_TOKEN || process.env.ZOHO_ACCESS_TOKEN;
    const refreshToken = process.env.NEXT_PUBLIC_ZOHO_REFRESH_TOKEN || process.env.ZOHO_REFRESH_TOKEN;
    const expiresAt = process.env.NEXT_PUBLIC_ZOHO_TOKEN_EXPIRES_AT || process.env.ZOHO_TOKEN_EXPIRES_AT;

    if (!accessToken || !refreshToken || !expiresAt) {
      return null;
    }

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: parseInt(expiresAt, 10),
    };
  }

  private isTokenExpired(expiresAt: number): boolean {
    const now = Math.floor(Date.now() / 1000);
    const buffer = 300; // 5 minutes buffer
    return now >= (expiresAt - buffer);
  }

  async getValidAccessToken(): Promise<string> {
    const storedTokens = this.getStoredTokens();
    
    if (!storedTokens) {
      throw new Error('No tokens found. Please complete OAuth authorization first.');
    }

    // If token is not expired, return it
    if (!this.isTokenExpired(storedTokens.expires_at)) {
      return storedTokens.access_token;
    }

    // Token is expired, refresh it
    try {
      const newTokens = await this.refreshAccessToken(storedTokens.refresh_token);
      
      // Note: In a production environment, you would want to persist these tokens
      // to a database or secure storage instead of environment variables
      console.log('Token refreshed successfully. Please update your environment variables:');
      console.log(`ZOHO_ACCESS_TOKEN=${newTokens.access_token}`);
      console.log(`ZOHO_TOKEN_EXPIRES_AT=${Math.floor(Date.now() / 1000) + newTokens.expires_in}`);
      
      return newTokens.access_token;
    } catch (error) {
      throw new Error(`Failed to refresh token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async makeAuthenticatedRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = await this.getValidAccessToken();
    
    return fetch(`${this.apiDomain}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }
}

export default ZohoOAuthService;