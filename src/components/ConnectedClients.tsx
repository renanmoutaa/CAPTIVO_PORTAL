import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { 
  Search, 
  Filter, 
  Download,
  MoreVertical,
  UserX,
  Clock,
  Activity
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const clients = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@email.com",
    device: "iPhone 14",
    ip: "192.168.1.45",
    mac: "00:1B:44:11:3A:B7",
    connected: "2h 15m",
    bandwidth: "245 MB",
    status: "online",
    location: "Loja Centro"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@email.com",
    device: "Samsung Galaxy S23",
    ip: "192.168.1.52",
    mac: "00:1B:44:11:3A:B8",
    connected: "1h 42m",
    bandwidth: "187 MB",
    status: "online",
    location: "Shopping Norte"
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@email.com",
    device: "MacBook Pro",
    ip: "192.168.1.78",
    mac: "00:1B:44:11:3A:B9",
    connected: "45m",
    bandwidth: "523 MB",
    status: "online",
    location: "Aeroporto"
  },
  {
    id: 4,
    name: "Ana Lima",
    email: "ana@email.com",
    device: "iPad Air",
    ip: "192.168.1.23",
    mac: "00:1B:44:11:3A:C0",
    connected: "3h 20m",
    bandwidth: "892 MB",
    status: "idle",
    location: "Café Premium"
  },
  {
    id: 5,
    name: "Carlos Rocha",
    email: "carlos@email.com",
    device: "Xiaomi 13",
    ip: "192.168.1.91",
    mac: "00:1B:44:11:3A:C1",
    connected: "5h 10m",
    bandwidth: "1.2 GB",
    status: "online",
    location: "Loja Centro"
  },
  {
    id: 6,
    name: "Beatriz Alves",
    email: "beatriz@email.com",
    device: "Windows Laptop",
    ip: "192.168.1.105",
    mac: "00:1B:44:11:3A:C2",
    connected: "30m",
    bandwidth: "98 MB",
    status: "online",
    location: "Shopping Norte"
  },
  {
    id: 7,
    name: "Rafael Mendes",
    email: "rafael@email.com",
    device: "iPhone 13",
    ip: "192.168.1.134",
    mac: "00:1B:44:11:3A:C3",
    connected: "2h 50m",
    bandwidth: "456 MB",
    status: "online",
    location: "Aeroporto"
  },
  {
    id: 8,
    name: "Juliana Ferreira",
    email: "juliana@email.com",
    device: "Samsung Tab S8",
    ip: "192.168.1.167",
    mac: "00:1B:44:11:3A:C4",
    connected: "1h 15m",
    bandwidth: "234 MB",
    status: "idle",
    location: "Café Premium"
  }
];

export function ConnectedClients() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.device.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Clientes Conectados</h1>
          <p className="text-slate-600">{clients.length} clientes ativos no momento</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Dados
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Total Online</div>
                <div className="text-slate-900 mt-1">1,247</div>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Novos Hoje</div>
                <div className="text-slate-900 mt-1">342</div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Tempo Médio</div>
                <div className="text-slate-900 mt-1">2h 34m</div>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Banda Total</div>
                <div className="text-slate-900 mt-1">45.8 GB</div>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle className="text-slate-900">Lista de Clientes</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Dispositivo</TableHead>
                  <TableHead>IP / MAC</TableHead>
                  <TableHead>Tempo Conectado</TableHead>
                  <TableHead>Banda Usada</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div>
                        <div className="text-slate-900">{client.name}</div>
                        <div className="text-sm text-slate-500">{client.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-700">{client.device}</span>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-slate-900 text-sm">{client.ip}</div>
                        <div className="text-xs text-slate-500">{client.mac}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-700">{client.connected}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-700">{client.bandwidth}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-slate-600 text-sm">{client.location}</span>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={client.status === "online" ? "default" : "secondary"}
                        className={client.status === "online" ? "bg-green-500" : ""}
                      >
                        {client.status === "online" ? "Online" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Limitar Banda</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <UserX className="h-4 w-4 mr-2" />
                            Desconectar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
