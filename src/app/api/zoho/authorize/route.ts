import { NextRequest, NextResponse } from 'next/server';
import ZohoOAuthService from '@/lib/zoho-oauth';

export async function GET(_request: NextRequest) {
  try {
    const oauthService = new ZohoOAuthService();
    const state = crypto.randomUUID(); // Generate a random state for security
    const authUrl = oauthService.getAuthorizationUrl(state);

    // In a production environment, you should store the state parameter
    // and validate it in the callback to prevent CSRF attacks
    console.log('Generated OAuth state:', state);

    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Authorization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to generate authorization URL',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}