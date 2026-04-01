// ─── Lead Source Resolution ──────────────────────────────────────────────────

let cachedLeadSources: string[] | null = null;

// Aliases for common ad platform utm_source values
const SOURCE_ALIASES: Record<string, string> = {
    fb: 'Meta Ads',
    ig: 'Meta Ads',
    instagram: 'Meta Ads',
    meta: 'Meta Ads',
    facebook: 'Meta Ads',
    mailchimp: 'Email Campaign',
    newsletter: 'Email Campaign',
    whatsapp: 'WhatsApp Best Solution',
    referral: 'Reference',
    reference: 'Reference',
};

async function getLeadSources(): Promise<string[]> {
    if (cachedLeadSources !== null) return cachedLeadSources;

    const apiUrl = process.env.ERPNEXT_API_URL;
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;
    if (!apiUrl || !apiKey || !apiSecret) return [];

    try {
        const baseUrl = apiUrl.replace('/api/resource/Lead', '');
        const res = await fetch(`${baseUrl}/api/resource/Lead Source?fields=["name"]&limit_page_length=100`, {
            headers: { Accept: 'application/json', Authorization: `token ${apiKey}:${apiSecret}` },
        });
        if (res.ok) {
            const json = await res.json();
            const sources: string[] = json.data.map((d: { name: string }) => d.name);
            cachedLeadSources = sources;
            return sources;
        }
    } catch (e) {
        console.error('Failed to fetch Lead Sources:', e);
    }
    return [];
}

export async function resolveLeadSource(utmSource?: string): Promise<string> {
    if (!utmSource) return 'Website';

    const src = utmSource.toLowerCase();

    // Check alias map first
    if (SOURCE_ALIASES[src]) return SOURCE_ALIASES[src];

    // Fetch actual Lead Sources from ERPNext and try exact match (case-insensitive)
    const sources = await getLeadSources();
    const exactMatch = sources.find(s => s.toLowerCase() === src);
    if (exactMatch) return exactMatch;

    // Try contains match (e.g. utm_source="google_ads" matches "Google")
    const containsMatch = sources.find(s => src.includes(s.toLowerCase()) || s.toLowerCase().includes(src));
    if (containsMatch) return containsMatch;

    return 'Website';
}

// ─── Lead Submission ─────────────────────────────────────────────────────────

export async function submitToERPNext(data: {
    first_name: string;
    last_name: string;
    status: string;
    custom_service_enquired: string;
    custom_client_profile_and_requirement?: string;
    email_id: string;
    mobile_no: string;
    country?: string;
    source?: string;
    campaign_name?: string;
    custom_ad_set_name?: string;
    custom_ad_name?: string;
    custom_form_name?: string;
    custom_platform?: string;
    custom_lead_id?: string;
}) {
    const apiUrl = process.env.ERPNEXT_API_URL;
    const apiKey = process.env.ERPNEXT_API_KEY;
    const apiSecret = process.env.ERPNEXT_API_SECRET;

    if (!apiUrl || !apiKey || !apiSecret) {
        console.error('ERPNext API credentials are not fully configured in environment variables.');
        return { success: false, error: 'Missing API credentials' };
    }

    try {
        // Validate campaign_name exists in ERPNext before sending (it's a Link field)
        if (data.campaign_name) {
            const campaignCheck = await fetch(
                `${apiUrl.replace('/api/resource/Lead', '')}/api/resource/Campaign/${encodeURIComponent(data.campaign_name)}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `token ${apiKey}:${apiSecret}`
                    }
                }
            );
            if (!campaignCheck.ok) {
                // Campaign doesn't exist — remove it so the rest of the data still saves
                delete data.campaign_name;
            }
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `token ${apiKey}:${apiSecret}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('ERPNext submission failed:', response.status, errorData);
            return { success: false, error: `Submission failed with status ${response.status}` };
        }

        const responseData = await response.json();
        return { success: true, data: responseData };
    } catch (error) {
        console.error('Error submitting to ERPNext:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}
