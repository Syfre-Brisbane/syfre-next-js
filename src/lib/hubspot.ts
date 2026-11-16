// Best-effort HubSpot CRM sync for inbound leads.
//
// Env-gated on HUBSPOT_TOKEN (a HubSpot private-app access token). Until that is
// set this is a no-op that returns { skipped: true }, so the code ships safely
// before the token exists — exactly like the Perplexity key gating the teaser.
//
// This NEVER throws to the caller and is called AFTER the SES lead email has
// already been sent, so the email stays the source of truth: a HubSpot outage
// degrades to "lead still emailed", never "lead lost". The route logs every
// result and alerts on failure.

const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
const BASE = 'https://api.hubapi.com';

export type HubspotLead = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  website?: string; // the prospect's own domain
  company?: string;
  leadSource: string;
  // Internal value of the "Enquiry type" single-select property, e.g.
  // 'ai_visibility_snapshot'. Set out-of-band on a best-effort basis so a
  // not-yet-provisioned property never blocks the core sync.
  enquiryType?: string;
  note?: string; // free-text context for the rep (teaser result, request detail)
};

export type HubspotResult =
  | { ok: true; skipped: true }
  | { ok: true; skipped: false; contactId: string; noteCreated: boolean }
  | { ok: false; skipped: false; error: string; status?: number };

function authHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

function httpError(msg: string, status: number): Error {
  return Object.assign(new Error(msg), { status });
}

// Create-or-update by email so repeat enquiries never create duplicates.
// Try PATCH by the email id-property first; if the contact doesn't exist yet
// (404), create it.
async function upsertContact(lead: HubspotLead): Promise<string> {
  // Properties safe to (re)apply on every submission.
  const base: Record<string, string> = { email: lead.email };
  if (lead.firstName) base.firstname = lead.firstName;
  if (lead.lastName) base.lastname = lead.lastName;
  if (lead.phone) base.phone = lead.phone;
  if (lead.website) base.website = lead.website;
  if (lead.company) base.company = lead.company;

  // Update first. We deliberately DON'T re-apply lifecycle/lead-status here, so a
  // returning contact already being worked isn't dragged back to a fresh "lead".
  const patch = await fetch(
    `${BASE}/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email`,
    { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ properties: base }) }
  );
  if (patch.ok) {
    const data = await patch.json();
    return String(data.id);
  }
  if (patch.status !== 404) {
    throw httpError(`contact upsert PATCH failed: ${await patch.text()}`, patch.status);
  }

  // Brand-new contact: set the funnel properties that should only apply on first
  // contact — lifecycle = Lead and Lead status = New (so it surfaces as actionable).
  const create = await fetch(`${BASE}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ properties: { ...base, lifecyclestage: 'lead', hs_lead_status: 'NEW' } }),
  });
  if (!create.ok) {
    throw httpError(`contact create failed: ${await create.text()}`, create.status);
  }
  const created = await create.json();
  return String(created.id);
}

// Best-effort: tag the contact with its enquiry type. Isolated from the core
// upsert (and never throws) so a property that hasn't been provisioned yet, or an
// option value that doesn't match, can't stop the contact or note from syncing.
async function setEnquiryType(contactId: string, value: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ properties: { enquiry_type: value } }),
    });
    if (!res.ok) {
      console.warn(JSON.stringify({ level: 'warn', event: 'hubspot.enquiry_type_skipped', contactId, value, status: res.status }));
    }
    return res.ok;
  } catch {
    return false;
  }
}

// Attach the request context as a Note so the rep sees the teaser result and
// source without leaving the contact record. associationTypeId 202 is HubSpot's
// built-in note→contact association.
async function createNote(contactId: string, body: string): Promise<boolean> {
  const res = await fetch(`${BASE}/crm/v3/objects/notes`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      properties: { hs_note_body: body, hs_timestamp: new Date().toISOString() },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
        },
      ],
    }),
  });
  return res.ok;
}

export async function syncHubspotLead(lead: HubspotLead): Promise<HubspotResult> {
  if (!HUBSPOT_TOKEN) return { ok: true, skipped: true };
  try {
    const contactId = await upsertContact(lead);
    if (lead.enquiryType) await setEnquiryType(contactId, lead.enquiryType);
    const noteCreated = lead.note ? await createNote(contactId, lead.note) : false;
    return { ok: true, skipped: false, contactId, noteCreated };
  } catch (e) {
    const status = (e as { status?: number }).status;
    return { ok: false, skipped: false, error: String((e as Error).message || e), status };
  }
}
