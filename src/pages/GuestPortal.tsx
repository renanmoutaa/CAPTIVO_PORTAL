import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function GuestPortal() {
    const { site } = useParams();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Unifi Captive Portal params
    const clientMac = searchParams.get("id");
    const apMac = searchParams.get("ap");
    const originalUrl = searchParams.get("url") || "https://google.com";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientMac) {
            setError("MAC Address não encontrado. Conecte-se pela rede UniFi.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Authenticate or Create user in Supabase
            // Note: In real life you'd register the user, here we use anonymous or a fake sign in for the sake of the token
            const { data: authData, error: authError } = await supabase.auth.signInAnonymously();

            if (authError) throw authError;

            // 2. Call Vercel Serverless Function to authorize the MAC on Unifi
            const response = await fetch('/api/authorize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authData.session?.access_token} `
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 text-center bg-blue-600 text-white">
                    <h1 className="text-2xl font-bold mb-2">Bem-vindo(a)</h1>
                    <p className="text-blue-100">Conecte-se ao WiFi Gratuito</p>
                </div>

                <div className="p-6">
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="Seu nome"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                E-mail
                            </label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                placeholder="seu@email.com"
                            />
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors mt-6 disabled:opacity-70"
                        >
                            {loading ? "Conectando..." : "Conectar à Internet"}
                        </button>
                    </form>

                    <div className="mt-8 text-xs text-center text-slate-500">
                        <p>Ao conectar, você concorda com nossos Termos de Uso.</p>
                        {clientMac && <p className="mt-2 text-[10px] text-slate-400">MAC: {clientMac}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}
