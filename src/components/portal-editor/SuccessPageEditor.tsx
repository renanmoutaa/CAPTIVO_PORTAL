import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { 
  Upload,
  Eye,
  CheckCircle,
  Wifi,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Plus,
  Trash2,
  GripVertical
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";

interface SuccessPageEditorProps {
  viewMode: "desktop" | "tablet" | "mobile";
  previewWidth: string;
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin
};

export function SuccessPageEditor({ viewMode, previewWidth }: SuccessPageEditorProps) {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [accentColor, setAccentColor] = useState("#10b981");
  const [title, setTitle] = useState("Conectado com Sucesso!");
  const [message, setMessage] = useState("Aproveite sua navegação. Você está conectado à nossa rede WiFi gratuita.");
  const [showTimer, setShowTimer] = useState(true);
  const [redirectTime, setRedirectTime] = useState(5);
  const [redirectUrl, setRedirectUrl] = useState("https://empresa.com");
  const [showSocialLinks, setShowSocialLinks] = useState(true);
  const [showPromo, setShowPromo] = useState(true);
  const [promoTitle, setPromoTitle] = useState("Primeira compra com 10% OFF!");
  const [promoCode, setPromoCode] = useState("WIFI10");
  const [borderRadius, setBorderRadius] = useState([16]);
  
  const [customElements, setCustomElements] = useState([
    { id: 1, type: "text", content: "Siga-nos nas redes sociais", enabled: true },
    { id: 2, type: "button", content: "Ver Ofertas", url: "https://empresa.com/ofertas", enabled: true }
  ]);

  const addElement = (type: string) => {
    const newElement = {
      id: Date.now(),
      type,
      content: type === "text" ? "Novo texto" : "Novo botão",
      url: type === "button" ? "https://" : undefined,
      enabled: true
    };
    setCustomElements([...customElements, newElement]);
  };

  const removeElement = (id: number) => {
    setCustomElements(customElements.filter(el => el.id !== id));
  };

  const updateElement = (id: number, field: string, value: any) => {
    setCustomElements(customElements.map(el => 
      el.id === id ? { ...el, [field]: value } : el
    ));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Panel - Design Controls */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 text-sm">Controles da Página de Sucesso</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="style">
                <AccordionTrigger className="text-sm">Estilo Visual</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Cor de Fundo</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Cor de Destaque</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input 
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Arredondamento</Label>
                      <span className="text-xs text-slate-600">{borderRadius}px</span>
                    </div>
                    <Slider 
                      value={borderRadius} 
                      onValueChange={setBorderRadius}
                      max={40}
                      step={2}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content">
                <AccordionTrigger className="text-sm">Conteúdo Principal</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Título</Label>
                    <Input 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Mensagem</Label>
                    <Textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="text-xs"
                      rows={3}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="redirect">
                <AccordionTrigger className="text-sm">Redirecionamento</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Mostrar Timer</Label>
                    <Switch checked={showTimer} onCheckedChange={setShowTimer} />
                  </div>

                  {showTimer && (
                    <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                      <Label className="text-xs">Tempo de Redirecionamento (segundos)</Label>
                      <Input 
                        type="number"
                        value={redirectTime}
                        onChange={(e) => setRedirectTime(Number(e.target.value))}
                        className="text-xs"
                        min="3"
                        max="30"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-xs">URL de Redirecionamento</Label>
                    <Input 
                      value={redirectUrl}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                      className="text-xs"
                      placeholder="https://"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="social">
                <AccordionTrigger className="text-sm">Redes Sociais</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Exibir Redes Sociais</Label>
                    <Switch checked={showSocialLinks} onCheckedChange={setShowSocialLinks} />
                  </div>

                  {showSocialLinks && (
                    <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                      <div className="space-y-2">
                        <Label className="text-xs">Facebook</Label>
                        <Input placeholder="https://facebook.com/..." className="text-xs" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Instagram</Label>
                        <Input placeholder="https://instagram.com/..." className="text-xs" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Twitter</Label>
                        <Input placeholder="https://twitter.com/..." className="text-xs" />
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="promo">
                <AccordionTrigger className="text-sm">Promoções</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Exibir Promoção</Label>
                    <Switch checked={showPromo} onCheckedChange={setShowPromo} />
                  </div>

                  {showPromo && (
                    <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                      <div className="space-y-2">
                        <Label className="text-xs">Título da Promoção</Label>
                        <Input 
                          value={promoTitle}
                          onChange={(e) => setPromoTitle(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Código Promocional</Label>
                        <Input 
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="custom">
                <AccordionTrigger className="text-sm">Elementos Personalizados</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => addElement("text")}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Texto
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={() => addElement("button")}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Botão
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {customElements.map((element) => (
                      <div key={element.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                        <GripVertical className="h-4 w-4 text-slate-400" />
                        <div className="flex-1 min-w-0">
                          <Input 
                            value={element.content}
                            onChange={(e) => updateElement(element.id, "content", e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeElement(element.id)}
                        >
                          <Trash2 className="h-3 w-3 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="lg:col-span-2">
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-900 text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview em Tempo Real
              </CardTitle>
              <Badge variant="secondary">{viewMode}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 bg-slate-50">
            <div className="mx-auto transition-all duration-300" style={{ maxWidth: previewWidth }}>
              <div 
                className="rounded-xl overflow-hidden border-4 border-slate-300 shadow-2xl p-8 md:p-12"
                style={{ 
                  backgroundColor: backgroundColor,
                  minHeight: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div className="w-full max-w-md text-center space-y-6">
                  {/* Success Icon */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-20 h-20 flex items-center justify-center animate-bounce"
                      style={{ 
                        backgroundColor: accentColor,
                        borderRadius: `${borderRadius}px`
                      }}
                    >
                      <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>

                  {/* Title and Message */}
                  <div className="space-y-3">
                    <h1 className="text-slate-900">{title}</h1>
                    <p className="text-slate-600">{message}</p>
                  </div>

                  {/* Timer */}
                  {showTimer && (
                    <div className="py-4">
                      <div className="text-sm text-slate-600">
                        Redirecionando em <span className="font-bold" style={{ color: accentColor }}>{redirectTime}</span> segundos
                      </div>
                      <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-1000"
                          style={{ 
                            backgroundColor: accentColor,
                            width: "60%"
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Promo Code */}
                  {showPromo && (
                    <div 
                      className="p-4 border-2 border-dashed"
                      style={{ 
                        borderColor: accentColor,
                        borderRadius: `${borderRadius}px`,
                        backgroundColor: `${accentColor}15`
                      }}
                    >
                      <div className="text-sm text-slate-700 mb-2">{promoTitle}</div>
                      <div 
                        className="inline-block px-4 py-2 text-white"
                        style={{ 
                          backgroundColor: accentColor,
                          borderRadius: `${borderRadius / 2}px`
                        }}
                      >
                        {promoCode}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {showSocialLinks && (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-600">Siga-nos nas redes sociais</p>
                      <div className="flex justify-center gap-3">
                        {Object.entries(socialIcons).map(([key, Icon]) => (
                          <button
                            key={key}
                            className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"
                            style={{ borderRadius: `${borderRadius / 2}px` }}
                          >
                            <Icon className="h-5 w-5 text-slate-700" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Elements */}
                  {customElements.filter(el => el.enabled).map((element) => (
                    <div key={element.id}>
                      {element.type === "text" ? (
                        <p className="text-slate-600">{element.content}</p>
                      ) : (
                        <Button 
                          className="w-full"
                          style={{ 
                            backgroundColor: accentColor,
                            borderRadius: `${borderRadius / 2}px`
                          }}
                        >
                          {element.content}
                        </Button>
                      )}
                    </div>
                  ))}

                  {/* Direct Access Button */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    style={{ borderRadius: `${borderRadius / 2}px` }}
                  >
                    Continuar Navegando
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
