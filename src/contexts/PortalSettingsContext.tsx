import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

export const defaultSettings = {
    // Login Page Editor
    background_type: 'gradient',
    background_color: '#1e293b',
    gradient_start: '#667eea',
    gradient_end: '#764ba2',
    background_image: '',
    primary_color: '#667eea',
    font_family: 'inter',
    border_radius: 16,
    opacity: 95,
    blur_effect: false,
    card_shadow: true,
    card_background_color: '#ffffff',
    card_background_image: '',
    card_width: 448,
    card_min_height: 0,
    show_logo: true,
    logo_url: '',
    logo_size: 80,
    show_title: true,
    title_text: 'Conecte-se ao WiFi Grátis',
    show_subtitle: true,
    subtitle_text: 'Faça login para continuar navegando',

    // Auth Settings
    login_facebook: true,
    login_google: true,
    login_instagram: false,
    login_sms: true,
    login_email: true,
    login_voucher: false,
    facebook_app_id: '',
    facebook_app_secret: '',
    google_client_id: '',
    google_client_secret: '',

    // Field reqs
    field_name_required: true,
    field_email_required: true,
    field_phone_required: true,
    field_birthdate_required: false,
    field_cpf_required: false,
    field_gender_required: false,
    field_zipcode_required: false,
    field_company_required: false,
    field_role_required: false,

    // Validations
    validate_email: true,
    validate_cpf: false,
    validate_phone: true,
    unique_email: true,
};

export type PortalSettings = typeof defaultSettings;

interface PortalSettingsContextType {
    settings: PortalSettings;
    setSettings: React.Dispatch<React.SetStateAction<PortalSettings>>;
    updateSetting: (key: keyof PortalSettings, value: any) => void;
    saveSettings: () => Promise<void>;
    loading: boolean;
}

const PortalSettingsContext = createContext<PortalSettingsContextType | undefined>(undefined);

export const PortalSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<PortalSettings>(defaultSettings);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('portal_settings')
                .select('*')
                .eq('id', 'default')
                .single();

            if (error && error.code !== 'PGRST116') { // Ignore row not found
                console.error('Error fetching portal settings:', error);
            } else if (data) {
                setSettings({ ...defaultSettings, ...data });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const updateSetting = (key: keyof PortalSettings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const saveSettings = async () => {
        try {
            toast.info('Salvando configurações...');
            // remove auto-generated cols if fetched completely, but TS doesn't catch Postgres defaults since we overwrite
            // using hardcoded 'id'.
            const payload = { ...settings, id: 'default', updated_at: new Date().toISOString() };

            const { error } = await supabase
                .from('portal_settings')
                .upsert(payload);

            if (error) throw error;
            toast.success('Configurações salvas com sucesso!');
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Erro ao salvar as configurações.');
        }
    };

    return (
        <PortalSettingsContext.Provider value={{ settings, setSettings, updateSetting, saveSettings, loading }}>
            {children}
        </PortalSettingsContext.Provider>
    );
};

export const usePortalSettings = () => {
    const context = useContext(PortalSettingsContext);
    if (!context) {
        throw new Error('usePortalSettings must be used within a PortalSettingsProvider');
    }
    return context;
};
