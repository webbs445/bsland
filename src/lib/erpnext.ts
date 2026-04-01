export async function submitToERPNext(data: {
    first_name: string;
    last_name: string;
    status: string;
    custom_service_enquired: string;
    custom_client_profile_and_requirement?: string;
    email_id: string;
    mobile_no: string;
    country?: string;
    // ✅ Exact Frappe field names
    campaign_name?: string;
    custom_ad_set_name?: string;
    custom_ad_name?: string;
    custom_button_name?: string;
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
