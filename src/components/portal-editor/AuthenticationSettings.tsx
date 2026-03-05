import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Globe, Smartphone, Mail, Key, Bot, Zap, CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export function AuthenticationSettings() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Métodos de Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Label>Login com Facebook</Label>
                  <div className="text-sm text-slate-600">
                    Autenticação via rede social
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Label>Login com Google</Label>
                  <div className="text-sm text-slate-600">
                    Autenticação via conta Google
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Label>Login com Instagram</Label>
                  <div className="text-sm text-slate-600">
                    Autenticação via Instagram
                  </div>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Label>Login com SMS</Label>
                  <div className="text-sm text-slate-600">
                    Código via mensagem de texto
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Label>Login com Email</Label>
                  <div className="text-sm text-slate-600">
                    Email e senha tradicional
                  </div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Key className="h-5 w-5 text-white" />
                </div>
                <div>
                  <Label>Voucher / Código</Label>
                  <div className="text-sm text-slate-600">
                    Acesso via código pré-gerado
                  </div>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Credenciais OAuth</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Facebook App ID</Label>
              <Input placeholder="Digite o App ID do Facebook" />
            </div>

            <div className="space-y-2">
              <Label>Facebook App Secret</Label>
              <Input type="password" placeholder="Digite o App Secret" />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Google Client ID</Label>
              <Input placeholder="Digite o Client ID do Google" />
            </div>

            <div className="space-y-2">
              <Label>Google Client Secret</Label>
              <Input type="password" placeholder="Digite o Client Secret" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Campos do Formulário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Nome Completo", required: true },
              { label: "Email", required: true },
              { label: "Telefone", required: true },
              { label: "Data de Nascimento", required: false },
              { label: "CPF", required: false },
              { label: "Gênero", required: false },
              { label: "Código Postal", required: false },
              { label: "Empresa", required: false },
              { label: "Cargo", required: false }
            ].map((field, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label>{field.label}</Label>
                  {field.required && (
                    <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
                  )}
                </div>
                <Switch defaultChecked={field.required} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Validações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validar Email</Label>
                <div className="text-sm text-slate-600">
                  Verificar formato de email
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validar CPF</Label>
                <div className="text-sm text-slate-600">
                  Verificar CPF válido
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validar Telefone</Label>
                <div className="text-sm text-slate-600">
                  Formato brasileiro (11) 99999-9999
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Único</Label>
                <div className="text-sm text-slate-600">
                  Não permitir emails duplicados
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-600" />
              Integração com Agent AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-white rounded-lg border border-purple-200">
              <div className="flex items-start gap-2">
                <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <div className="text-sm text-slate-900">Automação Ativa</div>
                  <div className="text-xs text-slate-600 mt-1">
                    Quando o usuário se autenticar, os dados (nome, email, telefone) serão 
                    automaticamente salvos no banco de dados e o Agent AI enviará as mensagens 
                    configuradas via WhatsApp e Email.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Status:</span>
                <Badge className="bg-green-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Ativo
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Mensagens enviadas hoje:</span>
                <span className="text-slate-900">127</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Taxa de sucesso:</span>
                <span className="text-green-600">98.5%</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="text-sm">Campos capturados pelo Agent AI:</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Nome</Badge>
                <Badge variant="secondary">Email</Badge>
                <Badge variant="secondary">Telefone</Badge>
                <Badge variant="secondary">Data/Hora</Badge>
                <Badge variant="secondary">MAC Address</Badge>
                <Badge variant="secondary">IP</Badge>
              </div>
            </div>

            <Button className="w-full gap-2 bg-purple-600 hover:bg-purple-700">
              <Bot className="h-4 w-4" />
              Configurar Agent AI
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
