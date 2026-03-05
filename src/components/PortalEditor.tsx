import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Save,
  Eye,
  Download,
  Copy,
  Undo,
  Redo,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { LoginPageEditor } from "./portal-editor/LoginPageEditor";
import { SuccessPageEditor } from "./portal-editor/SuccessPageEditor";
import { AuthenticationSettings } from "./portal-editor/AuthenticationSettings";
import { AdvancedSettings } from "./portal-editor/AdvancedSettings";
import { Badge } from "./ui/badge";

export function PortalEditor() {
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeEditor, setActiveEditor] = useState<"login" | "success">("login");

  const getPreviewWidth = () => {
    switch (viewMode) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Editor do Portal Cativo</h1>
          <p className="text-slate-600">Crie e personalize suas páginas de forma visual e intuitiva</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Copy className="h-4 w-4" />
            Duplicar
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Page Selector */}
      <Card className="border-slate-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={activeEditor === "login" ? "default" : "outline"}
                onClick={() => setActiveEditor("login")}
              >
                Página de Login
              </Button>
              <Button
                variant={activeEditor === "success" ? "default" : "outline"}
                onClick={() => setActiveEditor("success")}
              >
                Página Pós-Login
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Visualização:</span>
                <div className="flex gap-1 border border-slate-200 rounded-lg p-1">
                  <Button
                    variant={viewMode === "desktop" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("desktop")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "tablet" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("tablet")}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "mobile" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("mobile")}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor Content */}
      <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="design">Design Visual</TabsTrigger>
          <TabsTrigger value="auth">Autenticação</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="mt-6">
          {activeEditor === "login" ? (
            <LoginPageEditor viewMode={viewMode} previewWidth={getPreviewWidth()} />
          ) : (
            <SuccessPageEditor viewMode={viewMode} previewWidth={getPreviewWidth()} />
          )}
        </TabsContent>

        <TabsContent value="auth" className="mt-6">
          <AuthenticationSettings />
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <AdvancedSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
