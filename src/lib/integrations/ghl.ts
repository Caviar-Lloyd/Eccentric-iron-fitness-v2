/**
 * GoHighLevel (GHL) CRM integration.
 * Fire-and-forget pattern: never throws, logs errors.
 */

const GHL_API_URL = 'https://services.leadconnectorhq.com/contacts/';

interface GHLContactPayload {
  email: string;
  name?: string;
  phone?: string;
  tags: string[];
}

interface GHLContactResponse {
  contact?: {
    id: string;
  };
}

/**
 * Create or update a contact in GoHighLevel.
 * Returns contactId on success, null on failure.
 * Never throws — all errors are logged and swallowed.
 */
export async function createOrUpdateGHLContact(data: GHLContactPayload): Promise<{ contactId: string | null }> {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey || !locationId) {
    console.error('GHL integration: Missing GHL_API_KEY or GHL_LOCATION_ID environment variables');
    return { contactId: null };
  }

  try {
    const [firstName, ...lastParts] = (data.name ?? '').split(' ');
    const lastName = lastParts.join(' ');

    const body: Record<string, unknown> = {
      email: data.email,
      locationId,
      tags: data.tags,
      source: 'Eccentric Iron Fitness Website',
    };

    if (firstName) body.firstName = firstName;
    if (lastName) body.lastName = lastName;
    if (data.phone) body.phone = data.phone;

    const response = await fetch(GHL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`GHL API error (${response.status}):`, text);
      return { contactId: null };
    }

    const result = (await response.json()) as GHLContactResponse;
    return { contactId: result.contact?.id ?? null };
  } catch (error) {
    console.error('GHL integration error:', error);
    return { contactId: null };
  }
}

/**
 * Add a tag to an existing GHL contact.
 * Fire-and-forget: never throws.
 */
export async function addTagToContact(contactId: string, tag: string): Promise<void> {
  const apiKey = process.env.GHL_API_KEY;

  if (!apiKey) {
    console.error('GHL integration: Missing GHL_API_KEY');
    return;
  }

  try {
    const response = await fetch(`${GHL_API_URL}${contactId}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify({ tags: [tag] }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`GHL addTag error (${response.status}):`, text);
    }
  } catch (error) {
    console.error('GHL addTag error:', error);
  }
}
