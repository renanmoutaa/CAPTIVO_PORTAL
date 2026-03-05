import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { 
  Wifi, 
  UserPlus, 
  BarChart3, 
  Mail, 
  Shield, 
  Smartphone,
  Database,
  Globe
} from "lucide-react";

const services = [
  {
    icon: Wifi,
    title: "Portal Cativo Personalizado",
    description: "Crie páginas de login personalizadas com sua marca, colete dados dos usuários e controle o acesso à rede.",
    color: "bg-blue-500"
  },
  {
    icon: UserPlus,
    title: "Geração de Leads",
    description: "Transforme visitantes em leads qualificados. Colete informações e integre com seu CRM automaticamente.",
    color: "bg-purple-500"
  },
  {
    icon: BarChart3,
    title: "Analytics Avançado",
    description: "Dashboards completos com métricas de uso, comportamento de usuários e relatórios personalizados.",
    color: "bg-green-500"
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description: "Envie campanhas de email segmentadas para seus usuários WiFi e acompanhe os resultados.",
    color: "bg-orange-500"
  },
  {
    icon: Shield,
    title: "Segurança LGPD",
    description: "Compliance total com LGPD e regulamentações de privacidade. Dados criptografados e seguros.",
    color: "bg-red-500"
  },
  {
    icon: Smartphone,
    title: "Login Social",
    description: "Permita login via Facebook, Google, Instagram e SMS. Experiência rápida e sem fricção.",
    color: "bg-pink-500"
  },
  {
    icon: Database,
    title: "Gestão de Clientes",
    description: "CRM integrado para gerenciar seus clientes WiFi, histórico de acessos e preferências.",
    color: "bg-cyan-500"
  },
  {
    icon: Globe,
    title: "Multi-localização",
    description: "Gerencie múltiplas localizações e redes em uma única plataforma centralizada.",
    color: "bg-indigo-500"
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="container mx-auto px-4 py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-slate-900 mb-4">
          Nossos Serviços
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Tudo que você precisa para transformar sua rede WiFi em uma ferramenta 
          poderosa de marketing e gestão de clientes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-slate-200">
              <CardHeader>
                <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-slate-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
