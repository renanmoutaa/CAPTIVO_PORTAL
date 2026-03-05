import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-slate-900 mb-4">
            Entre em Contato
          </h2>
          <p className="text-slate-600 mb-8">
            Tem dúvidas sobre nossa solução? Nossa equipe está pronta para ajudar 
            você a escolher o melhor plano para seu negócio.
          </p>

          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-slate-900">Email</div>
                  <div className="text-slate-600">contato@hotspotpro.com</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-green-50 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-slate-900">Telefone</div>
                  <div className="text-slate-600">+55 (11) 9999-9999</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-slate-900">Endereço</div>
                  <div className="text-slate-600">São Paulo, SP - Brasil</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-slate-200">
          <CardContent className="p-8">
            <form className="space-y-6">
              <div>
                <label className="text-slate-700 text-sm mb-2 block">
                  Nome Completo
                </label>
                <Input 
                  placeholder="Seu nome" 
                  className="border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-700 text-sm mb-2 block">
                  Email
                </label>
                <Input 
                  type="email"
                  placeholder="seu@email.com" 
                  className="border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-700 text-sm mb-2 block">
                  Telefone
                </label>
                <Input 
                  type="tel"
                  placeholder="(11) 99999-9999" 
                  className="border-slate-200"
                />
              </div>

              <div>
                <label className="text-slate-700 text-sm mb-2 block">
                  Mensagem
                </label>
                <Textarea 
                  placeholder="Como podemos ajudar você?"
                  className="border-slate-200 min-h-[120px]"
                />
              </div>

              <Button className="w-full" size="lg">
                Enviar Mensagem
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-600">
        <p>© 2025 HotSpot Pro. Todos os direitos reservados.</p>
      </footer>
    </section>
  );
}
