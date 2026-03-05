import { Bell, Search, Wifi, LayoutDashboard, Users, Palette, BarChart3, Settings as SettingsIcon, Bot } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "./ui/utils";

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clients", label: "Clientes Conectados", icon: Users },
  { id: "controllers", label: "Controladoras", icon: Wifi },
  { id: "portal", label: "Editor do Portal", icon: Palette },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "agent-ai", label: "Agent AI", icon: Bot },
  { id: "settings", label: "Configurações", icon: SettingsIcon },
];

export function DashboardHeader({ activeTab, setActiveTab }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200">
      {/* Top Bar */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Wifi className="h-5 w-5 text-white" />
              </div>
              <span className="text-slate-900 hidden sm:inline">HotSpot Pro</span>
            </div>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar clientes, controladoras..."
                className="pl-10 border-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                3
              </Badge>
            </Button>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="hidden sm:inline">Sistema Online</span>
            </div>

            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
                AD
              </div>
              <div className="hidden lg:block">
                <div className="text-sm text-slate-900">Admin</div>
                <div className="text-xs text-slate-500">admin@empresa.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="px-6">
        <div className="flex items-center gap-1 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm transition-colors whitespace-nowrap border-b-2",
                  activeTab === item.id
                    ? "text-blue-600 border-blue-600"
                    : "text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
