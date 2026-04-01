'use client';

const UTM_STORAGE_KEY = 'bsl_utm_params';

function getLeadSource(utmSource: string | null): string {
    if (!utmSource) return 'Website';

    const src = utmSource.toLowerCase();

    if (src === 'google') return 'Google';
    if (['facebook', 'fb', 'meta', 'ig', 'instagram'].includes(src)) return 'Meta Ads';
    if (['email', 'mailchimp', 'newsletter'].includes(src)) return 'Email Campaign';
    if (src === 'whatsapp') return 'WhatsApp Best Solution';
    if (['referral', 'reference'].includes(src)) return 'Reference';

    return 'Website';
}

function readAndStoreUTM(): Record<string, string> {
    if (typeof window === 'undefined') return { source: 'Website' };

    // Check if current URL has UTM params — if so, store them
    const searchParams = new URLSearchParams(window.location.search);
    const utmSource = searchParams.get('utm_source');

    if (utmSource || searchParams.get('gclid')) {
        const params: Record<string, string> = {
            source: getLeadSource(utmSource),
        };

        const utm_campaign = searchParams.get('utm_campaign');
        const utm_term = searchParams.get('utm_term');
        const utm_content = searchParams.get('utm_content');
        const utm_medium = searchParams.get('utm_medium');
        const gclid = searchParams.get('gclid');

        if (utm_campaign) params.campaign_name = utm_campaign;
        if (utm_term) params.custom_ad_set_name = utm_term;
        if (utm_content) params.custom_ad_name = utm_content;
        if (utm_medium) params.custom_form_name = utm_medium;
        if (utmSource) params.custom_platform = utmSource;
        if (gclid) params.custom_lead_id = gclid;

        // Store in sessionStorage so it survives URL changes
        try {
            sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
        } catch (e) { /* ignore storage errors */ }

        return params;
    }

    // No UTM in URL — check sessionStorage for previously stored params
    try {
        const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore storage errors */ }

    return { source: 'Website' };
}

export function getUTMParams(): Record<string, string> {
    return readAndStoreUTM();
}

// Hook wrapper for backward compatibility
export function useUTMParams(): Record<string, string> {
    return getUTMParams();
}
