import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { AmplifyClient, StartJobCommand } from '@aws-sdk/client-amplify';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'syfre-revalidate-2026';
const CLOUDFRONT_DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID || 'EUB1KLL6L8KAI';
const AMPLIFY_APP_ID = process.env.AMPLIFY_APP_ID || 'd1058331pi6lxg';
const AMPLIFY_BRANCH = process.env.AMPLIFY_BRANCH || 'main';

async function triggerAmplifyRebuild() {
  const client = new AmplifyClient({ region: 'ap-southeast-2' });
  const result = await client.send(new StartJobCommand({
    appId: AMPLIFY_APP_ID,
    branchName: AMPLIFY_BRANCH,
    jobType: 'RELEASE',
  }));
  return result.jobSummary?.jobId;
}

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

  // Parse webhook payload if present (POST with body)
  let postSlug: string | null = null;
  let postStatus: string | null = null;

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      postSlug = body?.post?.post_name || null;
      postStatus = body?.post?.post_status || null;
    } catch {
      // No body or invalid JSON — proceed with general revalidation
    }
  }

  revalidateTag('wordpress');
  revalidatePath('/insights', 'layout');
  revalidatePath('/sitemap.xml');

  // Revalidate the specific article path if we have a slug
  if (postSlug) {
    revalidatePath(`/insights/${postSlug}`);
  }

  const isUnpublished = postStatus && postStatus !== 'publish';
  const cloudfrontPaths = ['/insights/*', '/', '/sitemap.xml'];

  // If a specific article was unpublished/deleted, also invalidate its path
  if (postSlug && isUnpublished) {
    cloudfrontPaths.push(`/insights/${postSlug}`);
  }

  const results: Record<string, string | null> = {};

  if (postSlug) {
    results.slug = postSlug;
    results.status = postStatus;
    results.action = isUnpublished ? 'unpublished' : 'published/updated';
  }

  try {
    const jobId = await triggerAmplifyRebuild();
    results.amplify = `rebuild started (job ${jobId})`;
  } catch (error) {
    console.error('Amplify rebuild failed:', error);
    results.amplify = 'failed';
  }

  try {
    await invalidateCloudFront(cloudfrontPaths);
    results.cloudfront = 'invalidated';
  } catch (error) {
    console.error('CloudFront invalidation failed:', error);
    results.cloudfront = 'failed';
  }

  return NextResponse.json({ revalidated: true, ...results, now: Date.now() });
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}
