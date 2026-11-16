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
  website?: string; // the prospect's own domain
  company?: string;
  leadSource: string;
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
  const properties: Record<string, string> = { email: lead.email };
  if (lead.firstName) properties.firstname = lead.firstName;
  if (lead.lastName) properties.lastname = lead.lastName;
  if (lead.website) properties.website = lead.website;
  if (lead.company) properties.company = lead.company;
  // Nudge new contacts into the funnel. HubSpot ignores a backward move, so an
  // existing customer won't be dragged back to "lead".
  properties.lifecyclestage = 'lead';

  const patch = await fetch(
    `${BASE}/crm/v3/objects/contacts/${encodeURIComponent(lead.email)}?idProperty=email`,
    { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ properties }) }
  );
  if (patch.ok) {
    const data = await patch.json();
    return String(data.id);
  }
  if (patch.status !== 404) {
    throw httpError(`contact upsert PATCH failed: ${await patch.text()}`, patch.status);
  }

  const create = await fetch(`${BASE}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ properties }),
  });
  if (!create.ok) {
    throw httpError(`contact create failed: ${await create.text()}`, create.status);
  }
  const created = await create.json();
  return String(created.id);
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
    const noteCreated = lead.note ? await createNote(contactId, lead.note) : false;
    return { ok: true, skipped: false, contactId, noteCreated };
  } catch (e) {
    const status = (e as { status?: number }).status;
    return { ok: false, skipped: false, error: String((e as Error).message || e), status };
  }
}
