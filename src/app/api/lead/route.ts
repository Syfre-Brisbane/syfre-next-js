import { NextRequest, NextResponse } from 'next/server';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

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

// Google Sheets share links only — the tell of the current backlink-spam wave
// ("I put my list into a spreadsheet"). Deliberately narrow: real prospects may
// legitimately paste their own website or a link, so we do NOT block links in
// general — only shared Google spreadsheets, which have no place in a genuine
// first-contact enquiry.
const GOOGLE_SHEET_REGEX = /(?:docs\.google\.com\/spreadsheets|sheets\.google\.com)/i;

// Returns a reason string if the submission looks like spam, otherwise null.
// Blocked submissions are dropped silently (see POST) rather than 400'd, so the
// bot gets no signal to adapt to.
function spamReason(fields: { honeypot: string; blob: string }): string | null {
  // Honeypot: a hidden field no human sees. Any value means a bot filled it.
  if (fields.honeypot) return 'honeypot filled';
  // Shared Google spreadsheet in the message/name/company — backlink-spam tell.
  if (GOOGLE_SHEET_REGEX.test(fields.blob)) return 'google sheet link';
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
      `Name: ${name}`,
      `Email: ${email}`,
      phone && `Phone: ${phone}`,
      company && `Company: ${company}`,
      `Source: ${leadSource}`,
      lead.Workshop_Application === true && 'Workshop application: yes',
      description && `\n${description}`,
    ].filter(Boolean);

    await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: FROM_EMAIL,
        Destination: { ToAddresses: [TO_EMAIL] },
        ReplyToAddresses: [email],
        Content: {
          Simple: {
            Subject: { Data: `New lead: ${name} — ${leadSource}` },
            Body: { Text: { Data: lines.join('\n') } },
          },
        },
      })
    );

    return NextResponse.json({ success: true, message: 'Lead submitted successfully' });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send your message. Please try again later.' },
      { status: 500 }
    );
  }
}
