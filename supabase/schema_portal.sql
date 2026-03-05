-- Script SQL para criar a tabela de configuracoes visuais do Portal Cativo
-- Tabela: portal_settings
CREATE TABLE IF NOT EXISTS public.portal_settings (
    id TEXT PRIMARY KEY DEFAULT 'default', -- Usaremos 'default' para a configuracao global
    
    -- Aba: Design Visual (LoginPageEditor)
    background_type TEXT DEFAULT 'gradient', -- solid, gradient, image
    background_color TEXT DEFAULT '#1e293b',
    gradient_start TEXT DEFAULT '#667eea',
    gradient_end TEXT DEFAULT '#764ba2',
    background_image TEXT DEFAULT '',
    primary_color TEXT DEFAULT '#667eea',
    font_family TEXT DEFAULT 'inter',
    border_radius INTEGER DEFAULT 16,
    opacity INTEGER DEFAULT 95,
    blur_effect BOOLEAN DEFAULT false,
    card_shadow BOOLEAN DEFAULT true,
    card_background_color TEXT DEFAULT '#ffffff',
    card_background_image TEXT DEFAULT '',
    card_width INTEGER DEFAULT 448,
    show_logo BOOLEAN DEFAULT true,
    logo_url TEXT DEFAULT '',
    logo_size INTEGER DEFAULT 80,
    show_title BOOLEAN DEFAULT true,
    title_text TEXT DEFAULT 'Conecte-se ao WiFi Grátis',
    show_subtitle BOOLEAN DEFAULT true,
    subtitle_text TEXT DEFAULT 'Faça login para continuar navegando',
    
    -- Aba: Autenticacao (AuthenticationSettings)
    login_facebook BOOLEAN DEFAULT true,
    login_google BOOLEAN DEFAULT true,
    login_instagram BOOLEAN DEFAULT false,
    login_sms BOOLEAN DEFAULT true,
    login_email BOOLEAN DEFAULT true,
    login_voucher BOOLEAN DEFAULT false,
    
    facebook_app_id TEXT DEFAULT '',
    facebook_app_secret TEXT DEFAULT '',
    google_client_id TEXT DEFAULT '',
    google_client_secret TEXT DEFAULT '',
    
    -- Campos de Formulario
    field_name_required BOOLEAN DEFAULT true,
    field_email_required BOOLEAN DEFAULT true,
    field_phone_required BOOLEAN DEFAULT true,
    field_birthdate_required BOOLEAN DEFAULT false,
    field_cpf_required BOOLEAN DEFAULT false,
    field_gender_required BOOLEAN DEFAULT false,
    field_zipcode_required BOOLEAN DEFAULT false,
    field_company_required BOOLEAN DEFAULT false,
    field_role_required BOOLEAN DEFAULT false,
    
    -- Validacoes
    validate_email BOOLEAN DEFAULT true,
    validate_cpf BOOLEAN DEFAULT false,
    validate_phone BOOLEAN DEFAULT true,
    unique_email BOOLEAN DEFAULT true,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserindo configuração padrão
INSERT INTO public.portal_settings (id) VALUES ('default') ON CONFLICT DO NOTHING;

-- Configuracoes de RLS
ALTER TABLE public.portal_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso Publico Read portal_settings" ON public.portal_settings FOR SELECT USING (true);
CREATE POLICY "Acesso Publico Insert portal_settings" ON public.portal_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Acesso Publico Update portal_settings" ON public.portal_settings FOR UPDATE USING (true);

-- Script SQL para criar o Bucket de Storage (Para upload de logos e bg)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portal_assets', 'portal_assets', true)
ON CONFLICT (id) DO NOTHING;

-- Policies do Storage para permitir leitura e upload de imagens
CREATE POLICY "Leitura Publica Imagens" ON storage.objects FOR SELECT USING ( bucket_id = 'portal_assets' );
CREATE POLICY "Upload Publico Imagens" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'portal_assets' );
CREATE POLICY "Update Publico Imagens" ON storage.objects FOR UPDATE USING ( bucket_id = 'portal_assets' );
