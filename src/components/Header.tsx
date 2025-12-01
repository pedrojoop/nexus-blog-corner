import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full bg-nexus-creme border-b border-border">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-nexus-floresta rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-semibold text-nexus-tinta">Nexus</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-nexus-acento ${
              isActive('/') ? 'text-nexus-acento font-semibold' : 'text-nexus-tinta'
            }`}
          >
            Início
          </Link>
          <Link 
            to="/blog" 
            className={`text-sm font-medium transition-colors hover:text-nexus-acento ${
              isActive('/blog') ? 'text-nexus-acento font-semibold' : 'text-nexus-tinta'
            }`}
          >
            Blog
          </Link>
          <Link 
            to="/servicos" 
            className={`text-sm font-medium transition-colors hover:text-nexus-acento ${
              isActive('/servicos') ? 'text-nexus-acento font-semibold' : 'text-nexus-tinta'
            }`}
          >
            Serviços
          </Link>
          <Link 
            to="/sobre" 
            className={`text-sm font-medium transition-colors hover:text-nexus-acento ${
              isActive('/sobre') ? 'text-nexus-acento font-semibold' : 'text-nexus-tinta'
            }`}
          >
            Sobre
          </Link>
          <Link 
            to="/contato" 
            className={`text-sm font-medium transition-colors hover:text-nexus-acento ${
              isActive('/contato') ? 'text-nexus-acento font-semibold' : 'text-nexus-tinta'
            }`}
          >
            Contato
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="text-nexus-tinta hover:text-nexus-acento hover:bg-transparent">
              Entrar
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="sm" className="bg-nexus-floresta hover:bg-nexus-floresta-hover text-white font-medium shadow-sm">
              Começar Grátis
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;