import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { defaultSettings, PortalSettings } from "../contexts/PortalSettingsContext";
import { Wifi, Loader2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

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
    const clientMac = searchParams.get("id") || searchParams.get("mac") || searchParams.get("client_mac");
    const apMac = searchParams.get("ap") || searchParams.get("ap_mac");
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

        // Caso o usuário acesse o portal livre fora da rede para testar
        const effectiveMac = clientMac || `teste-${Math.random().toString(36).substring(2, 8)}`;

        setLoading(true);
        setError(null);

        try {
            // 1. Authenticate user in Supabase (anon logic for now)
            const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
            if (authError) throw authError;

            // 2. Extract basic Device Info from UserAgent string
            let deviceType = "Desconhecido";
            const ua = navigator.userAgent;
            if (/android/i.test(ua)) deviceType = "Android";
            else if (/iPad|iPhone|iPod/.test(ua)) deviceType = "iOS";
            else if (/Windows/.test(ua)) deviceType = "Windows";
            else if (/Mac OS/.test(ua)) deviceType = "Mac";
            else if (/Linux/.test(ua)) deviceType = "Linux";

            // 3. Save captured lead info to connected_clients table via UPSERT
            const { error: dbError } = await supabase
                .from('connected_clients')
                .upsert({
                    mac: effectiveMac,
                    name: name || "Visitante Anônimo",
                    email: email || "n/a",
                    phone: phone || null,
                    cpf: cpf || null,
                    device: deviceType,
                    status: 'online',
                    location: site || 'default',
                    connected_at: new Date().toISOString()
                }, { onConflict: 'mac' });

            if (dbError) {
                console.error("Erro ao salvar cliente no banco:", dbError);
                // Não vamos bloquear a internet do usuário se dar erro no log do DB.
            }

            // 4. Magia Client-Side: Autorizar usuário batendo direto na controladora local pelo celular do visitante
            // O navegador do visitante está dentro da rede da UDM, então ele tem permissão de mandar a ordem de autorização.
            console.log("Acionando autorização client-side para a UDM...");

            const form = document.createElement('form');
            form.method = 'POST';
            // unifi.local (ou o IP do Gateway) na porta 8880 é sempre interceptado pela UDM na rede de Visitantes
            const gatewayIp = (import.meta as any).env.VITE_UNIFI_GATEWAY_IP || 'unifi.local';
            form.action = `http://${gatewayIp}:8880/guest/s/default/login`;

            // by=free é o padrão universal para liberar em redes abertas/promocionais
            const byInput = document.createElement('input');
            byInput.type = 'hidden';
            byInput.name = 'by';
            byInput.value = 'free'; // Altere para 'password' se habilitar senha no painel da UDM
            form.appendChild(byInput);

            // Redirecionamento Final: a UDM nos joga para a URL que o usuário tentou acessar antes de ser barrado
            const urlInput = document.createElement('input');
            urlInput.type = 'hidden';
            urlInput.name = 'url';
            urlInput.value = originalUrl || 'https://www.google.com';
            form.appendChild(urlInput);

            document.body.appendChild(form);
            form.submit();

            // A execução termina aqui. A página vai navegar para o form action da UDM.

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
        <>
            <div
                className="fixed inset-0 -z-10 transition-all duration-300 pointer-events-none"
                style={{
                    background: getBackgroundStyle(),
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div
                className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 transition-all duration-300"
                style={{
                    fontFamily: settings.font_family,
                    backdropFilter: settings.blur_effect ? "blur(10px)" : "none"
                }}
            >
                <Card
                    className="w-full transition-all duration-300 border-0"
                    style={{
                        backgroundColor: settings?.card_background_color || '#ffffff',
                        backgroundImage: settings?.card_background_image ? `url(${settings.card_background_image})` : 'none',
                        backgroundSize: settings?.card_image_size && settings.card_image_size !== 100 ? `${settings.card_image_size}%` : 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: `${settings?.card_image_position_x || 50}% ${settings?.card_image_position_y || 50}%`,
                        borderRadius: `${settings?.border_radius || 16}px`,
                        opacity: (settings?.opacity || 100) / 100,
                        boxShadow: settings?.card_shadow ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none",
                        maxWidth: `${settings?.card_width || 448}px`,
                        minHeight: settings?.card_min_height && settings.card_min_height > 0 ? `${settings.card_min_height}px` : 'auto'
                    }}
                >
                    <div style={{ marginTop: settings?.form_margin_top ? `${settings.form_margin_top}px` : '0px' }}>
                        <CardContent className="space-y-4 text-center mt-6">
                            {settings.show_logo && (
                                <div className="mb-6 text-center">
                                    {settings.logo_url ? (
                                        <div
                                            className="mx-auto bg-cover bg-center"
                                            style={{
                                                width: `${settings.logo_size || 80}px`,
                                                height: `${settings.logo_size || 80}px`,
                                                borderRadius: `${settings.border_radius / 1.5}px`,
                                                backgroundImage: `url(${settings.logo_url})`
                                            }}
                                        />
                                    ) : (
                                        <div
                                            className="mx-auto flex items-center justify-center"
                                            style={{
                                                width: `${settings.logo_size || 80}px`,
                                                height: `${settings.logo_size || 80}px`,
                                                backgroundColor: settings.primary_color,
                                                borderRadius: `${settings.border_radius / 1.5}px`
                                            }}
                                        >
                                            <Wifi className="text-white" style={{ width: `${(settings.logo_size || 80) / 2}px`, height: `${(settings.logo_size || 80) / 2}px` }} />
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
                                                    className="w-full px-4 py-2 border rounded-lg outline-none"
                                                    placeholder="Nome Completo"
                                                    style={{
                                                        backgroundColor: settings.input_bg_color || 'transparent',
                                                        color: settings.input_text_color || '#333333',
                                                        borderColor: settings.input_border_color || '#cbd5e1',
                                                    }}
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
                                                    className="w-full px-4 py-2 border rounded-lg outline-none"
                                                    placeholder="Seu E-mail"
                                                    style={{
                                                        backgroundColor: settings.input_bg_color || 'transparent',
                                                        color: settings.input_text_color || '#333333',
                                                        borderColor: settings.input_border_color || '#cbd5e1',
                                                    }}
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
                                                    className="w-full px-4 py-2 border rounded-lg outline-none"
                                                    placeholder="Telefone / WhatsApp"
                                                    style={{
                                                        backgroundColor: settings.input_bg_color || 'transparent',
                                                        color: settings.input_text_color || '#333333',
                                                        borderColor: settings.input_border_color || '#cbd5e1',
                                                    }}
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
                                                    className="w-full px-4 py-2 border rounded-lg outline-none"
                                                    placeholder="CPF"
                                                    style={{
                                                        backgroundColor: settings.input_bg_color || 'transparent',
                                                        color: settings.input_text_color || '#333333',
                                                        borderColor: settings.input_border_color || '#cbd5e1',
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 px-4 font-medium shadow transition-all hover:opacity-90 disabled:opacity-70"
                                            style={{
                                                backgroundColor: settings.primary_color,
                                                color: settings.button_text_color || '#ffffff',
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
                        </CardContent>
                    </div>
                </Card>
            </div>
        </>
    );
}
