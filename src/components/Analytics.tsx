import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  TrendingUp,
  Users,
  Clock,
  Globe,
  Smartphone,
  Calendar
} from "lucide-react";

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900 mb-2">Analytics</h1>
        <p className="text-slate-600">Análise detalhada de uso e comportamento dos usuários</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="behavior">Comportamento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-blue-500" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-slate-900">48,376</div>
                <div className="text-sm text-slate-600">Total de Usuários</div>
                <div className="text-xs text-green-600 mt-1">+12.5% vs mês anterior</div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="h-8 w-8 text-purple-500" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-slate-900">2h 34m</div>
                <div className="text-sm text-slate-600">Tempo Médio</div>
                <div className="text-xs text-green-600 mt-1">+8.2% vs mês anterior</div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Globe className="h-8 w-8 text-green-500" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-slate-900">156.8 GB</div>
                <div className="text-sm text-slate-600">Dados Transferidos</div>
                <div className="text-xs text-green-600 mt-1">+15.3% vs mês anterior</div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="h-8 w-8 text-orange-500" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-slate-900">67.8%</div>
                <div className="text-sm text-slate-600">Taxa de Retorno</div>
                <div className="text-xs text-green-600 mt-1">+5.1% vs mês anterior</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Novos Usuários (30 dias)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-1">
                  {[320, 450, 380, 520, 490, 610, 580, 670, 640, 720, 690, 780, 750, 820, 890, 860, 920, 880, 950, 920, 980, 950, 1020, 990, 1050, 1020, 1080, 1050, 1120, 1090].map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                        style={{ height: `${(value / 1200) * 100}%` }}
                        title={`Dia ${i + 1}: ${value} usuários`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Horários de Pico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[25, 18, 15, 12, 10, 12, 20, 35, 45, 58, 72, 85, 90, 88, 82, 78, 85, 92, 88, 75, 65, 52, 42, 30].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1">
                      <div
                        className="w-full bg-purple-500 rounded-t hover:bg-purple-600 transition-colors cursor-pointer"
                        style={{ height: `${height}%` }}
                        title={`${i}:00 - ${height}% capacidade`}
                      />
                      {i % 3 === 0 && (
                        <span className="text-xs text-slate-500">{i}h</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Location Stats */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Performance por Localização</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Loja Centro", users: 12456, sessions: 18234, avg: "2h 45m", conversion: 72 },
                  { name: "Shopping Norte", users: 10389, sessions: 15678, avg: "2h 20m", conversion: 68 },
                  { name: "Aeroporto", users: 9312, sessions: 14523, avg: "1h 55m", conversion: 58 },
                  { name: "Café Premium", users: 5890, sessions: 8934, avg: "3h 10m", conversion: 85 }
                ].map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-slate-900">{location.name}</div>
                      <div className="text-sm text-slate-600 mt-1">
                        {location.users.toLocaleString()} usuários • {location.sessions.toLocaleString()} sessões
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-900">{location.avg}</div>
                      <div className="text-sm text-slate-600">Tempo médio</div>
                    </div>
                    <div className="text-right ml-8">
                      <div className="text-slate-900">{location.conversion}%</div>
                      <div className="text-sm text-slate-600">Conversão</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Faixa Etária</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { range: "18-24 anos", percentage: 28, count: 13545 },
                  { range: "25-34 anos", percentage: 35, count: 16932 },
                  { range: "35-44 anos", percentage: 22, count: 10643 },
                  { range: "45-54 anos", percentage: 10, count: 4838 },
                  { range: "55+ anos", percentage: 5, count: 2419 }
                ].map((age, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">{age.range}</span>
                      <span className="text-slate-900">{age.percentage}% ({age.count.toLocaleString()})</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${age.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Gênero</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                        <span className="text-white">52%</span>
                      </div>
                      <div className="text-slate-900">Masculino</div>
                      <div className="text-sm text-slate-600">25,156 usuários</div>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-full bg-pink-500 flex items-center justify-center mb-2">
                        <span className="text-white">48%</span>
                      </div>
                      <div className="text-slate-900">Feminino</div>
                      <div className="text-sm text-slate-600">23,220 usuários</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Sistemas Operacionais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { os: "Android", percentage: 45, icon: "🤖", color: "bg-green-500" },
                  { os: "iOS", percentage: 38, icon: "🍎", color: "bg-blue-500" },
                  { os: "Windows", percentage: 12, icon: "🪟", color: "bg-cyan-500" },
                  { os: "macOS", percentage: 4, icon: "💻", color: "bg-slate-500" },
                  { os: "Outros", percentage: 1, icon: "📱", color: "bg-slate-400" }
                ].map((os, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span>{os.icon}</span>
                        <span className="text-slate-700">{os.os}</span>
                      </div>
                      <span className="text-slate-900">{os.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${os.color}`}
                        style={{ width: `${os.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Tipo de Dispositivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: "Smartphone", percentage: 72, color: "bg-purple-500" },
                  { type: "Tablet", percentage: 18, color: "bg-orange-500" },
                  { type: "Laptop", percentage: 8, color: "bg-blue-500" },
                  { type: "Desktop", percentage: 2, color: "bg-slate-500" }
                ].map((device, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-slate-600" />
                        <span className="text-slate-700">{device.type}</span>
                      </div>
                      <span className="text-slate-900">{device.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${device.color}`}
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Métodos de Login Utilizados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { method: "Facebook", percentage: 42, users: 20318, color: "bg-blue-600" },
                { method: "Google", percentage: 28, users: 13545, color: "bg-red-500" },
                { method: "SMS", percentage: 18, users: 8708, color: "bg-green-500" },
                { method: "Email", percentage: 12, users: 5805, color: "bg-purple-500" }
              ].map((method, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700">{method.method}</span>
                    <span className="text-slate-900">{method.percentage}% ({method.users.toLocaleString()} usuários)</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${method.color}`}
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Frequência de Visitas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { frequency: "Primeira vez", percentage: 32 },
                  { frequency: "2-5 visitas", percentage: 28 },
                  { frequency: "6-10 visitas", percentage: 22 },
                  { frequency: "11-20 visitas", percentage: 12 },
                  { frequency: "Mais de 20 visitas", percentage: 6 }
                ].map((freq, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">{freq.frequency}</span>
                      <span className="text-slate-900">{freq.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500"
                        style={{ width: `${freq.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Tempo de Permanência</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { duration: "Menos de 30 min", percentage: 15 },
                  { duration: "30 min - 1h", percentage: 22 },
                  { duration: "1h - 2h", percentage: 32 },
                  { duration: "2h - 4h", percentage: 20 },
                  { duration: "Mais de 4h", percentage: 11 }
                ].map((duration, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-700">{duration.duration}</span>
                      <span className="text-slate-900">{duration.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal-500"
                        style={{ width: `${duration.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
