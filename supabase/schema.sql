-- Script SQL para criar as tabelas do Captive Portal no Supabase

-- Tabela: connected_clients
-- Armazena os registros de clientes que se conectaram \xE0 WiFi
CREATE TABLE IF NOT EXISTS public.connected_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    device TEXT,
    ip TEXT,
    mac TEXT UNIQUE NOT NULL,
    phone TEXT,
    cpf TEXT,
    status TEXT DEFAULT 'online',
    location TEXT DEFAULT 'default',
    bandwidth_used BIGINT DEFAULT 0, -- em bytes
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela: controllers
-- Armazena as informa\xE7\xF5es referentes \xE0s UniFi Dream Machines ou Cloud Keys
CREATE TABLE IF NOT EXISTS public.controllers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT,
    ip TEXT,
    model TEXT,
    clients_count INTEGER DEFAULT 0,
    max_clients INTEGER DEFAULT 500,
    status TEXT DEFAULT 'online',
    uptime TEXT,
    load INTEGER DEFAULT 0,
    bandwidth TEXT,
    version TEXT,
    site TEXT DEFAULT 'default',
    ssid TEXT,
    access_points INTEGER DEFAULT 0,
    networks INTEGER DEFAULT 0,
    port TEXT DEFAULT '8443',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserindo controladora padr\xE3o de Exemplo
INSERT INTO public.controllers (name, location, ip, model, site, ssid) 
VALUES ('Controladora - UDM Pro', 'WINK Telecom', '192.168.1.1', 'UniFi Dream Machine Pro', 'default', 'WiFi-Gratuito')
ON CONFLICT DO NOTHING;

-- Configuracoes de RLS (Row Level Security) - Libera o banco para conex\xF5es usando o anon_key
ALTER TABLE public.connected_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.controllers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso Publico Read connected_clients" ON public.connected_clients FOR SELECT USING (true);
CREATE POLICY "Acesso Publico Insert connected_clients" ON public.connected_clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Acesso Publico Update connected_clients" ON public.connected_clients FOR UPDATE USING (true);

CREATE POLICY "Acesso Publico Read controllers" ON public.controllers FOR SELECT USING (true);
CREATE POLICY "Acesso Publico Insert controllers" ON public.controllers FOR INSERT WITH CHECK (true);
CREATE POLICY "Acesso Publico Update controllers" ON public.controllers FOR UPDATE USING (true);
