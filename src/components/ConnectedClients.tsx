import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
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

export function ConnectedClients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('connected_clients')
        .select('*')
        .order('connected_at', { ascending: false });

      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        setClients(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();

    // Subscribe to realtime changes
    const clientsSubscription = supabase
      .channel('public:connected_clients')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'connected_clients' }, payload => {
        fetchClients();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(clientsSubscription);
    };
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.device && client.device.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900 mb-2">Clientes Conectados</h1>
          <p className="text-slate-600">{clients.length} clientes registrados</p>
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
