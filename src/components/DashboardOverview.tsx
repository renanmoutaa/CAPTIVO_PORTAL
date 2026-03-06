import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Users,
  Wifi,
  TrendingUp,
  Activity,
  ArrowUp,
  ArrowDown,
  Clock
} from "lucide-react";
import { Progress } from "./ui/progress";

export function DashboardOverview() {
  const [totalClients, setTotalClients] = useState(0);
  const [totalControllers, setTotalControllers] = useState(0);
  const [recentConnections, setRecentConnections] = useState<any[]>([]);
  const [controllers, setControllers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total clients
        const { count: clientCount } = await supabase
          .from('connected_clients')
          .select('*', { count: 'exact', head: true });

        if (clientCount !== null) setTotalClients(clientCount);

        // Fetch recent connections
        const { data: recentClientsData } = await supabase
          .from('connected_clients')
          .select('*')
          .order('connected_at', { ascending: false })
          .limit(5);
        if (recentClientsData) setRecentConnections(recentClientsData);

        // Fetch controllers
        const { data: controllersData, count: controllersCount } = await supabase
          .from('controllers')
          .select('*', { count: 'exact' });

        if (controllersCount !== null) setTotalControllers(controllersCount);
        if (controllersData) setControllers(controllersData);

      } catch (error) {
        console.error("Dashboard overview error:", error);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Clientes Autenticados",
      value: totalClients.toString(),
      change: "Tempo Real",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Controladoras Ativas",
      value: totalControllers.toString(),
      change: "Tempo Real",
      trend: "up",
      icon: Wifi,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Taxa de Conversão",
      value: totalClients > 0 ? "100%" : "0%", // Simplification for now
      change: "Real",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Uptime do Sistema",
      value: "99.9%",
      change: "Estável",
      trend: "up",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Visão geral do sistema de hotspot</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUp : ArrowDown;
          return (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                    <TrendIcon className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.title}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Connections */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Conexões Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentConnections.map((client, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-700">{client.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-900">{client.name}</div>
                    <div className="text-xs text-slate-500 truncate">{client.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-xs text-slate-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {client.duration}
                      </div>
                      <div className="text-xs text-slate-500">{client.bandwidth}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${client.status === "online" ? "bg-green-500" : "bg-slate-300"
                      }`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Controllers Status */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Status das Controladoras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {controllers.map((controller, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">{controller.name}</div>
                      <div className="text-xs text-slate-500">{controller.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-900">{controller.clients} clientes</div>
                      <div className={`text-xs ${controller.status === "online" ? "text-green-600" : "text-orange-600"
                        }`}>
                        {controller.status === "online" ? "Online" : "Atenção"}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Carga do sistema</span>
                      <span>{controller.load}%</span>
                    </div>
                    <Progress
                      value={controller.load}
                      className={controller.load > 80 ? "bg-slate-100 [&>div]:bg-orange-500" : ""}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Traffic Chart */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-900">Tráfego de Rede (Últimas 24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {[45, 52, 48, 65, 58, 72, 68, 75, 70, 82, 78, 85, 80, 88, 92, 87, 90, 95, 88, 92, 85, 78, 70, 65].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1">
                <div
                  className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{ height: `${height}%` }}
                  title={`${i}:00 - ${height}% utilização`}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 mt-4">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
