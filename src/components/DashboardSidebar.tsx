import { 
  LayoutDashboard, 
  Users, 
  Wifi, 
  Palette, 
  BarChart3, 
  Settings,
  ChevronLeft
} from "lucide-react";
import { cn } from "./ui/utils";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clients", label: "Clientes Conectados", icon: Users },
  { id: "controllers", label: "Controladoras", icon: Wifi },
  { id: "portal", label: "Editor do Portal", icon: Palette },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Configurações", icon: Settings },
];

export function DashboardSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: DashboardSidebarProps) {
  return (
    <aside 
      className={cn(
        "bg-slate-900 text-white transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-0 md:w-20"
      )}
    >
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wifi className="h-5 w-5" />
            </div>
            <span>HotSpot Pro</span>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:block p-1 hover:bg-slate-800 rounded"
        >
          <ChevronLeft className={cn(
            "h-5 w-5 transition-transform",
            !isOpen && "rotate-180"
          )} />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {isOpen && (
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span>AD</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm">Admin</div>
              <div className="text-xs text-slate-400 truncate">admin@empresa.com</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
