import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  Plus,
  Wifi,
  MapPin,
  Users,
  Activity,
  Settings,
  Power,
  RefreshCw,
  Radio
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";

const controllers = [
  {
    id: 1,
    name: "Controladora Principal",
    location: "Loja Centro - Av. Paulista, 1000",
    ip: "192.168.1.1",
    model: "UniFi Dream Machine Pro",
    clients: 456,
    maxClients: 500,
    status: "online",
    uptime: "45d 12h",
    load: 65,
    bandwidth: "1.2 GB/s",
    version: "7.5.172",
    site: "default",
    ssid: "WiFi-Gratuito",
    accessPoints: 8,
    networks: 3
  },
  {
    id: 2,
    name: "Controladora Filial 1",
    location: "Shopping Norte - Piso L2",
    ip: "192.168.2.1",
    model: "UniFi Cloud Key Gen2",
    clients: 389,
    maxClients: 400,
    status: "online",
    uptime: "32d 8h",
    load: 52,
    bandwidth: "980 MB/s",
    version: "7.5.172",
    site: "shopping-norte",
    ssid: "WiFi-Shopping",
    accessPoints: 6,
    networks: 2
  },
  {
    id: 3,
    name: "Controladora Filial 2",
    location: "Aeroporto - Terminal 2",
    ip: "192.168.3.1",
    model: "UniFi Dream Machine",
    clients: 312,
    maxClients: 400,
    status: "online",
    uptime: "28d 4h",
    load: 48,
    bandwidth: "850 MB/s",
    version: "7.5.172",
    site: "aeroporto",
    ssid: "WiFi-Airport",
    accessPoints: 5,
    networks: 2
  },
  {
    id: 4,
    name: "Controladora Café",
    location: "Café Premium - Rua Oscar Freire",
    ip: "192.168.4.1",
    model: "UniFi Cloud Key",
    clients: 90,
    maxClients: 100,
    status: "warning",
    uptime: "12d 18h",
    load: 85,
    bandwidth: "450 MB/s",
    version: "7.4.156",
    site: "cafe-premium",
    ssid: "WiFi-Cafe",
    accessPoints: 2,
    networks: 1
  }
];

