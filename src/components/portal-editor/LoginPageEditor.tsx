import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import {
  Upload,
  Palette,
  Type,
  Sparkles,
  Wifi,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  Image as ImageIcon
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { usePortalSettings } from "../../contexts/PortalSettingsContext";
import { supabase } from "../../lib/supabase";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const templates = [
  { id: "modern", name: "Moderno", bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", primary: "#667eea" },
  { id: "minimal", name: "Minimalista", bg: "#ffffff", primary: "#000000" },
  { id: "dark", name: "Dark Mode", bg: "#1a1a1a", primary: "#3b82f6" },
  { id: "gradient", name: "Gradiente", bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", primary: "#f5576c" },
  { id: "ocean", name: "Oceano", bg: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", primary: "#4facfe" },
  { id: "sunset", name: "Pôr do Sol", bg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", primary: "#fa709a" }
];

const fonts = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "poppins", label: "Poppins" },
  { value: "montserrat", label: "Montserrat" },
  { value: "playfair", label: "Playfair Display" },
];

interface LoginPageEditorProps {
  viewMode: "desktop" | "tablet" | "mobile";
  previewWidth: string;
}

export function LoginPageEditor({ viewMode, previewWidth }: LoginPageEditorProps) {
  const { settings, updateSetting } = usePortalSettings();

  const backgroundType = settings.background_type;
  const setBackgroundType = (v: any) => updateSetting('background_type', v);
  const backgroundColor = settings.background_color;
  const setBackgroundColor = (v: any) => updateSetting('background_color', v);
  const gradientStart = settings.gradient_start;
  const setGradientStart = (v: any) => updateSetting('gradient_start', v);
  const gradientEnd = settings.gradient_end;
  const setGradientEnd = (v: any) => updateSetting('gradient_end', v);
  const primaryColor = settings.primary_color;
  const setPrimaryColor = (v: any) => updateSetting('primary_color', v);
  const logoUrl = settings.logo_url;
  const setLogoUrl = (v: any) => updateSetting('logo_url', v);
  const backgroundImage = settings.background_image;
  const setBackgroundImage = (v: any) => updateSetting('background_image', v);
  const borderRadius = settings.border_radius;
  const setBorderRadius = (v: number[]) => updateSetting('border_radius', v[0]);
  const opacity = settings.opacity;
  const setOpacity = (v: number[]) => updateSetting('opacity', v[0]);
  const font = settings.font_family;
  const setFont = (v: any) => updateSetting('font_family', v);
  const title = settings.title_text;
  const setTitle = (v: any) => updateSetting('title_text', v);
  const subtitle = settings.subtitle_text;
  const setSubtitle = (v: any) => updateSetting('subtitle_text', v);
  const showLogo = settings.show_logo;
  const setShowLogo = (v: any) => updateSetting('show_logo', v);
  const showTitle = settings.show_title;
  const setShowTitle = (v: any) => updateSetting('show_title', v);
  const showSubtitle = settings.show_subtitle;
  const setShowSubtitle = (v: any) => updateSetting('show_subtitle', v);
  const cardShadow = settings.card_shadow;
  const setCardShadow = (v: any) => updateSetting('card_shadow', v);
  const cardBackgroundColor = settings.card_background_color;
  const setCardBackgroundColor = (v: any) => updateSetting('card_background_color', v);
  const cardBackgroundImage = settings.card_background_image;
  const setCardBackgroundImage = (v: any) => updateSetting('card_background_image', v);
  const cardWidth = settings.card_width;
  const setCardWidth = (v: number[]) => updateSetting('card_width', v[0]);
  const blurEffect = settings.blur_effect;
  const setBlurEffect = (v: any) => updateSetting('blur_effect', v);

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'background') => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (type === 'logo') setUploadingLogo(true);
      else setUploadingBg(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portal_assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portal_assets')
        .getPublicUrl(filePath);

      if (type === 'logo') {
        setLogoUrl(data.publicUrl);
        setShowLogo(true);
      } else {
        setBackgroundImage(data.publicUrl);
        setBackgroundType("image");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem. Certifique-se de que o SQL do Bucket "portal_assets" foi executado corretamente no Supabase.');
    } finally {
      if (type === 'logo') setUploadingLogo(false);
      else setUploadingBg(false);
    }
  };

  const getBackgroundStyle = () => {
    if (backgroundType === "gradient") {
      return `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)`;
    } else if (backgroundType === "image" && backgroundImage) {
      return `url(${backgroundImage})`;
    }
    return backgroundColor;
  };

  const applyTemplate = (template: typeof templates[0]) => {
    if (template.bg.startsWith("linear-gradient")) {
      setBackgroundType("gradient");
      const colors = template.bg.match(/#[0-9a-f]{6}/gi) || [];
      if (colors.length >= 2) {
        setGradientStart(colors[0]);
        setGradientEnd(colors[1]);
      }
    } else {
      setBackgroundType("solid");
      setBackgroundColor(template.bg);
    }
    setPrimaryColor(template.primary);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Panel - Design Controls */}
      <div className="lg:col-span-1 space-y-6">
        {/* Quick Templates */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              Templates Rápidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className="group relative"
                >
                  <div
                    className="aspect-square rounded-lg border-2 border-slate-200 overflow-hidden hover:border-blue-500 transition-all hover:scale-105"
                    style={{ background: template.bg }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="text-xs text-slate-600 text-center mt-1">{template.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Design Controls */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900 text-sm">Controles de Design</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="background">
                <AccordionTrigger className="text-sm">Fundo</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={backgroundType === "solid" ? "default" : "outline"}
                      onClick={() => setBackgroundType("solid")}
                      size="sm"
                    >
                      Sólido
                    </Button>
                    <Button
                      variant={backgroundType === "gradient" ? "default" : "outline"}
                      onClick={() => setBackgroundType("gradient")}
                      size="sm"
                    >
                      Gradiente
                    </Button>
                    <Button
                      variant={backgroundType === "image" ? "default" : "outline"}
                      onClick={() => setBackgroundType("image")}
                      size="sm"
                    >
                      Imagem
                    </Button>
                  </div>

                  {backgroundType === "solid" && (
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
                          placeholder="#000000"
                          className="text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {backgroundType === "gradient" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-xs">Cor Inicial</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={gradientStart}
                            onChange={(e) => setGradientStart(e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={gradientStart}
                            onChange={(e) => setGradientStart(e.target.value)}
                            className="text-xs"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Cor Final</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={gradientEnd}
                            onChange={(e) => setGradientEnd(e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={gradientEnd}
                            onChange={(e) => setGradientEnd(e.target.value)}
                            className="text-xs"
                          />
                        </div>
                      </div>
                      <div
                        className="h-12 rounded-lg border border-slate-200"
                        style={{ background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)` }}
                      />
                    </>
                  )}

                  {backgroundType === "image" && (
                    <div className="space-y-2">
                      <Label className="text-xs">URL da Imagem Padrão ou Subir do PC</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="https://..."
                          value={backgroundImage}
                          onChange={(e) => setBackgroundImage(e.target.value)}
                          className="text-xs"
                        />
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => handleImageUpload(e, 'background')}
                            disabled={uploadingBg}
                          />
                          <Button variant="outline" size="icon" disabled={uploadingBg}>
                            {uploadingBg ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <Label className="text-xs">Efeito Blur</Label>
                    <Switch checked={blurEffect} onCheckedChange={setBlurEffect} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="colors">
                <AccordionTrigger className="text-sm">Cores e Tipografia</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Cor Primária</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Fonte</Label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fonts.map((f) => (
                          <SelectItem key={f.value} value={f.value} className="text-xs">
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="card">
                <AccordionTrigger className="text-sm">Card de Login</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-4">
                    <Label className="text-xs">Cor / Fundo do Card</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={cardBackgroundColor}
                        onChange={(e) => setCardBackgroundColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        value={cardBackgroundColor}
                        onChange={(e) => setCardBackgroundColor(e.target.value)}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Largura Máxima do Card</Label>
                      <span className="text-xs text-slate-600">{cardWidth}px</span>
                    </div>
                    <Slider
                      value={[cardWidth]}
                      onValueChange={setCardWidth}
                      min={300}
                      max={1200}
                      step={10}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Bordas Arredondadas</Label>
                      <span className="text-xs text-slate-600">{borderRadius}px</span>
                    </div>
                    <Slider
                      value={[borderRadius]}
                      onValueChange={setBorderRadius}
                      max={40}
                      step={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-xs">Opacidade</Label>
                      <span className="text-xs text-slate-600">{opacity}%</span>
                    </div>
                    <Slider
                      value={[opacity]}
                      onValueChange={setOpacity}
                      max={100}
                      step={5}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-xs">Sombra</Label>
                    <Switch checked={cardShadow} onCheckedChange={setCardShadow} />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="content">
                <AccordionTrigger className="text-sm">Conteúdo</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Exibir Logo</Label>
                      <Switch checked={showLogo} onCheckedChange={setShowLogo} />
                    </div>

                    {showLogo && (
                      <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                        <Label className="text-xs">URL da Logo</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://..."
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                            className="text-xs"
                          />
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => handleImageUpload(e, 'logo')}
                              disabled={uploadingLogo}
                            />
                            <Button variant="outline" size="icon" disabled={uploadingLogo}>
                              {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Exibir Título</Label>
                      <Switch checked={showTitle} onCheckedChange={setShowTitle} />
                    </div>

                    {showTitle && (
                      <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                        <Label className="text-xs">Texto do Título</Label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Exibir Subtítulo</Label>
                      <Switch checked={showSubtitle} onCheckedChange={setShowSubtitle} />
                    </div>

                    {showSubtitle && (
                      <div className="space-y-2 pl-4 border-l-2 border-slate-200">
                        <Label className="text-xs">Texto do Subtítulo</Label>
                        <Textarea
                          value={subtitle}
                          onChange={(e) => setSubtitle(e.target.value)}
                          className="text-xs"
                          rows={2}
                        />
                      </div>
                    )}
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
                className="rounded-xl overflow-hidden border-4 border-slate-300 shadow-2xl"
                style={{
                  background: getBackgroundStyle(),
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2rem",
                  backdropFilter: blurEffect ? "blur(10px)" : "none"
                }}
              >
                <div
                  className="transition-all duration-300"
                  style={{
                    backgroundColor: cardBackgroundColor,
                    backgroundImage: cardBackgroundImage ? `url(${cardBackgroundImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: `${borderRadius}px`,
                    opacity: opacity / 100,
                    padding: "2.5rem",
                    boxShadow: cardShadow ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none",
                    width: '100%',
                    maxWidth: `${cardWidth}px`
                  }}
                >
                  {showLogo && (
                    <div className="mb-6 text-center">
                      {logoUrl ? (
                        <div
                          className="w-20 h-20 bg-slate-200 rounded-xl mx-auto bg-cover bg-center"
                          style={{
                            borderRadius: `${borderRadius / 1.5}px`,
                            backgroundImage: logoUrl ? `url(${logoUrl})` : "none"
                          }}
                        />
                      ) : (
                        <div
                          className="w-20 h-20 mx-auto flex items-center justify-center"
                          style={{
                            backgroundColor: primaryColor,
                            borderRadius: `${borderRadius / 1.5}px`
                          }}
                        >
                          <Wifi className="h-10 w-10 text-white" />
                        </div>
                      )}
                    </div>
                  )}

                  {showTitle && (
                    <h2
                      className="text-slate-900 text-center mb-2"
                      style={{ fontFamily: font }}
                    >
                      {title}
                    </h2>
                  )}

                  {showSubtitle && (
                    <p
                      className="text-sm text-slate-600 text-center mb-8"
                      style={{ fontFamily: font }}
                    >
                      {subtitle}
                    </p>
                  )}

                  <div className="space-y-3">
                    <Button
                      className="w-full transition-all hover:scale-105"
                      style={{
                        backgroundColor: primaryColor,
                        borderRadius: `${borderRadius / 2}px`
                      }}
                    >
                      Continuar com Facebook
                    </Button>
                    <Button
                      className="w-full transition-all hover:scale-105"
                      variant="outline"
                      style={{
                        borderRadius: `${borderRadius / 2}px`
                      }}
                    >
                      Continuar com Google
                    </Button>
                    <Button
                      className="w-full transition-all hover:scale-105"
                      variant="outline"
                      style={{
                        borderRadius: `${borderRadius / 2}px`
                      }}
                    >
                      Continuar com Email
                    </Button>
                  </div>

                  <p
                    className="text-xs text-slate-500 text-center mt-6"
                    style={{ fontFamily: font }}
                  >
                    Ao continuar, você concorda com nossos <span className="underline cursor-pointer">Termos de Uso</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
