import { NextRequest, NextResponse } from 'next/server';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { syncHubspotLead } from '@/lib/hubspot';

const TO_EMAIL = process.env.LEAD_TO_EMAIL || 'steve.macfarlane@syfre.ai';
const FROM_EMAIL = process.env.LEAD_FROM_EMAIL || 'steve.macfarlane@syfre.ai';

// Amplify reserves the AWS_* env var prefix, so explicit credentials use SES_*.
// When unset, the SDK falls back to the default credential chain (compute role).
const sesClient = new SESv2Client({
  region: process.env.SES_REGION || 'ap-southeast-2',
  credentials:
    process.env.SES_AWS_ACCESS_KEY_ID && process.env.SES_AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

// Ops alert over the same SES channel. Best-effort: used to flag a lead that was
// emailed but failed to reach HubSpot, so a silent CRM gap surfaces immediately.
async function alertOps(subject: string, body: string): Promise<void> {
  await sesClient.send(
    new SendEmailCommand({
      FromEmailAddress: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      Content: { Simple: { Subject: { Data: `[Lead ops] ${subject}` }, Body: { Text: { Data: body } } } },
    })
  );
}

// Shared Google spreadsheet — the tell of one backlink-spam wave ("I put my
// list into a spreadsheet"). Blocked even as a single link; it has no place in
// a genuine first-contact enquiry.
const GOOGLE_SHEET_REGEX = /(?:docs\.google\.com\/spreadsheets|sheets\.google\.com)/i;

// Counts whole links (the https:// branch also swallows a leading www., so a
// URL is never double-counted). Used only for the multi-link threshold below.
const LINK_REGEX = /https?:\/\/\S+|\bwww\.\S+/gi;

// We deliberately DON'T block links in general — a real prospect may paste their
// own site (and maybe a LinkedIn). But a message carrying THREE OR MORE links is
// a site list (guest-post / backlink spam), not an enquiry.
const MAX_LINKS = 2;

// Returns a reason string if the submission looks like spam, otherwise null.
// Blocked submissions are dropped silently (see POST) rather than 400'd, so the
// bot gets no signal to adapt to.
function spamReason(fields: { honeypot: string; blob: string }): string | null {
  // Honeypot: a hidden field no human sees. Any value means a bot filled it.
  if (fields.honeypot) return 'honeypot filled';
  // Shared Google spreadsheet in the message/name/company — backlink-spam tell.
  if (GOOGLE_SHEET_REGEX.test(fields.blob)) return 'google sheet link';
  // A list of links — guest-post / link-selling spam.
  const linkCount = (fields.blob.match(LINK_REGEX) || []).length;
  if (linkCount > MAX_LINKS) return `${linkCount} links`;
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const lead = await request.json();

    const firstName = String(lead.First_Name || '').trim();
    const lastName = String(lead.Last_Name || '').trim();
    const email = String(lead.Email || '').trim();
    const phone = String(lead.Phone || '').trim();
    const company = String(lead.Company || '').trim();
    const description = String(lead.Description || '').trim();
    const leadSource = String(lead.Lead_Source || 'Website').trim();
    // Decoy field, hidden from real users; only bots populate it.
    const honeypot = String(lead.Website || '').trim();
    // The prospect's own domain to audit (GEO landing) — NOT the honeypot above.
    const auditWebsite = String(lead.Audit_Website || '').trim();
    // Pre-built context string from the GEO teaser (verdict + prompt), for CRM.
    const teaserContext = String(lead.Teaser_Context || '').trim();
    // Client-captured UTM/referrer summary — free text, so cap + strip newlines.
    const attribution = String(lead.Attribution || '').replace(/[\r\n]+/g, ' ').trim().slice(0, 300);

    // Classify the enquiry so Snapshot requests (a fulfilment commitment) get
    // different handling from a general contact-form message. Drives both the
    // HubSpot "Enquiry type" tag and the action-flagged alert below.
    const isWorkshop = lead.Workshop_Application === true;
    const enquiryType = isWorkshop
      ? 'workshop_application'
      : /snapshot|geo/i.test(leadSource)
        ? 'ai_visibility_snapshot'
        : /contact form/i.test(leadSource)
          ? 'website_contact_form'
          : 'other';
    const isSnapshot = enquiryType === 'ai_visibility_snapshot';

    // Drop spam silently: return success so the bot sees no error and doesn't
    // retry/adapt, but never send the email. Logged to CloudWatch so a genuine
    // lead caught by a heuristic is still recoverable.
    const reason = spamReason({
      honeypot,
      blob: [description, firstName, lastName, company].join(' '),
    });
    if (reason) {
      console.warn(
        `Lead blocked (${reason}): ${JSON.stringify({ firstName, lastName, email, phone, company, leadSource, description })}`
      );
      return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!firstName && !lastName) {
      return NextResponse.json(
        { success: false, message: 'A name is required.' },
        { status: 400 }
      );
    }

    const name = [firstName, lastName].filter(Boolean).join(' ');

    const lines = [
      isSnapshot && '⚠️ ACTION NEEDED: AI Visibility Snapshot requested — this prospect is expecting a report back.\n',
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      company && `Company: ${company}`,
      `Source: ${leadSource}`,
      attribution && `Traffic source: ${attribution}`,
      isWorkshop && 'Workshop application: yes',
      description && `\n${description}`,
    ].filter(Boolean);

    const subject = isSnapshot
      ? `[ACTION] AI Visibility Snapshot request: ${name} — deliver Snapshot`
      : `New lead: ${name} — ${leadSource}`;

    await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: FROM_EMAIL,
        Destination: { ToAddresses: [TO_EMAIL] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: subject },
            Body: { Text: { Data: lines.join('\n') } },
          },
        },
      })
    );

    // Mirror the lead into HubSpot (best-effort). No-ops until HUBSPOT_TOKEN is
    // set. The SES email above already captured the lead, so any failure here is
    // logged + alerted but never fails the request.
    const note = [
      description,
      `Lead source: ${leadSource}`,
      attribution && `Traffic source: ${attribution}`,
      auditWebsite && `Website to audit: ${auditWebsite}`,
      teaserContext && `\nAI visibility teaser shown:\n${teaserContext}`,
    ]
      .filter(Boolean)
      .join('\n');
    const hs = await syncHubspotLead({
      email,
      firstName,
      lastName,
      phone: phone || undefined,
      website: auditWebsite || undefined,
      company: company || undefined,
      leadSource,
      enquiryType,
      note: note || undefined,
    });
    if (hs.ok && !hs.skipped) {
      console.log(JSON.stringify({ level: 'info', event: 'hubspot.synced', email, contactId: hs.contactId, noteCreated: hs.noteCreated }));
    } else if (!hs.ok) {
      console.error(JSON.stringify({ level: 'error', event: 'hubspot.sync_failed', email, status: hs.status, err: hs.error }));
      await alertOps(
        'HubSpot sync failed',
        `A lead was emailed OK but did NOT reach HubSpot.\n\nEmail: ${email}\nSource: ${leadSource}\nHubSpot status: ${hs.status ?? 'n/a'}\nError: ${hs.error}\n\nThe lead is safe (it's in this inbox) — add it to HubSpot by hand and check the token/scopes.`
      ).catch(() => {});
    }

    return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send your message. Please try again later.' },
      { status: 500 }
    );
  }
}
