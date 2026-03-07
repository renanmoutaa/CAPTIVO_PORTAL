import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env.local') });

async function insert() {
    console.log("Inserindo Controladora no Supabase...");
    const url = process.env.VITE_SUPABASE_URL + '/rest/v1/controllers';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!key) {
        console.error("Erro: SUPABASE_SERVICE_ROLE_KEY missing em .env.local");
        return;
    }

    const body = {
        name: "Renan UNIFI Casa",
        location: "Residência Pessoal",
        ip: "172.16.54.60",
        model: "UDM Pro",
        site: "default",
        ssid: "WIFI_TESTE"
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'apikey': key,
                'Authorization': 'Bearer ' + key,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(body)
        });

        const text = await res.text();
        if (res.ok) {
            console.log("✅ Controladora Registrada com Sucesso na Nuvem!");
            console.log(text);
        } else {
            console.error("❌ Falha no Insert:", text);
        }
    } catch (e) {
        console.error("Exception:", e);
    }
}
insert();
