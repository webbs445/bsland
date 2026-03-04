'use server';

import { submitToERPNext } from '@/lib/erpnext';

export async function submitLeadAction(data: {
    first_name: string;
    last_name: string;
    custom_service_enquired: string;
    custom_client_profile?: string;
    email_id: string;
    mobile_no: string;
    country?: string;
}) {
    // Add the status field specifically defined by the user
    const payload = {
        ...data,
        status: "Lead"
    };

    const result = await submitToERPNext(payload);
    return result;
}
