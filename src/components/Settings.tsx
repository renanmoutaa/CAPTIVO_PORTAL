import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900 mb-2">Configurações</h1>
        <p className="text-slate-600">Gerencie as configurações da sua conta e sistema</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="network">Rede</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input defaultValue="Minha Empresa Ltda" />
              </div>

              <div className="space-y-2">
                <Label>Email Principal</Label>
                <Input type="email" defaultValue="contato@empresa.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="+55 (11) 9999-9999" />
                </div>
                <div className="space-y-2">
                  <Label>CNPJ</Label>
                  <Input defaultValue="00.000.000/0000-00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Endereço</Label>
                <Input defaultValue="Av. Paulista, 1000 - São Paulo, SP" />
              </div>

              <Separator />

              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Plano e Faturamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="text-slate-900">Plano Empresarial</div>
                  <div className="text-sm text-slate-600 mt-1">8 controladoras ativas</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-900">R$ 499/mês</div>
                  <div className="text-sm text-slate-600">Próxima cobrança: 23/11/2025</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">Alterar Plano</Button>
                <Button variant="outline">Ver Faturas</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Configurações de Rede</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Limite Global de Banda (MB/s)</Label>
                <Input type="number" defaultValue="100" />
                <p className="text-sm text-slate-600">
                  Limite de velocidade para todos os usuários
                </p>
              </div>

              <div className="space-y-2">
                <Label>Tempo Máximo de Sessão (horas)</Label>
                <Input type="number" defaultValue="4" />
                <p className="text-sm text-slate-600">
                  Tempo máximo que um usuário pode ficar conectado
                </p>
              </div>

              <div className="space-y-2">
                <Label>Máximo de Dispositivos por Usuário</Label>
                <Input type="number" defaultValue="3" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-desconexão por Inatividade</Label>
                  <div className="text-sm text-slate-600">
                    Desconectar usuários inativos automaticamente
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Balanceamento de Carga</Label>
                  <div className="text-sm text-slate-600">
                    Distribuir usuários entre controladoras automaticamente
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <Button>Salvar Configurações</Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Sites Bloqueados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Adicionar Site Bloqueado</Label>
                <div className="flex gap-2">
                  <Input placeholder="exemplo.com" />
                  <Button>Adicionar</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Sites Bloqueados Atualmente</Label>
                <div className="border border-slate-200 rounded-lg p-4 space-y-2">
                  {["torrent-site.com", "streaming-ilegal.net", "malicious-site.org"].map((site, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span className="text-slate-700">{site}</span>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Notificações por Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Usuários</Label>
                  <div className="text-sm text-slate-600">
                    Receber email quando novos usuários se conectarem
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatório Diário</Label>
                  <div className="text-sm text-slate-600">
                    Resumo diário de estatísticas
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatório Semanal</Label>
                  <div className="text-sm text-slate-600">
                    Resumo semanal detalhado
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Sistema</Label>
                  <div className="text-sm text-slate-600">
                    Notificações sobre problemas e manutenção
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas de Capacidade</Label>
                  <div className="text-sm text-slate-600">
                    Quando controladoras atingirem 80% da capacidade
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Notificações Push</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Ativar Notificações Push</Label>
                  <div className="text-sm text-slate-600">
                    Receber notificações no navegador
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertas Críticos</Label>
                  <div className="text-sm text-slate-600">
                    Problemas que requerem atenção imediata
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Segurança da Conta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Alterar Senha</Label>
                <Input type="password" placeholder="Senha atual" />
                <Input type="password" placeholder="Nova senha" />
                <Input type="password" placeholder="Confirmar nova senha" />
                <Button>Atualizar Senha</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Autenticação de Dois Fatores (2FA)</Label>
                  <div className="text-sm text-slate-600">
                    Adicione uma camada extra de segurança
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-slate-900">Sessões Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { device: "Chrome - Windows", location: "São Paulo, BR", current: true, time: "Ativa agora" },
                  { device: "Safari - iPhone", location: "São Paulo, BR", current: false, time: "2 horas atrás" },
                  { device: "Firefox - macOS", location: "São Paulo, BR", current: false, time: "1 dia atrás" }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <div className="text-slate-900">{session.device}</div>
                      <div className="text-sm text-slate-600">{session.location} • {session.time}</div>
                    </div>
                    {session.current ? (
                      <span className="text-sm text-green-600">Sessão atual</span>
                    ) : (
                      <Button variant="outline" size="sm">Encerrar</Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Exportar Dados</div>
                  <div className="text-sm text-slate-600">
                    Baixar todos os dados da sua conta
                  </div>
                </div>
                <Button variant="outline">Exportar</Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-900">Excluir Conta</div>
                  <div className="text-sm text-slate-600">
                    Excluir permanentemente sua conta e dados
                  </div>
                </div>
                <Button variant="destructive">Excluir</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
