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
            'Content-Type': 'application/json'
        };

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

        // 3. Optional: Logout from Controller (to invalidate session)
        await fetch(`${unifiUrl}/api/logout`, {
            method: 'POST',
            agent: httpsAgent,
            headers: authorizeHeaders
        }).catch(e => console.error('Logout failed silently', e));

        console.log(`[AUTH] Device ${clientMac} authorized successfully.`);
        return res.status(200).json({ success: true, message: `Device ${clientMac} authorized successfully.` });
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
