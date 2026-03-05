import { Wifi, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wifi className="h-6 w-6 text-white" />
            </div>
            <span className="text-slate-900">HotSpot Pro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">
              Serviços
            </a>
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
              Funcionalidades
            </a>
            <a href="#stats" className="text-slate-600 hover:text-blue-600 transition-colors">
              Estatísticas
            </a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">
              Contato
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost">Entrar</Button>
            <Button>Começar Agora</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#services" className="text-slate-600 hover:text-blue-600 transition-colors">
              Serviços
            </a>
            <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">
              Funcionalidades
            </a>
            <a href="#stats" className="text-slate-600 hover:text-blue-600 transition-colors">
              Estatísticas
            </a>
            <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">
              Contato
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <Button variant="ghost">Entrar</Button>
              <Button>Começar Agora</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
