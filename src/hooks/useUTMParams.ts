'use client';

import { useSearchParams } from 'next/navigation';

export function useUTMParams() {
    const searchParams = useSearchParams();

    return {
        // UTM values mapped to existing Frappe fields
        campaign_name: searchParams.get('utm_campaign') || '',  // utm_campaign → campaign_name
        custom_ad_set_name: searchParams.get('utm_term') || '',  // utm_term → custom_ad_set_name
        custom_platform: searchParams.get('utm_source') || '',  // utm_source → custom_platform
        custom_form_name: searchParams.get('utm_medium') || '',  // utm_medium → custom_form_name
        custom_lead_id: searchParams.get('gclid') || '',  // gclid → custom_lead_id
        custom_ad_name: searchParams.get('utm_content') || '',  // utm_content  → custom_ad_name
    };
}
