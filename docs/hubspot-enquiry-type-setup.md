# HubSpot "Enquiry type" setup

The site (`/api/lead` → `src/lib/hubspot.ts`) tags every synced contact with an
enquiry type so Snapshot requests can be actioned differently from general
enquiries. The property below must exist in HubSpot for the tag to land. Until it
does, the contact + note still sync fine — the tag write is **best-effort and
decoupled** (it just logs `hubspot.enquiry_type_skipped` and moves on).

## Exact contract the code sends (must match EXACTLY)

The website writes these raw strings. If the HubSpot internal name or option
values differ by even a character/case, tagging silently fails.

- **Property object:** Contact
- **Property internal name:** `enquiry_type`
- **Field type:** single-select dropdown (enumeration)
- **Option internal values the site may send:**

  | Enquiry | Internal value sent |
  |---|---|
  | AI Visibility Snapshot (GEO landing) | `ai_visibility_snapshot` |
  | Website Contact Form | `website_contact_form` |
  | Workshop application | `workshop_application` |
  | Anything else | `other` |

Source of truth for the mapping: `enquiryType` in `src/app/api/lead/route.ts`.

## 1) Create the contact property

- Object: **Contact**
- Label: **Enquiry type**
- Internal name: **`enquiry_type`**
- Group: Contact information
- Field type: single-select dropdown (enumeration)
- Options (Label → internal value — values must match the table above, lowercase):
  - AI Visibility Snapshot → `ai_visibility_snapshot`
  - Website Contact Form → `website_contact_form`
  - Workshop Application → `workshop_application`
  - Other → `other`

## 2) Workflow (contact-based) — fulfilment alert

- Name: **AI Visibility Snapshot — fulfilment alert**
- Enrollment trigger: Contact property **Enquiry type is any of "AI Visibility Snapshot"**
- Re-enrollment: **ON** (so repeat requests re-trigger)
- Actions:
  1. Send internal notification email to **steve.macfarlane@syfre.ai** — subject
     "New AI Visibility Snapshot to deliver"; include contact name, email, website.
  2. Create a task **"Deliver AI Visibility Snapshot"**, assigned to the fulfilment
     owner (**Steve Macfarlane / steve.macfarlane@syfre.ai**), due in 1 business
     day, associated to the contact.

## Standard properties (already set by the site, do NOT create)

- **Lifecycle stage = Lead** — set on new contacts only.
- **Lead status = New** (`hs_lead_status: NEW`) — set on new contacts only, so a
  returning contact being worked isn't reset.

## Do not

- Rename `enquiry_type` or change the option internal values — the site's tagging
  will silently stop matching. Change the mapping in `src/app/api/lead/route.ts`
  first if these ever need to differ.
