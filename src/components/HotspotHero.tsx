import { Button } from "./ui/button";
import { Wifi, Shield, Users } from "lucide-react";

export function HotspotHero() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Portal Cativo Seguro</span>
          </div>
          
          <h1 className="text-slate-900">
            Solução Completa de Hotspot e Portal Cativo
          </h1>
          
          <p className="text-slate-600">
            Gerencie sua rede WiFi com inteligência. Colete dados, analise comportamentos 
            e transforme visitantes em leads qualificados com nossa plataforma completa.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              <Wifi className="h-5 w-5" />
              Começar Gratuitamente
            </Button>
            <Button size="lg" variant="outline">
              Ver Demonstração
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-slate-900">5,000+</div>
              <div className="text-sm text-slate-600">Redes Ativas</div>
            </div>
            <div>
              <div className="text-slate-900">98%</div>
              <div className="text-sm text-slate-600">Satisfação</div>
            </div>
            <div>
              <div className="text-slate-900">1M+</div>
              <div className="text-sm text-slate-600">Usuários/Mês</div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-2xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between text-white">
                <span>Status da Rede</span>
                <span className="bg-green-400 px-3 py-1 rounded-full text-sm">Online</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div className="bg-white/20 rounded-lg p-4">
                  <Users className="h-6 w-6 mb-2" />
                  <div>2,847</div>
                  <div className="text-sm opacity-80">Usuários Ativos</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <Wifi className="h-6 w-6 mb-2" />
                  <div>98.5%</div>
                  <div className="text-sm opacity-80">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
