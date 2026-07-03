import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { AmplifyClient, StartJobCommand } from '@aws-sdk/client-amplify';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'syfre-revalidate-2026';
// syfre-next-js app (serves syfre.ai). The previous default (d1058331pi6lxg)
// was a different app entirely — webhook rebuilds never touched this site.
const AMPLIFY_APP_ID = process.env.AMPLIFY_APP_ID || 'd1as6cm94gf3nw';
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
  revalidatePath('/', 'page'); // homepage renders the 3 latest posts
  revalidatePath('/insights', 'layout');
  revalidatePath('/sitemap.xml');

  // Revalidate the specific article path if we have a slug
  if (postSlug) {
    revalidatePath(`/insights/${postSlug}`);
  }

  const isUnpublished = postStatus && postStatus !== 'publish';

  const results: Record<string, string | null> = {};

  if (postSlug) {
    results.slug = postSlug;
    results.status = postStatus;
    results.action = isUnpublished ? 'unpublished' : 'published/updated';
  }

  // The rebuild redeploys the site, which also flushes Amplify's managed
  // CloudFront cache. (That CDN is AWS-managed and cannot be invalidated via
  // the CloudFront API — the invalidation code previously here targeted a
  // defunct distribution left over from the pre-Next.js S3 site.)
  try {
    const jobId = await triggerAmplifyRebuild();
    results.amplify = `rebuild started (job ${jobId})`;
  } catch (error) {
    console.error('Amplify rebuild failed:', error);
    results.amplify = 'failed';
  }

  return NextResponse.json({ revalidated: true, ...results, now: Date.now() });
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}
