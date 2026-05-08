import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'syfre-revalidate-2026';
const CLOUDFRONT_DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID || 'EUB1KLL6L8KAI';

async function invalidateCloudFront(paths: string[]) {
  const client = new CloudFrontClient({ region: 'ap-southeast-2' });
  await client.send(new CreateInvalidationCommand({
    DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: `revalidate-${Date.now()}`,
      Paths: {
        Quantity: paths.length,
        Items: paths,
      },
    },
  }));
}

async function handleRevalidate(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('wordpress');
  revalidatePath('/insights', 'layout');

  try {
    await invalidateCloudFront(['/insights/*']);
  } catch (error) {
    console.error('CloudFront invalidation failed:', error);
    return NextResponse.json({ revalidated: true, cloudfront: 'failed', now: Date.now() });
  }

  return NextResponse.json({ revalidated: true, cloudfront: 'invalidated', now: Date.now() });
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}
