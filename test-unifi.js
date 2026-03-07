import fetch from 'node-fetch';
import https from 'https';

const unifiUrl = 'https://172.16.54.60:8443';
const username = 'admin';
const password = 'V!l@0limpica';

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

async function testAuth() {
    try {
        console.log("1. Logging in...");
        const loginRes = await fetch(`${unifiUrl}/api/login`, {
            method: 'POST',
            agent: httpsAgent,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, remember: true })
        });

        if (!loginRes.ok) {
            const loginText = await loginRes.text();
            throw new Error(`Login failed: ${loginRes.status} - ${loginText}`);
        }
        const cookies = loginRes.headers.get('set-cookie');
        const csrf = loginRes.headers.get('x-csrf-token');
        console.log("Logged in successfully. Cookies obtained.");

        const headers = { 'Content-Type': 'application/json' };
        if (cookies) headers['Cookie'] = cookies;
        if (csrf) headers['X-Csrf-Token'] = csrf;

        // Test with a formatted MAC
        const testMac = "ca:99:ed:a9:1d:f5";
        console.log(`2. Authorizing MAC: ${testMac}`);

        const authRes = await fetch(`${unifiUrl}/api/s/default/cmd/stamgr`, {
            method: 'POST',
            agent: httpsAgent,
            headers,
            body: JSON.stringify({
                cmd: 'authorize-guest',
                mac: testMac,
                minutes: 1440
            })
        });

        const text = await authRes.text();
        console.log(`Auth Response: ${authRes.status}`, text);

    } catch (e) {
        console.error("Test failed:", e);
    }
}

testAuth();
