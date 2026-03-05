import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { defaultSettings, PortalSettings } from "../contexts/PortalSettingsContext";
import { Wifi, Loader2 } from "lucide-react";

export function GuestPortal() {
    const { site } = useParams();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [fetchingSettings, setFetchingSettings] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [settings, setSettings] = useState<PortalSettings>(defaultSettings);

    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [cpf, setCpf] = useState("");

    // Unifi Captive Portal params
    const clientMac = searchParams.get("id");
    const apMac = searchParams.get("ap");
    const originalUrl = searchParams.get("url") || "https://google.com";

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const { data, error } = await supabase
                    .from('portal_settings')
                    .select('*')
                    .eq('id', 'default')
                    .single();
                if (data) {
                    setSettings({ ...defaultSettings, ...data });
                }
            } catch (err) {
                console.error("Failed to load portal settings", err);
            } finally {
                setFetchingSettings(false);
            }
        };
        loadSettings();
    }, []);

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!clientMac) {
            setError("MAC Address não encontrado. Conecte-se pela rede UniFi.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Authenticate user in Supabase (anon logic for now)
            const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
            if (authError) throw authError;

            // Optional: Save captured lead info to connected_clients or elsewhere
            // (Assuming serverless logic handles that or we do here)

            // 2. Call Vercel Serverless Function to authorize the MAC on Unifi
            const response = await fetch('/api/authorize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.session?.access_token}`
                },
                body: JSON.stringify({
                    clientMac,
                    apMac,
                    site: site || 'default'
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erro ao autorizar dispositivo');
            }

            // 3. Redirect user to original URL
            window.location.href = originalUrl;

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Ocorreu um erro inesperado');
        } finally {
            setLoading(false);
        }
    };

    if (fetchingSettings) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
    }

    const getBackgroundStyle = () => {
        if (settings.background_type === "gradient") {
            return `linear-gradient(135deg, ${settings.gradient_start} 0%, ${settings.gradient_end} 100%)`;
        } else if (settings.background_type === "image" && settings.background_image) {
            return `url(${settings.background_image})`;
        }
        return settings.background_color;
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-300"
            style={{
                background: getBackgroundStyle(),
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: settings.font_family,
                backdropFilter: settings.blur_effect ? "blur(10px)" : "none"
            }}
        >
            <div
                className="w-full max-w-md bg-white transition-all duration-300"
                style={{
                    borderRadius: `${settings.border_radius}px`,
                    opacity: settings.opacity / 100,
                    padding: "2.5rem",
                    boxShadow: settings.card_shadow ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none"
                }}
            >
                {settings.show_logo && (
                    <div className="mb-6 text-center">
                        {settings.logo_url ? (
                            <div
                                className="w-20 h-20 mx-auto bg-cover bg-center"
                                style={{
                                    borderRadius: `${settings.border_radius / 1.5}px`,
                                    backgroundImage: `url(${settings.logo_url})`
                                }}
                            />
                        ) : (
                            <div
                                className="w-20 h-20 mx-auto flex items-center justify-center"
                                style={{
                                    backgroundColor: settings.primary_color,
                                    borderRadius: `${settings.border_radius / 1.5}px`
                                }}
                            >
                                <Wifi className="h-10 w-10 text-white" />
                            </div>
                        )}
                    </div>
                )}

                {settings.show_title && (
                    <h2 className="text-slate-900 text-center mb-2 text-2xl font-bold">
                        {settings.title_text}
                    </h2>
                )}

                {settings.show_subtitle && (
                    <p className="text-sm text-slate-600 text-center mb-8">
                        {settings.subtitle_text}
                    </p>
                )}

                <form className="space-y-4" onSubmit={handleLogin}>

                    {settings.login_email && (
                        <>
                            {settings.field_name_required && (
                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                                        placeholder="Nome Completo"
                                        style={{ focusVisible: { borderColor: settings.primary_color } } as any}
                                    />
                                </div>
                            )}
                            {settings.field_email_required && (
                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                                        placeholder="Seu E-mail"
                                    />
                                </div>
                            )}
                            {settings.field_phone_required && (
                                <div>
                                    <input
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                                        placeholder="Telefone / WhatsApp"
                                    />
                                </div>
                            )}
                            {settings.field_cpf_required && (
                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={cpf}
                                        onChange={(e) => setCpf(e.target.value)}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none"
                                        placeholder="CPF"
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 text-white font-medium shadow transition-all hover:opacity-90 disabled:opacity-70"
                                style={{
                                    backgroundColor: settings.primary_color,
                                    borderRadius: `${settings.border_radius / 2}px`
                                }}
                            >
                                {loading ? "Conectando..." : "Conectar à Internet"}
                            </button>
                        </>
                    )}

                    {!settings.login_email && (settings.login_facebook || settings.login_google) && (
                        <div className="space-y-3">
                            {settings.login_facebook && (
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => handleLogin()}
                                    className="w-full py-3 px-4 text-white font-medium shadow transition-all hover:opacity-90"
                                    style={{
                                        backgroundColor: '#1877F2',
                                        borderRadius: `${settings.border_radius / 2}px`
                                    }}
                                >
                                    Continuar com Facebook
                                </button>
                            )}
                            {settings.login_google && (
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => handleLogin()}
                                    className="w-full py-3 px-4 text-slate-700 bg-white border border-slate-300 font-medium shadow transition-all hover:bg-slate-50"
                                    style={{
                                        borderRadius: `${settings.border_radius / 2}px`
                                    }}
                                >
                                    Continuar com Google
                                </button>
                            )}
                        </div>
                    )}
                </form>

                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
                        {error}
                    </div>
                )}

                <p
                    className="text-xs text-slate-500 text-center mt-6"
                    style={{ fontFamily: settings.font_family }}
                >
                    Ao continuar, você concorda com nossos <span className="underline cursor-pointer">Termos de Uso</span>
                    {clientMac && <><br /><span className="text-[10px] opacity-50 mt-2 block">MAC: {clientMac}</span></>}
                </p>
            </div>
        </div>
    );
}
