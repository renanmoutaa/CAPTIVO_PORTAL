const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'build')));

// API Routes
app.post('/api/authorize', async (req, res) => {
    try {
        const { clientMac, apMac, site = 'default' } = req.body;
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Missing Authorization header' });
        }

        if (!clientMac) {
            return res.status(400).json({ error: 'Missing clientMac parameter' });
        }

        const unifiUrl = process.env.UNIFI_URL;
        const unifiUsername = process.env.UNIFI_USERNAME;
        const unifiPassword = process.env.UNIFI_PASSWORD;

        if (!unifiUrl || !unifiUsername || !unifiPassword) {
            return res.status(500).json({ error: 'Unifi Controller credentials not configured' });
        }

        console.log(`[UniFi] Authorizing client ${clientMac} on site ${site}...`);

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

        const setCookieHeader = loginResponse.headers.get('set-cookie');
        const csrfToken = loginResponse.headers.get('x-csrf-token');

        // 2. Authorize Guest Device
        const authorizePayload = {
            cmd: 'authorize-guest',
            mac: clientMac,
            minutes: 1440,
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

        // Optional: Logout
        fetch(`${unifiUrl}/api/logout`, {
            method: 'POST',
            headers: authorizeHeaders
        }).catch(() => {});

        res.status(200).json({ success: true, message: `Device ${clientMac} authorized.` });
    } catch (error) {
        console.error('Error during authorization:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

// For all other routes, serve index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`🚀 Captivo Portal Standalone Server`);
    console.log(`📡 Listening on: http://0.0.0.0:${PORT}`);
    console.log(`📁 Serving build from: ${path.join(__dirname, 'build')}`);
    console.log(`=========================================`);
});
