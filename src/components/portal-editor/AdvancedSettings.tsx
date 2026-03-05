import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Code, Zap, Shield, Clock } from "lucide-react";

export function AdvancedSettings() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Configurações de Sessão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tempo de Sessão (minutos)</Label>
              <Input type="number" defaultValue="120" />
              <p className="text-xs text-slate-500">Tempo máximo que o usuário fica conectado</p>
            </div>

            <div className="space-y-2">
              <Label>Limite de Banda (MB/s)</Label>
              <Input type="number" defaultValue="10" />
              <p className="text-xs text-slate-500">Velocidade máxima por usuário</p>
            </div>

            <div className="space-y-2">
              <Label>Limite de Download (GB)</Label>
              <Input type="number" defaultValue="5" />
              <p className="text-xs text-slate-500">Limite total de download por sessão</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reconexão Automática</Label>
                <div className="text-sm text-slate-600">
                  Permitir reconexão sem novo login
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Múltiplos Dispositivos</Label>
                <div className="text-sm text-slate-600">
                  Permitir login simultâneo
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacidade e Termos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Aceite de Termos Obrigatório</Label>
                <div className="text-sm text-slate-600">
                  Usuário deve aceitar para conectar
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Opt-in para Marketing</Label>
                <div className="text-sm text-slate-600">
                  Checkbox para receber emails
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Analytics e Cookies</Label>
                <div className="text-sm text-slate-600">
                  Coleta de dados anônimos
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>URL dos Termos de Uso</Label>
              <Input placeholder="https://empresa.com/termos" defaultValue="https://empresa.com/termos" />
            </div>

            <div className="space-y-2">
              <Label>URL da Política de Privacidade</Label>
              <Input placeholder="https://empresa.com/privacidade" defaultValue="https://empresa.com/privacidade" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Integrações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Webhook URL (Novo Login)</Label>
              <Input placeholder="https://api.empresa.com/webhook" />
              <p className="text-xs text-slate-500">Recebe notificação quando novo usuário se conecta</p>
            </div>

            <div className="space-y-2">
              <Label>Google Analytics ID</Label>
              <Input placeholder="G-XXXXXXXXXX" />
            </div>

            <div className="space-y-2">
              <Label>Facebook Pixel ID</Label>
              <Input placeholder="000000000000000" />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Integração CRM</Label>
                <div className="text-sm text-slate-600">
                  Enviar dados para CRM
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">URL de Redirecionamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Redirecionar Após Login</Label>
              <Input placeholder="https://empresa.com/obrigado" />
              <p className="text-xs text-slate-500">Página para onde o usuário será enviado</p>
            </div>

            <div className="space-y-2">
              <Label>Redirecionar Após Logout</Label>
              <Input placeholder="https://empresa.com" />
            </div>

            <div className="space-y-2">
              <Label>Tempo de Espera (segundos)</Label>
              <Input type="number" defaultValue="3" />
              <p className="text-xs text-slate-500">Tempo antes de redirecionar</p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Abrir em Nova Aba</Label>
                <div className="text-sm text-slate-600">
                  Redirecionamento em nova aba
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Code className="h-5 w-5" />
              CSS Customizado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label>Adicione seu CSS personalizado</Label>
            <Textarea 
              placeholder="/* Adicione seu CSS aqui */
.login-form {
  /* seus estilos */
}

.success-page {
  /* seus estilos */
}"
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-xs text-slate-500">
              Use classes CSS personalizadas para ajustes finos
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Code className="h-5 w-5" />
              JavaScript Customizado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label>Adicione scripts personalizados</Label>
            <Textarea 
              placeholder="// Adicione seu JavaScript aqui
// Ex: Google Tag Manager, Analytics, etc."
              rows={8}
              className="font-mono text-sm"
            />
            <p className="text-xs text-slate-500">
              Scripts serão injetados no head da página
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 border-2">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-900">Resetar Configurações</div>
                <div className="text-sm text-slate-600">
                  Voltar para configurações padrão
                </div>
              </div>
              <Button variant="outline">Resetar</Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-900">Exportar Configurações</div>
                <div className="text-sm text-slate-600">
                  Baixar arquivo JSON com todas as configurações
                </div>
              </div>
              <Button variant="outline">Exportar</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
