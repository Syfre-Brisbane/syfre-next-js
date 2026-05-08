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

  revalidateTag('wordpress');
  revalidatePath('/insights', 'layout');

  const results: Record<string, string> = {};

  try {
    const jobId = await triggerAmplifyRebuild();
    results.amplify = `rebuild started (job ${jobId})`;
  } catch (error) {
    console.error('Amplify rebuild failed:', error);
    results.amplify = 'failed';
  }

  try {
    await invalidateCloudFront(['/insights/*', '/']);
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
