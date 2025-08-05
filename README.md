# Syfre Next.js Application

A modern Next.js application built for Syfre, featuring Zoho CRM integration and responsive design.

## Technology Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **Zoho CRM API** integration with OAuth 2.0
- **Source Sans 3** font from Google Fonts

## Getting Started

### Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see Environment Variables section below)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Available Scripts

- `npm run dev` - Starts Next.js development server
- `npm run build` - Creates production build
- `npm run start` - Starts production server (requires build first)
- `npm run lint` - Runs ESLint with Next.js TypeScript configuration

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Zoho OAuth Configuration
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_REDIRECT_URI=http://localhost:3000/api/zoho/callback

# WordPress API (optional)
WORDPRESS_API_URL=your_wordpress_api_url
```

## Zoho CRM Integration

This application uses Zoho CRM OAuth 2.0 for secure API access with automatic token refresh.

### Initial Setup

1. Create a Zoho Developer Console application at https://api-console.zoho.com/
2. Configure OAuth scopes: `ZohoCRM.modules.ALL`
3. Set redirect URI to match your environment
4. Add client ID and secret to environment variables

### Authorization Process

1. Visit `/api/zoho/auth` to start OAuth flow
2. Complete authorization in Zoho
3. Tokens are automatically managed and refreshed

### Production Considerations

- Update `ZOHO_REDIRECT_URI` to production domain
- Reauthorize Zoho after changing redirect URI
- Ensure environment variables are set in production

## Deployment to AWS Amplify

### Prerequisites

1. GitHub repository with your code
2. AWS account with Amplify access
3. Environment variables configured

### Deployment Steps

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect your GitHub repository
   - Select the main branch

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Base directory: `/` (root)
   - Build output directory: `.next`
   - Node.js version: `18` or `20`

3. **Set Environment Variables**
   - In Amplify console, go to App settings → Environment variables
   - Add all variables from your `.env.local`:
     ```
     ZOHO_CLIENT_ID=your_production_client_id
     ZOHO_CLIENT_SECRET=your_production_client_secret
     ZOHO_REDIRECT_URI=https://your-domain.amplifyapp.com/api/zoho/callback
     ```

4. **Deploy**
   - Click "Save and deploy"
   - Wait for build to complete

### Post-Deployment

1. **Update Zoho Redirect URI**
   - Go to Zoho Developer Console
   - Update redirect URI to: `https://your-domain.amplifyapp.com/api/zoho/callback`

2. **Reauthorize Zoho**
   - Visit: `https://your-domain.amplifyapp.com/api/zoho/auth`
   - Complete OAuth flow with new production domain

3. **Test Integration**
   - Test contact form submission
   - Verify leads are created in Zoho CRM

## Project Structure

```
src/
├── app/
│   ├── api/zoho/          # Zoho API routes
│   ├── contact/           # Contact page
│   ├── privacy-policy/    # Privacy policy page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/
│   └── zoho-oauth.ts     # Zoho OAuth service
└── types/                # TypeScript definitions
```

## Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **OAuth Security**: Secure Zoho integration with token refresh
- **Form Handling**: Contact form with Zoho CRM lead creation
- **SEO Optimized**: Proper meta tags and structure
- **Type Safety**: Full TypeScript implementation

## Troubleshooting

### Common Issues

1. **Zoho Authorization Fails**
   - Check redirect URI matches exactly
   - Verify client ID and secret
   - Ensure scopes are correctly configured

2. **Build Errors**
   - Run `npm run lint` to check for issues
   - Verify all environment variables are set
   - Check for TypeScript errors

3. **Mobile Layout Issues**
   - Test responsive breakpoints (sm: 640px+)
   - Verify overflow-x: hidden is applied
   - Check Tailwind classes are valid

### Support

For deployment assistance or technical issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [Zoho CRM API Documentation](https://www.zoho.com/crm/developer/docs/)