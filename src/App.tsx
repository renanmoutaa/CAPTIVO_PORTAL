import { useState } from "react";
import { DashboardHeader } from "./components/DashboardHeader";
import { DashboardOverview } from "./components/DashboardOverview";
import { ConnectedClients } from "./components/ConnectedClients";
import { Controllers } from "./components/Controllers";
import { PortalEditor } from "./components/PortalEditor";
import { Analytics } from "./components/Analytics";
import { AgentAI } from "./components/AgentAI";
import { Settings } from "./components/Settings";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "clients":
        return <ConnectedClients />;
      case "controllers":
        return <Controllers />;
      case "portal":
        return <PortalEditor />;
      case "analytics":
        return <Analytics />;
      case "agent-ai":
        return <AgentAI />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <DashboardHeader 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <main className="flex-1 overflow-y-auto p-6">
        {renderContent()}
      </main>

      <Toaster />
    </div>
  );
}
