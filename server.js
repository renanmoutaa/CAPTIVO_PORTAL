import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fetch from 'node-fetch';
import https from 'https';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env variables
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config();

// Agent to bypass strict SSL for UniFi self-signed certificates
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});


const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Main authorize route (replaces Vercel's api/authorize.ts)
app.post('/api/authorize', async (req, res) => {
    try {
        const { clientMac, apMac, site = 'default' } = req.body;

        // Note: For advanced security, you should verify the Supabase Auth Header here as well,
        // (Authorization: Bearer <token>), via Supabase Admin API.
        const authHeader = req.header('Authorization');
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
            console.error('Missing Unifi credentials in .env');
            return res.status(500).json({ error: 'Unifi Controller credentials not configured' });
        }

        console.log(`[AUTH] Attempting to authorize MAC: ${clientMac}`);

        // Format MAC to strict xx:xx:xx:xx:xx:xx for UniFi Regex Validation
        let formattedMac = clientMac.toLowerCase().replace(/[^a-f0-9]/g, '');
        if (formattedMac.length === 12) {
            formattedMac = formattedMac.match(/.{1,2}/g).join(':');
        } else {
            return res.status(400).json({ error: 'MAC Address do cliente invalido ou incompleto.' });
        }

        const unifiApiKey = process.env.UNIFI_API_KEY;

        if (unifiApiKey) {
            console.log(`[AUTH] Using New Official Integration API for MAC: ${clientMac}`);

            // The integration base path varies if running on UniFi OS vs Standalone Network
            const getClientEndpoints = [
                `${unifiUrl}/proxy/network/integration/v1/sites/${site}/clients?filter=macAddress.eq('${formattedMac}')`,
                `${unifiUrl}/integration/v1/sites/${site}/clients?filter=macAddress.eq('${formattedMac}')`
            ];

            let clientId = null;
            let successBaseUrl = null;

            // Step 1: Discover Client ID and correct path
            for (const endpoint of getClientEndpoints) {
                try {
                    const clientRes = await fetch(endpoint, {
                        method: 'GET',
                        agent: httpsAgent,
                        headers: {
                            'Accept': 'application/json',
                            'X-API-Key': unifiApiKey
                        }
                    });

                    if (clientRes.ok) {
                        const json = await clientRes.json();
                        if (json.data && json.data.length > 0) {
                            clientId = json.data[0].id;
                            successBaseUrl = endpoint.split('/clients')[0]; // Extract the base
                            console.log(`[AUTH] Found clientId: ${clientId} on ${successBaseUrl}`);
                            break;
                        }
                    }
                } catch (e) { /* fallthrough to next endpoint */ }
            }

            if (!clientId) {
                console.error(`[AUTH] Integration API: Client with MAC ${formattedMac} not found on controller.`);
                return res.status(404).json({ error: 'Dispositivo visitante nao encontrado na controladora' });
            }

            // Step 2: Send Authorization Action Payload
            const authActionResponse = await fetch(`${successBaseUrl}/clients/${clientId}/actions`, {
                method: 'POST',
                agent: httpsAgent,
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': unifiApiKey
                },
                body: JSON.stringify({
                    action: "AUTHORIZE_GUEST_ACCESS",
                    timeLimitMinutes: 1440
                })
            });

            if (!authActionResponse.ok) {
                const errResult = await authActionResponse.text();
                console.error(`[AUTH] Integration Action failed:`, errResult);
                return res.status(authActionResponse.status).json({ error: 'Failed to authorize guest via Integration API', details: errResult });
            }

            console.log(`[AUTH] Device ${formattedMac} authorized successfully (Integration API).`);
            return res.status(200).json({ success: true, message: `Device authorized successfully.` });

        } else {
            console.log(`[AUTH] Using Classic Controller API for MAC: ${clientMac}`);

            // 1. Login to Unifi Controller
            const loginResponse = await fetch(`${unifiUrl}/api/login`, {
                method: 'POST',
                agent: httpsAgent,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: unifiUsername,
                    password: unifiPassword,
                    remember: true,
                })
            });

            if (!loginResponse.ok) {
                console.error(`[AUTH] Unifi login failed: ${loginResponse.status}`);
                return res.status(loginResponse.status).json({ error: 'Failed to authenticate with Unifi controller' });
            }

            const setCookieHeader = loginResponse.headers.get('set-cookie');
            const csrfToken = loginResponse.headers.get('x-csrf-token');

            // 2. Authorize Guest Device
            const authorizePayload = {
                cmd: 'authorize-guest',
                mac: formattedMac,
                minutes: 1440
            };

            if (apMac && typeof apMac === 'string' && apMac !== 'null') {
                authorizePayload.ap_mac = apMac;
            }

            const authorizeHeaders = { 'Content-Type': 'application/json' };
            if (setCookieHeader) authorizeHeaders['Cookie'] = setCookieHeader;
            if (csrfToken) authorizeHeaders['X-Csrf-Token'] = csrfToken;

            const authorizeResponse = await fetch(`${unifiUrl}/api/s/${site}/cmd/stamgr`, {
                method: 'POST',
                agent: httpsAgent,
                headers: authorizeHeaders,
                body: JSON.stringify(authorizePayload)
            });

            if (!authorizeResponse.ok) {
                const errorText = await authorizeResponse.text();
                console.error(`[AUTH] Authorize command failed: ${authorizeResponse.status}`, errorText);
                return res.status(authorizeResponse.status).json({ error: 'Failed to authorize guest', details: errorText });
            }

            // 3. Optional: Logout 
            await fetch(`${unifiUrl}/api/logout`, {
                method: 'POST',
                agent: httpsAgent,
                headers: authorizeHeaders
            }).catch(e => console.error('Logout failed silently', e));

            console.log(`[AUTH] Device ${formattedMac} authorized successfully (Classic API).`);
            return res.status(200).json({ success: true, message: `Device authorized successfully.` });
        }
    } catch (error) {
        console.error('[AUTH] Exception during authorization:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// For any other basic GET route, return info
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`[SERVER] Captive Portal API Gateway running on port ${PORT}`);
});