export function Controllers() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedController, setSelectedController] = useState<typeof controllers[0] | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = (controller: typeof controllers[0]) => {
    setSelectedController(controller);
    setIsSettingsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Controladoras</h1>
          <p className="text-slate-600">Gerencie suas controladoras de rede</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Controladora
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Controladora</DialogTitle>
              <DialogDescription>
                Configure uma nova controladora UniFi para gerenciamento
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nome da Controladora</Label>
                <Input placeholder="Ex: Controladora Filial 3" />
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <Input placeholder="Ex: Loja Shopping Sul" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Endereço IP</Label>
                  <Input placeholder="192.168.x.x" />
                </div>
                <div className="space-y-2">
                  <Label>Porta</Label>
                  <Input placeholder="8443" defaultValue="8443" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Modelo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="udm-pro">UniFi Dream Machine Pro</SelectItem>
                    <SelectItem value="udm">UniFi Dream Machine</SelectItem>
                    <SelectItem value="ck-gen2">Cloud Key Gen2</SelectItem>
                    <SelectItem value="ck">Cloud Key</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Usuário</Label>
                  <Input placeholder="admin" />
                </div>
                <div className="space-y-2">
                  <Label>Senha</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Adicionar Controladora
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Total Controladoras</div>
                <div className="text-slate-900 mt-1">8</div>
              </div>
              <Wifi className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Online</div>
                <div className="text-slate-900 mt-1">7</div>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Clientes Total</div>
                <div className="text-slate-900 mt-1">1,247</div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Access Points</div>
                <div className="text-slate-900 mt-1">21</div>
              </div>
              <Radio className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controllers Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {controllers.map((controller) => (
          <Card key={controller.id} className="border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-3 rounded-lg ${
                    controller.status === "online" ? "bg-green-50" : "bg-orange-50"
                  }`}>
                    <Wifi className={`h-6 w-6 ${
                      controller.status === "online" ? "text-green-600" : "text-orange-600"
                    }`} />
                  </div>
                  <div>
                    <CardTitle className="text-slate-900">{controller.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                      <MapPin className="h-3 w-3" />
                      {controller.location}
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={controller.status === "online" ? "default" : "secondary"}
                  className={controller.status === "online" ? "bg-green-500" : "bg-orange-500"}
                >
                  {controller.status === "online" ? "Online" : "Atenção"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-600">Modelo</div>
                  <div className="text-slate-900">{controller.model}</div>
                </div>
                <div>
                  <div className="text-slate-600">Versão</div>
                  <div className="text-slate-900">{controller.version}</div>
                </div>
                <div>
                  <div className="text-slate-600">Endereço IP</div>
                  <div className="text-slate-900">{controller.ip}</div>
                </div>
                <div>
                  <div className="text-slate-600">Uptime</div>
                  <div className="text-slate-900">{controller.uptime}</div>
                </div>
                <div>
                  <div className="text-slate-600">Site UniFi</div>
                  <div className="text-slate-900">{controller.site}</div>
                </div>
                <div>
                  <div className="text-slate-600">Access Points</div>
                  <div className="text-slate-900">{controller.accessPoints} APs</div>
                </div>
              </div>

              {/* Clients Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Clientes Conectados</span>
                  <span className="text-slate-900">{controller.clients} / {controller.maxClients}</span>
                </div>
                <Progress 
                  value={(controller.clients / controller.maxClients) * 100}
                  className={controller.load > 80 ? "[&>div]:bg-orange-500" : ""}
                />
              </div>

              {/* System Load */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Carga do Sistema</span>
                  <span className="text-slate-900">{controller.load}%</span>
                </div>
                <Progress 
                  value={controller.load}
                  className={controller.load > 80 ? "[&>div]:bg-orange-500" : ""}
                />
              </div>

              {/* Stats */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-slate-600">Banda: </span>
                  <span className="text-slate-900">{controller.bandwidth}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => openSettings(controller)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Power className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simplified Controller Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações - {selectedController?.name}
            </DialogTitle>
            <DialogDescription>
              Configure os parâmetros da controladora UniFi
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4 overflow-y-auto flex-1 px-1">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm text-slate-900">Informações Básicas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Nome da Controladora</Label>
                  <Input defaultValue={selectedController?.name} className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Localização</Label>
                  <Input defaultValue={selectedController?.location} className="text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Endereço IP</Label>
                  <Input defaultValue={selectedController?.ip} className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Porta</Label>
                  <Input defaultValue="8443" className="text-sm" />
                </div>
              </div>
            </div>

            <Separator />

            {/* UniFi Settings */}
            <div className="space-y-4">
              <h3 className="text-sm text-slate-900">Configurações UniFi</h3>
              
              <div className="space-y-2">
                <Label className="text-xs">Site UniFi</Label>
                <Select defaultValue={selectedController?.site}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">default (Principal)</SelectItem>
                    <SelectItem value="shopping-norte">shopping-norte</SelectItem>
                    <SelectItem value="aeroporto">aeroporto</SelectItem>
                    <SelectItem value="cafe-premium">cafe-premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">SSID Principal</Label>
                <Input defaultValue={selectedController?.ssid} className="text-sm" placeholder="Nome da rede WiFi" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Access Points Ativos</Label>
                  <Input defaultValue={selectedController?.accessPoints} type="number" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Número de Redes</Label>
                  <Input defaultValue={selectedController?.networks} type="number" className="text-sm" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Limits */}
            <div className="space-y-4">
              <h3 className="text-sm text-slate-900">Limites</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Máximo de Clientes</Label>
                  <Input defaultValue={selectedController?.maxClients} type="number" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Limite de Banda (Mbps)</Label>
                  <Input defaultValue="1000" type="number" className="text-sm" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Credentials */}
            <div className="space-y-4">
              <h3 className="text-sm text-slate-900">Credenciais de Acesso</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs">Usuário Admin</Label>
                  <Input defaultValue="admin" className="text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Senha</Label>
                  <Input type="password" placeholder="••••••••" className="text-sm" />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-4">
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsSettingsOpen(false)}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
