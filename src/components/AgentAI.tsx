import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { 
  Bot,
  MessageSquare,
  Mail,
  Send,
  Eye,
  Zap,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Settings,
  Database,
  Link as LinkIcon,
  ArrowRight,
  RefreshCw,
  Copy,
  Workflow,
  MessagesSquare
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { toast } from "sonner@2.0.3";
import { ChatwootPanel } from "./ChatwootPanel";

export function AgentAI() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("config");
  const [whatsappMessage, setWhatsappMessage] = useState(
    "Olá {nome}! 👋\n\nObrigado por se conectar ao nosso WiFi!\n\n🎁 Aproveite 15% OFF na sua primeira compra usando o cupom: WIFI15\n\nVisite nossa loja: https://minhaloja.com"
  );
  const [emailSubject, setEmailSubject] = useState("Bem-vindo! Aqui está seu cupom de 15% OFF 🎁");
  const [emailMessage, setEmailMessage] = useState(
    "Olá {nome},\n\nObrigado por se conectar à nossa rede WiFi!\n\nComo agradecimento, preparamos um presente especial para você:\n\n🎁 15% de desconto na sua primeira compra!\n\nUse o cupom: WIFI15\n\nAproveite para conhecer nossos produtos em: https://minhaloja.com\n\nAtenciosamente,\nEquipe"
  );

  const testConnection = () => {
    toast.success("Conexão testada com sucesso!");
    setApiConnected(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-slate-900 mb-2 flex items-center gap-2">
            <Bot className="h-7 w-7 text-purple-600" />
            Agent AI
          </h1>
          <p className="text-slate-600">Automação inteligente de marketing via WhatsApp e Email</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => setIsApiSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
            Configurar APIs
          </Button>
          <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
            <Sparkles className="h-4 w-4" />
            Otimizar com IA
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="config" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="conversations" className="gap-2">
            <MessagesSquare className="h-4 w-4" />
            Conversas
            <Badge className="ml-2 bg-purple-600 h-5 min-w-5">3</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-6 mt-6">
          {/* API Status Alert */}
          {!apiConnected && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm text-orange-900">APIs não configuradas</div>
                    <div className="text-xs text-orange-700 mt-1">
                      Configure as APIs (Evolution API ou N8N) para começar a enviar mensagens automaticamente.
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2 h-7 text-xs"
                      onClick={() => setIsApiSettingsOpen(true)}
                    >
                      Configurar Agora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Integration Flow */}
          <Card className="border-slate-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
            <Workflow className="h-4 w-4 text-purple-600" />
            Fluxo de Integração
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm text-slate-900">1. Usuário se Conecta</div>
              </div>
              <div className="text-xs text-slate-600">
                Cliente preenche formulário com telefone e email no portal cativo
              </div>
            </div>

            <ArrowRight className="h-5 w-5 text-slate-400 hidden md:block" />
            <div className="md:hidden text-slate-400">↓</div>

            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Database className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-sm text-slate-900">2. Dados Salvos</div>
              </div>
              <div className="text-xs text-slate-600">
                Informações são armazenadas no banco de dados automaticamente
              </div>
            </div>

            <ArrowRight className="h-5 w-5 text-slate-400 hidden md:block" />
            <div className="md:hidden text-slate-400">↓</div>

            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-sm text-slate-900">3. Agent AI Envia</div>
              </div>
              <div className="text-xs text-slate-600">
                Mensagens personalizadas são enviadas via WhatsApp/Email
              </div>
            </div>
          </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Mensagens Enviadas</div>
                <div className="text-slate-900 mt-1">12,456</div>
                <div className="text-xs text-green-600 mt-1">+23% vs mês anterior</div>
              </div>
              <Send className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Taxa de Abertura</div>
                <div className="text-slate-900 mt-1">68.5%</div>
                <div className="text-xs text-green-600 mt-1">+5.2% vs mês anterior</div>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Taxa de Conversão</div>
                <div className="text-slate-900 mt-1">24.8%</div>
                <div className="text-xs text-green-600 mt-1">+8.1% vs mês anterior</div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 text-sm">Novos Leads</div>
                <div className="text-slate-900 mt-1">3,892</div>
                <div className="text-xs text-green-600 mt-1">+15.3% vs mês anterior</div>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
          </div>

          {/* Database Capture Info */}
          <Card className="border-slate-200 bg-slate-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-slate-900">Captura Automática de Dados</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Os dados são capturados quando o usuário se autentica no portal cativo e salvos automaticamente no banco de dados. 
                    O Agent AI consulta esses dados em tempo real para enviar as mensagens configuradas.
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-slate-600">Portal Ativo</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-slate-600">Banco Conectado</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-slate-600">Monitorando</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="whatsapp" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="whatsapp" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="email" className="gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
            </TabsList>

            {/* WhatsApp Tab */}
            <TabsContent value="whatsapp" className="space-y-4">
              <Card className="border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                      Configurar Mensagem WhatsApp
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs">Ativo</Label>
                      <Switch checked={whatsappEnabled} onCheckedChange={setWhatsappEnabled} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Mensagem</Label>
                    <Textarea 
                      value={whatsappMessage}
                      onChange={(e) => setWhatsappMessage(e.target.value)}
                      rows={8}
                      placeholder="Digite sua mensagem aqui..."
                      className="font-sans"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{nome}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{email}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{telefone}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{data}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{hora}"}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Clique nas variáveis acima para inserir no texto. Elas serão substituídas automaticamente.
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Enviar Após</Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Imediatamente</SelectItem>
                          <SelectItem value="5min">5 minutos</SelectItem>
                          <SelectItem value="15min">15 minutos</SelectItem>
                          <SelectItem value="30min">30 minutos</SelectItem>
                          <SelectItem value="1hour">1 hora</SelectItem>
                          <SelectItem value="2hours">2 horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Horário de Envio</Label>
                      <Select defaultValue="anytime">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anytime">Qualquer horário</SelectItem>
                          <SelectItem value="business">Horário comercial (9h-18h)</SelectItem>
                          <SelectItem value="morning">Manhã (9h-12h)</SelectItem>
                          <SelectItem value="afternoon">Tarde (12h-18h)</SelectItem>
                          <SelectItem value="evening">Noite (18h-21h)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Número de WhatsApp Business</Label>
                    <Input placeholder="+55 (11) 99999-9999" defaultValue="+55 (11) 98765-4321" />
                    <p className="text-xs text-slate-500">
                      Número cadastrado na API do WhatsApp Business
                    </p>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Enviar Link de Rastreamento</Label>
                      <div className="text-xs text-slate-600">
                        Adicionar UTM para rastrear conversões
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Respeitar Opt-out</Label>
                      <div className="text-xs text-slate-600">
                        Não enviar para quem recusou marketing
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Tab */}
            <TabsContent value="email" className="space-y-4">
              <Card className="border-slate-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      Configurar Email
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs">Ativo</Label>
                      <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Assunto do Email</Label>
                    <Input 
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Digite o assunto..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Mensagem</Label>
                    <Textarea 
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      rows={10}
                      placeholder="Digite sua mensagem aqui..."
                      className="font-sans"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{nome}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{email}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{telefone}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{data}"}
                      </Badge>
                      <Badge variant="secondary" className="cursor-pointer hover:bg-slate-200">
                        {"{cupom}"}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      Clique nas variáveis acima para inserir no texto
                    </p>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Enviar Após</Label>
                      <Select defaultValue="immediate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Imediatamente</SelectItem>
                          <SelectItem value="5min">5 minutos</SelectItem>
                          <SelectItem value="15min">15 minutos</SelectItem>
                          <SelectItem value="30min">30 minutos</SelectItem>
                          <SelectItem value="1hour">1 hora</SelectItem>
                          <SelectItem value="2hours">2 horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Horário de Envio</Label>
                      <Select defaultValue="anytime">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anytime">Qualquer horário</SelectItem>
                          <SelectItem value="business">Horário comercial (9h-18h)</SelectItem>
                          <SelectItem value="morning">Manhã (9h-12h)</SelectItem>
                          <SelectItem value="afternoon">Tarde (12h-18h)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email Remetente</Label>
                      <Input placeholder="noreply@empresa.com" defaultValue="contato@empresa.com" />
                    </div>

                    <div className="space-y-2">
                      <Label>Nome do Remetente</Label>
                      <Input placeholder="Minha Empresa" defaultValue="Equipe WiFi" />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Incluir HTML Personalizado</Label>
                      <div className="text-xs text-slate-600">
                        Usar template HTML customizado
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Rastrear Aberturas</Label>
                      <div className="text-xs text-slate-600">
                        Adicionar pixel de rastreamento
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="space-y-0.5">
                      <Label className="text-sm">Rastrear Cliques</Label>
                      <div className="text-xs text-slate-600">
                        Adicionar UTM nos links
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent Activity */}
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900 text-sm">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuário</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Horário</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "João Silva", email: "joao@email.com", channel: "WhatsApp", status: "Enviado", time: "Agora" },
                    { name: "Maria Santos", email: "maria@email.com", channel: "Email", status: "Aberto", time: "2 min" },
                    { name: "Pedro Costa", email: "pedro@email.com", channel: "WhatsApp", status: "Lido", time: "5 min" },
                    { name: "Ana Lima", email: "ana@email.com", channel: "Email", status: "Clicado", time: "8 min" },
                    { name: "Carlos Rocha", email: "carlos@email.com", channel: "WhatsApp", status: "Enviado", time: "12 min" }
                  ].map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div>
                          <div className="text-sm text-slate-900">{activity.name}</div>
                          <div className="text-xs text-slate-500">{activity.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={
                          activity.channel === "WhatsApp" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-blue-100 text-blue-700"
                        }>
                          {activity.channel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={
                          activity.status === "Clicado" 
                            ? "bg-purple-100 text-purple-700" 
                            : activity.status === "Aberto" || activity.status === "Lido"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                        }>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{activity.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-200 sticky top-6">
            <CardHeader>
              <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="whatsapp-preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="whatsapp-preview" className="text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    WhatsApp
                  </TabsTrigger>
                  <TabsTrigger value="email-preview" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="whatsapp-preview">
                  <div className="bg-[#e5ddd5] rounded-lg p-4 min-h-[300px]" style={{ 
                    backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h100v100H0z\" fill=\"%23e5ddd5\"/%3E%3C/svg%3E')" 
                  }}>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-[85%] ml-auto">
                      <div className="text-sm text-slate-900 whitespace-pre-wrap break-words">
                        {whatsappMessage
                          .replace("{nome}", "João Silva")
                          .replace("{email}", "joao@email.com")
                          .replace("{telefone}", "(11) 99999-9999")
                          .replace("{data}", new Date().toLocaleDateString())
                          .replace("{hora}", new Date().toLocaleTimeString())
                        }
                      </div>
                      <div className="text-xs text-slate-500 text-right mt-1">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email-preview">
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-100 p-3 border-b border-slate-200">
                      <div className="text-xs text-slate-600">De: contato@empresa.com</div>
                      <div className="text-xs text-slate-600 mt-1">Para: joao@email.com</div>
                      <div className="text-sm text-slate-900 mt-2">
                        {emailSubject}
                      </div>
                    </div>
                    <div className="bg-white p-4">
                      <div className="text-sm text-slate-900 whitespace-pre-wrap">
                        {emailMessage
                          .replace("{nome}", "João Silva")
                          .replace("{email}", "joao@email.com")
                          .replace("{telefone}", "(11) 99999-9999")
                          .replace("{data}", new Date().toLocaleDateString())
                          .replace("{cupom}", "WIFI15")
                        }
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900 text-sm">Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full gap-2" variant="outline">
                <Send className="h-4 w-4" />
                Enviar Teste
              </Button>
              <Button className="w-full gap-2">
                <CheckCircle className="h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm text-amber-900">Dica de IA</div>
                  <div className="text-xs text-amber-700">
                    Mensagens enviadas entre 10h-12h têm 32% mais taxa de abertura. Considere ajustar o horário de envio.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        </TabsContent>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-6 mt-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-600 text-xs">Conversas Ativas</div>
                    <div className="text-slate-900 text-xl mt-1">28</div>
                  </div>
                  <MessagesSquare className="h-6 w-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-600 text-xs">Não Lidas</div>
                    <div className="text-slate-900 text-xl mt-1">3</div>
                  </div>
                  <Badge className="bg-red-600 h-6 w-6 flex items-center justify-center">!</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-600 text-xs">Respondidas</div>
                    <div className="text-slate-900 text-xl mt-1">15</div>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-slate-600 text-xs">Tempo Médio</div>
                    <div className="text-slate-900 text-xl mt-1">2.5min</div>
                  </div>
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <ChatwootPanel />
        </TabsContent>
      </Tabs>

      {/* API Settings Dialog */}
      <Dialog open={isApiSettingsOpen} onOpenChange={setIsApiSettingsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações de API
            </DialogTitle>
            <DialogDescription>
              Configure as APIs para integração com WhatsApp e automações
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-1">
            <Tabs defaultValue="evolution" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="evolution">Evolution API</TabsTrigger>
                <TabsTrigger value="n8n">N8N</TabsTrigger>
                <TabsTrigger value="webhook">Webhooks</TabsTrigger>
                <TabsTrigger value="chatwoot">Chatwoot</TabsTrigger>
              </TabsList>

              {/* Evolution API */}
              <TabsContent value="evolution" className="space-y-4">
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                        Evolution API - WhatsApp
                      </span>
                      <Badge variant={apiConnected ? "default" : "secondary"} className={apiConnected ? "bg-green-600" : ""}>
                        {apiConnected ? "Conectado" : "Desconectado"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>URL da API</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="https://sua-evolution-api.com" 
                          defaultValue="https://evolution-api.exemplo.com"
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        URL base da sua instância Evolution API
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>API Key / Token</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="password" 
                          placeholder="seu-token-aqui" 
                          defaultValue="B7D9F2K4-X3P8-9M2L-6N4S-H8W5T1Q7"
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Token de autenticação da Evolution API
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Nome da Instância</Label>
                      <Input 
                        placeholder="minha-instancia" 
                        defaultValue="hotspot-wifi"
                      />
                      <p className="text-xs text-slate-500">
                        Nome da instância criada na Evolution API
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Versão da API</Label>
                        <Select defaultValue="v1">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="v1">v1.x</SelectItem>
                            <SelectItem value="v2">v2.x</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Timeout (segundos)</Label>
                        <Input type="number" defaultValue="30" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Endpoint de Envio</Label>
                      <Input 
                        placeholder="/message/sendText" 
                        defaultValue="/message/sendText"
                        disabled
                        className="bg-slate-50"
                      />
                      <p className="text-xs text-slate-500">
                        Endpoint padrão para envio de mensagens de texto
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Verificar QR Code automaticamente</Label>
                        <div className="text-xs text-slate-600">
                          Detecta quando precisa escanear QR Code
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Retry automático em falhas</Label>
                        <div className="text-xs text-slate-600">
                          Tentar novamente em caso de erro
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Button 
                      className="w-full gap-2" 
                      variant="outline"
                      onClick={testConnection}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Testar Conexão
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* N8N */}
              <TabsContent value="n8n" className="space-y-4">
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Workflow className="h-4 w-4 text-purple-600" />
                        N8N - Automação Avançada
                      </span>
                      <Badge variant="secondary">
                        Webhook
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>URL do Webhook N8N</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="https://seu-n8n.com/webhook/..." 
                          defaultValue="https://n8n.exemplo.com/webhook/hotspot-agent"
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        URL do webhook que receberá os dados do usuário
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Authentication Header (Opcional)</Label>
                      <Input 
                        type="password" 
                        placeholder="Bearer seu-token" 
                      />
                      <p className="text-xs text-slate-500">
                        Token de segurança se o webhook exigir autenticação
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Método HTTP</Label>
                      <Select defaultValue="post">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="post">POST</SelectItem>
                          <SelectItem value="get">GET</SelectItem>
                          <SelectItem value="put">PUT</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Payload de Exemplo</Label>
                      <Textarea 
                        rows={8}
                        className="font-mono text-xs"
                        defaultValue={JSON.stringify({
                          "event": "user_authenticated",
                          "timestamp": "2025-10-27T10:30:00Z",
                          "user": {
                            "name": "{nome}",
                            "email": "{email}",
                            "phone": "{telefone}",
                            "mac_address": "{mac}",
                            "ip_address": "{ip}"
                          },
                          "metadata": {
                            "controller_id": "{controller_id}",
                            "location": "{location}"
                          }
                        }, null, 2)}
                        disabled
                        className="bg-slate-50"
                      />
                      <p className="text-xs text-slate-500">
                        Estrutura de dados enviada para o N8N após autenticação
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Aguardar resposta do N8N</Label>
                        <div className="text-xs text-slate-600">
                          Esperar processamento antes de liberar acesso
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <Button className="w-full gap-2" variant="outline">
                      <RefreshCw className="h-4 w-4" />
                      Testar Webhook
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Webhooks */}
              <TabsContent value="webhook" className="space-y-4">
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-blue-600" />
                      Webhooks Personalizados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Webhook - Ao Conectar (On Connect)</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="https://sua-api.com/webhook/connect" 
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Chamado quando usuário preenche o formulário
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Webhook - Após Autenticação (Post Auth)</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="https://sua-api.com/webhook/authenticated" 
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Chamado após autenticação bem-sucedida
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Webhook - Ao Desconectar (On Disconnect)</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="https://sua-api.com/webhook/disconnect" 
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Chamado quando usuário desconecta do WiFi
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Headers Personalizados (JSON)</Label>
                      <Textarea 
                        rows={4}
                        className="font-mono text-xs"
                        placeholder={'{\n  "Authorization": "Bearer seu-token",\n  "Content-Type": "application/json"\n}'}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Timeout (segundos)</Label>
                        <Input type="number" defaultValue="10" />
                      </div>

                      <div className="space-y-2">
                        <Label>Retries em Falha</Label>
                        <Input type="number" defaultValue="3" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Enviar dados completos</Label>
                        <div className="text-xs text-slate-600">
                          Incluir MAC, IP, localização, etc
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4 text-slate-600" />
                      Banco de Dados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-2">
                        <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <div className="text-sm text-blue-900">Armazenamento Automático</div>
                          <div className="text-xs text-blue-700 mt-1">
                            Todos os dados de autenticação são salvos automaticamente no banco de dados local. 
                            O Agent AI consulta esses dados em tempo real para enviar as mensagens.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Registros no banco:</span>
                        <span className="text-slate-900">12,456</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Últimas 24h:</span>
                        <span className="text-slate-900">892</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Espaço usado:</span>
                        <span className="text-slate-900">245 MB</span>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Database className="h-4 w-4 mr-2" />
                      Visualizar Banco de Dados
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Chatwoot */}
              <TabsContent value="chatwoot" className="space-y-4">
                <Card className="border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MessagesSquare className="h-4 w-4 text-purple-600" />
                        Chatwoot - Central de Conversas
                      </span>
                      <Badge className="bg-purple-600">
                        Integrado
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-start gap-2">
                        <MessagesSquare className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <div className="text-sm text-purple-900">Central de Conversas Ativa</div>
                          <div className="text-xs text-purple-700 mt-1">
                            O Chatwoot está integrado e capturando automaticamente todas as conversas 
                            dos contatos que receberam mensagens do Agent AI.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>URL do Chatwoot (Opcional)</Label>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="https://chatwoot.exemplo.com" 
                        />
                        <Button size="icon" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500">
                        Configure para sincronizar com sua instância Chatwoot externa
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>API Token Chatwoot</Label>
                      <Input 
                        type="password" 
                        placeholder="seu-token-chatwoot" 
                      />
                      <p className="text-xs text-slate-500">
                        Token de acesso da API Chatwoot
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>ID da Inbox</Label>
                      <Input 
                        placeholder="123456" 
                      />
                      <p className="text-xs text-slate-500">
                        ID da inbox onde as conversas serão sincronizadas
                      </p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label className="text-sm">Estatísticas Atuais</Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Conversas monitoradas:</span>
                          <span className="text-slate-900">28</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Mensagens não lidas:</span>
                          <span className="text-slate-900">3</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Taxa de resposta:</span>
                          <span className="text-slate-900">53.6%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Tempo médio de resposta:</span>
                          <span className="text-slate-900">2.5 min</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Sincronização Bidirecional</Label>
                        <div className="text-xs text-slate-600">
                          Enviar e receber mensagens via Chatwoot
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Notificações de Novas Mensagens</Label>
                        <div className="text-xs text-slate-600">
                          Receber alertas de respostas dos clientes
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Auto-atribuição de Agentes</Label>
                        <div className="text-xs text-slate-600">
                          Atribuir conversas automaticamente para agentes
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <Button className="w-full gap-2" variant="outline">
                      <RefreshCw className="h-4 w-4" />
                      Sincronizar Agora
                    </Button>

                    <Button 
                      className="w-full gap-2 bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        setIsApiSettingsOpen(false);
                        setActiveMainTab("conversations");
                      }}
                    >
                      <MessagesSquare className="h-4 w-4" />
                      Abrir Central de Conversas
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-4">
            <Button variant="outline" onClick={() => setIsApiSettingsOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => {
              setIsApiSettingsOpen(false);
              toast.success("Configurações salvas com sucesso!");
            }}>
              Salvar Configurações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
