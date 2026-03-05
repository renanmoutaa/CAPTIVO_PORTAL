import { Check } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  "Personalização completa da página de login",
  "Captura de dados com formulários customizados",
  "Integração com principais CRMs do mercado",
  "Relatórios detalhados e exportáveis",
  "Controle de bandwidth e tempo de sessão",
  "Vouchers e códigos de acesso",
  "API REST para integrações",
  "Suporte técnico especializado 24/7",
  "Dashboard mobile responsivo",
  "Backup automático de dados",
  "Sistema de campanhas promocionais",
  "Análise de comportamento de usuários"
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white mb-4">
              Funcionalidades Completas
            </h2>
            <p className="text-slate-300 mb-8">
              Nossa plataforma oferece tudo que você precisa para gerenciar sua rede 
              WiFi de forma profissional e eficiente.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-0.5">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-slate-200 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white mb-2">Plano Empresarial</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white">R$ 499</span>
                    <span className="text-slate-400">/mês</span>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-slate-700">
                  <div className="flex justify-between text-slate-300">
                    <span>Localizações</span>
                    <span className="text-white">Ilimitadas</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Usuários/mês</span>
                    <span className="text-white">Ilimitados</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Armazenamento</span>
                    <span className="text-white">500 GB</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Suporte</span>
                    <span className="text-white">24/7 Priority</span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors mt-6">
                  Iniciar Teste Grátis
                </button>

                <p className="text-slate-400 text-sm text-center">
                  14 dias grátis • Sem cartão de crédito
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
