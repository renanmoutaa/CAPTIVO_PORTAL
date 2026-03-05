import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Globe, Smartphone, Mail, Key, Bot, Zap, CheckCircle } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { usePortalSettings } from "../../contexts/PortalSettingsContext";

export function AuthenticationSettings() {
  const { settings, updateSetting } = usePortalSettings();

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
              <Switch checked={settings.login_facebook} onCheckedChange={(v: boolean) => updateSetting('login_facebook', v)} />
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
              <Switch checked={settings.login_google} onCheckedChange={(v: boolean) => updateSetting('login_google', v)} />
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
              <Switch checked={settings.login_instagram} onCheckedChange={(v: boolean) => updateSetting('login_instagram', v)} />
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
              <Switch checked={settings.login_sms} onCheckedChange={(v: boolean) => updateSetting('login_sms', v)} />
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
              <Switch checked={settings.login_email} onCheckedChange={(v: boolean) => updateSetting('login_email', v)} />
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
              <Switch checked={settings.login_voucher} onCheckedChange={(v: boolean) => updateSetting('login_voucher', v)} />
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
              <Input
                placeholder="Digite o App ID do Facebook"
                value={settings.facebook_app_id}
                onChange={(e) => updateSetting('facebook_app_id', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Facebook App Secret</Label>
              <Input
                type="password"
                placeholder="Digite o App Secret"
                value={settings.facebook_app_secret}
                onChange={(e) => updateSetting('facebook_app_secret', e.target.value)}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Google Client ID</Label>
              <Input
                placeholder="Digite o Client ID do Google"
                value={settings.google_client_id}
                onChange={(e) => updateSetting('google_client_id', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Google Client Secret</Label>
              <Input
                type="password"
                placeholder="Digite o Client Secret"
                value={settings.google_client_secret}
                onChange={(e) => updateSetting('google_client_secret', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Campos do Formulário (Obrigatórios)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: "field_name_required", label: "Nome Completo" },
              { id: "field_email_required", label: "Email" },
              { id: "field_phone_required", label: "Telefone" },
              { id: "field_birthdate_required", label: "Data de Nascimento" },
              { id: "field_cpf_required", label: "CPF" },
              { id: "field_gender_required", label: "Gênero" },
              { id: "field_zipcode_required", label: "Código Postal" },
              { id: "field_company_required", label: "Empresa" },
              { id: "field_role_required", label: "Cargo" }
            ].map((field) => (
              <div key={field.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label>{field.label}</Label>
                  {(settings as any)[field.id] && (
                    <Badge variant="secondary" className="text-xs">Obrigatório</Badge>
                  )}
                </div>
                <Switch
                  checked={(settings as any)[field.id]}
                  onCheckedChange={(v: boolean) => updateSetting(field.id as any, v)}
                />
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
              <Switch checked={settings.validate_email} onCheckedChange={(v: boolean) => updateSetting('validate_email', v)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validar CPF</Label>
                <div className="text-sm text-slate-600">
                  Verificar CPF válido
                </div>
              </div>
              <Switch checked={settings.validate_cpf} onCheckedChange={(v: boolean) => updateSetting('validate_cpf', v)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Validar Telefone</Label>
                <div className="text-sm text-slate-600">
                  Formato brasileiro (11) 99999-9999
                </div>
              </div>
              <Switch checked={settings.validate_phone} onCheckedChange={(v: boolean) => updateSetting('validate_phone', v)} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Único</Label>
                <div className="text-sm text-slate-600">
                  Não permitir emails duplicados
                </div>
              </div>
              <Switch checked={settings.unique_email} onCheckedChange={(v: boolean) => updateSetting('unique_email', v)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

