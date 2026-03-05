// @ts-nocheck
export default async function handler(req, res) {
    // Allow OPTIONS request (CORS for local dev if needed)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Expecting POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { clientMac, apMac, site = 'default' } = req.body;

        // TODO: Verify Supabase Auth Header (Authorization: Bearer <token>)
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }

        if (!clientMac) {
            return res.status(400).json({ error: 'Missing clientMac parameter' });
        }

        // Unifi Controller Configuration
        const unifiUrl = process.env.UNIFI_URL;
        const unifiUsername = process.env.UNIFI_USERNAME;
        const unifiPassword = process.env.UNIFI_PASSWORD;

        if (!unifiUrl || !unifiUsername || !unifiPassword) {
            return res.status(500).json({ error: 'Unifi Controller credentials not configured' });
        }

        // 1. Login to Unifi Controller
        const loginResponse = await fetch(`${unifiUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: unifiUsername,
                password: unifiPassword,
                remember: true,
            })
        });

        if (!loginResponse.ok) {
            return res.status(loginResponse.status).json({ error: 'Failed to authenticate with Unifi controller' });
        }

        // Extract Cookies and CSRF token
        const setCookieHeader = loginResponse.headers.get('set-cookie');
        const csrfToken = loginResponse.headers.get('x-csrf-token'); // sometimes required by newer UniFi controllers

        // 2. Authorize Guest Device
        const authorizePayload = {
            cmd: 'authorize-guest',
            mac: clientMac,
            minutes: 1440, // 24 hours
            ap_mac: apMac
        };

        const authorizeHeaders = {
            'Content-Type': 'application/json',
            ...(setCookieHeader ? { 'Cookie': setCookieHeader } : {}),
            ...(csrfToken ? { 'X-Csrf-Token': csrfToken } : {})
        };

        const authorizeResponse = await fetch(`${unifiUrl}/api/s/${site}/cmd/stamgr`, {
            method: 'POST',
            headers: authorizeHeaders,
            body: JSON.stringify(authorizePayload)
        });

        if (!authorizeResponse.ok) {
            const errorText = await authorizeResponse.text();
            return res.status(authorizeResponse.status).json({ error: 'Failed to authorize guest', details: errorText });
        }

        // 3. Optional: Logout from Controller (to invalidate session)
        await fetch(`${unifiUrl}/api/logout`, {
            method: 'POST',
            headers: authorizeHeaders
        }).catch(e => console.error('Logout failed silently', e));

        return res.status(200).json({ success: true, message: `Device ${clientMac} authorized successfully.` });
    } catch (error) {
        console.error('Error during authorization:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
