import { NextRequest, NextResponse } from 'next/server';
import ZohoOAuthService from '@/lib/zoho-oauth';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const _state = searchParams.get('state');

  if (error) {
    console.error('OAuth error:', error);
    return NextResponse.json(
      { success: false, message: `OAuth error: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { success: false, message: 'Authorization code not provided' },
      { status: 400 }
    );
  }

  try {
    const oauthService = new ZohoOAuthService();
    const tokens = await oauthService.exchangeCodeForTokens(code);

    const expiresAt = Math.floor(Date.now() / 1000) + tokens.expires_in;

    // In a production environment, you would want to securely store these tokens
    // in a database or secure storage system instead of logging them
    console.log('\n=== ZOHO OAUTH TOKENS ===');
    console.log('Copy these values to your .env.local file:');
    console.log('');
    console.log(`ZOHO_ACCESS_TOKEN=${tokens.access_token}`);
    console.log(`ZOHO_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log(`ZOHO_TOKEN_EXPIRES_AT=${expiresAt}`);
    console.log('');
    console.log('========================');

    return NextResponse.json({
      success: true,
      message: 'OAuth tokens received successfully! Check server logs for token values.',
      tokens: {
        access_token: tokens.access_token.substring(0, 10) + '...', // Only show first 10 chars for security
        refresh_token: tokens.refresh_token.substring(0, 10) + '...',
        expires_at: expiresAt,
        scope: tokens.scope,
      },
    });
  } catch (error) {
    console.error('Token exchange error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to exchange authorization code for tokens',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}