import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, Users, Wifi, Target } from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Novos usuários",
    value: "48,376",
    change: "+12%",
    trend: "up"
  },
  {
    icon: Wifi,
    label: "Sessões ativas",
    value: "2,847",
    change: "+8%",
    trend: "up"
  },
  {
    icon: Target,
    label: "Taxa de conversão",
    value: "67%",
    change: "+5%",
    trend: "up"
  },
  {
    icon: TrendingUp,
    label: "Leads gerados",
    value: "12,458",
    change: "+18%",
    trend: "up"
  }
];

export function StatsSection() {
  return (
    <section id="stats" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-slate-900 mb-4">
          Resultados em Tempo Real
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Acompanhe o desempenho da sua rede com métricas detalhadas e insights acionáveis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-slate-600">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-slate-900">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} vs mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Usuários por Horário</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {[65, 45, 80, 55, 90, 75, 85, 60, 95, 70, 50, 65].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-blue-500 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Métodos de Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Facebook</span>
                  <span className="text-slate-900">45%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Google</span>
                  <span className="text-slate-900">30%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600" style={{ width: '30%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">SMS</span>
                  <span className="text-slate-900">15%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: '15%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Email</span>
                  <span className="text-slate-900">10%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
